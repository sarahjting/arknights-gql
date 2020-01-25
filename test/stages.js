require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Stages", () => {
  describe("Queries", () => {
    it("should return all stages", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: "query{getStages{name}}"
      });
      expect(res.data.data.getStages).to.be.an("array");
      expect(res.data.data.getStages.length).to.equal(3);
      expect(res.data.data.getStages[0]).to.have.property("name");
    });
    it("should return a single stage by name", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"ELITE1"){name}}`
      });
      expect(res.data.data.getStage).to.be.an("object");
      expect(res.data.data.getStage).to.have.property("name");
      expect(res.data.data.getStage.name).to.equal("ELITE1");
    });
    it("should not return a stage that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"FAKE"){name}}`
      });
      expect(res.data.data.getStage).to.equal(null);
    });
    it("should return operators for a stage", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"ELITE1"){operators{operator{name}}}}`
      });
      expect(res.data.data.getStage).to.be.an("object");
      expect(res.data.data.getStage.operators).to.be.an("array");
      expect(res.data.data.getStage.operators.length).to.equal(77);
    });
    it("should return skills for a stage", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"ELITE1"){combatSkills{description}}}`
      });
      expect(res.data.data.getStage).to.be.an("object");
      expect(res.data.data.getStage.combatSkills).to.be.an("array");
      expect(res.data.data.getStage.combatSkills.length).to.equal(63);
    });
  });
  describe("Mutations", () => {
    it("should create a stage", async () => {
      const expected = {
        name: "CREATED"
      };

      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: StageCreateInput!){createStage(input: $input){name}}`,
        variables: { input: expected }
      });
      expect(createRes.data.data.createStage).to.be.an("object");
      expect(createRes.data.data.createStage).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getStages{name}}`
      });
      expect(getRes.data.data.getStages).to.be.an("array");
      expect(getRes.data.data.getStages.length).to.equal(4);
      expect(
        getRes.data.data.getStages[getRes.data.data.getStages.length - 1]
      ).to.deep.equal(expected);
    });
    it("should update a stage", async () => {
      const expected = {
        name: "UPDATED"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: StageUpdateInput!){updateStage(name: "CREATED", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateStage).to.be.an("object");
      expect(updateRes.data.data.updateStage).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"UPDATED"){name}}`
      });
      expect(getRes.data.data.getStage).to.be.an("object");
      expect(getRes.data.data.getStage).to.deep.equal(expected);
    });
    it("should not update a stage that does not exist", async () => {
      const expected = {
        name: "FAKEUPDATED"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: StageUpdateInput!){updateStage(name: "FAKE", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateStage).to.equal(null);
    });
    it("should delete a stage", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteStage(name: "UPDATED")}`
      });
      expect(deleteRes.data.data.deleteStage).to.be.a("boolean");
      expect(deleteRes.data.data.deleteStage).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getStages{name}}`
      });
      expect(getRes.data.data.getStages).to.be.an("array");
      expect(getRes.data.data.getStages.length).to.equal(3);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name:"UPDATED"){name}}`
      });
      expect(checkRes.data.data.getStage).to.equal(null);
    });
    it("should not delete a stage that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteStage(name: "FAKE")}`
      });
      expect(res.data.data.deleteStage).to.be.a("boolean");
      expect(res.data.data.deleteStage).to.equal(false);
    });
  });
});
