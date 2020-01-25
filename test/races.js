require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Races", () => {
  describe("Queries", () => {
    it("should return all races", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: "query{getRaces{name}}"
      });
      expect(res.data.data.getRaces).to.be.an("array");
      expect(res.data.data.getRaces.length).to.equal(28);
      expect(res.data.data.getRaces[0]).to.have.property("name");
    });
    it("should return a single race", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getRace(name:"Sakota"){name}}`
      });
      expect(res.data.data.getRace).to.be.an("object");
      expect(res.data.data.getRace).to.have.property("name");
      expect(res.data.data.getRace.name).to.equal("Sakota");
    });
    it("should not return a race that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getRace(name:"Fake Race"){name}}`
      });
      expect(res.data.data.getRace).to.equal(null);
    });
    it("should return operators for a race", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getRace(name:"Sakota"){operators{name}}}`
      });

      expect(res.data.data.getRace).to.be.an("object");
      expect(res.data.data.getRace.operators).to.be.an("array");
      expect(res.data.data.getRace.operators.length).to.equal(2);
    });
  });
  describe("Mutations", () => {
    it("should create a race", async () => {
      const expected = {
        name: "Test Race"
      };

      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: RaceCreateInput!){createRace(input: $input){name}}`,
        variables: { input: expected }
      });
      expect(createRes.data.data.createRace).to.be.an("object");
      expect(createRes.data.data.createRace).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getRaces{name}}`
      });
      expect(getRes.data.data.getRaces).to.be.an("array");
      expect(getRes.data.data.getRaces.length).to.equal(29);
      expect(
        getRes.data.data.getRaces[getRes.data.data.getRaces.length - 1]
      ).to.deep.equal(expected);
    });
    it("should update a race", async () => {
      const expected = {
        name: "Updated Race"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: RaceUpdateInput!){updateRace(name: "Test Race", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateRace).to.be.an("object");
      expect(updateRes.data.data.updateRace).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getRace(name:"Updated Race"){name}}`
      });
      expect(getRes.data.data.getRace).to.be.an("object");
      expect(getRes.data.data.getRace).to.deep.equal(expected);
    });
    it("should not update a race that does not exist", async () => {
      const expected = {
        name: "New Race"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: RaceUpdateInput!){updateRace(name: "Fake Race", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateRace).to.equal(null);
    });
    it("should delete a race", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteRace(name: "Updated Race")}`
      });
      expect(deleteRes.data.data.deleteRace).to.be.a("boolean");
      expect(deleteRes.data.data.deleteRace).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getRaces{name}}`
      });
      expect(getRes.data.data.getRaces).to.be.an("array");
      expect(getRes.data.data.getRaces.length).to.equal(28);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getRace(name:"Test Race Updated"){name}}`
      });
      expect(checkRes.data.data.getRace).to.equal(null);
    });
    it("should not delete a race that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteRace(name: "Test Race")}`
      });
      expect(res.data.data.deleteRace).to.be.a("boolean");
      expect(res.data.data.deleteRace).to.equal(false);
    });
  });
});
