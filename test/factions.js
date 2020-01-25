require("dotenv").config();
const axios = require("axios");
const factions = require("../data/json/factions.json");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Factions", () => {
  describe("Queries", () => {
    it("should return all factions", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: "query{getFactions{name}}"
      });
      expect(res.data.data.getFactions).to.be.an("array");
      expect(res.data.data.getFactions.length).to.equal(factions.length);
      expect(res.data.data.getFactions[0]).to.have.property("name");
    });
    it("should return a single faction", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getFaction(name:"Penguin Logistics"){name}}`
      });
      expect(res.data.data.getFaction).to.be.an("object");
      expect(res.data.data.getFaction).to.have.property("name");
      expect(res.data.data.getFaction.name).to.equal("Penguin Logistics");
    });
    it("should not return a faction that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getFaction(name:"Fake Faction"){name}}`
      });
      expect(res.data.data.getFaction).to.equal(null);
    });
    it("should return operators for a faction", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getFaction(name:"Penguin Logistics"){operators{name}}}`
      });

      expect(res.data.data.getFaction).to.be.an("object");
      expect(res.data.data.getFaction.operators).to.be.an("array");
      expect(res.data.data.getFaction.operators.length).to.equal(4);
    });
  });
  describe("Mutations", () => {
    it("should create a faction", async () => {
      const expected = {
        name: "Test Faction"
      };

      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: FactionCreateInput!){createFaction(input: $input){name}}`,
        variables: { input: expected }
      });
      expect(createRes.data.data.createFaction).to.be.an("object");
      expect(createRes.data.data.createFaction).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getFactions{name}}`
      });
      expect(getRes.data.data.getFactions).to.be.an("array");
      expect(getRes.data.data.getFactions.length).to.equal(factions.length + 1);
      expect(
        getRes.data.data.getFactions[getRes.data.data.getFactions.length - 1]
      ).to.deep.equal(expected);
    });
    it("should update a faction", async () => {
      const expected = {
        name: "Updated Faction"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: FactionUpdateInput!){updateFaction(name: "Test Faction", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateFaction).to.be.an("object");
      expect(updateRes.data.data.updateFaction).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getFaction(name:"Updated Faction"){name}}`
      });
      expect(getRes.data.data.getFaction).to.be.an("object");
      expect(getRes.data.data.getFaction).to.deep.equal(expected);
    });
    it("should not update a faction that does not exist", async () => {
      const expected = {
        name: "New Faction"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: FactionUpdateInput!){updateFaction(name: "Fake Faction", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateFaction).to.equal(null);
    });
    it("should delete a faction", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteFaction(name: "Updated Faction")}`
      });
      expect(deleteRes.data.data.deleteFaction).to.be.a("boolean");
      expect(deleteRes.data.data.deleteFaction).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getFactions{name}}`
      });
      expect(getRes.data.data.getFactions).to.be.an("array");
      expect(getRes.data.data.getFactions.length).to.equal(factions.length);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getFaction(name:"Test Faction Updated"){name}}`
      });
      expect(checkRes.data.data.getFaction).to.equal(null);
    });
    it("should not delete a faction that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteFaction(name: "Test Faction")}`
      });
      expect(res.data.data.deleteFaction).to.be.a("boolean");
      expect(res.data.data.deleteFaction).to.equal(false);
    });
  });
});
