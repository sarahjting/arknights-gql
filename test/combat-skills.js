require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Combat Skills", () => {
  describe("Queries", () => {
    it("should return all combat skills with all fields", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query:
          "query{getCombatSkills{operator{name} stage{name} description isAutoCharge isAuto duration spCost spInitial}}"
      });
      expect(res.data.data.getCombatSkills).to.be.an("array");
      expect(res.data.data.getCombatSkills.length).to.equal(150);
      expect(res.data.data.getCombatSkills[0]).to.have.property("operator");
      expect(res.data.data.getCombatSkills[0]).to.have.property("stage");
      expect(res.data.data.getCombatSkills[0]).to.have.property("description");
      expect(res.data.data.getCombatSkills[0]).to.have.property("isAutoCharge");
      expect(res.data.data.getCombatSkills[0]).to.have.property("isAuto");
      expect(res.data.data.getCombatSkills[0]).to.have.property("duration");
      expect(res.data.data.getCombatSkills[0]).to.have.property("spCost");
      expect(res.data.data.getCombatSkills[0]).to.have.property("spInitial");
    });
    it("should return a single combat skill by name with all fields", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkill(operator: "Exusiai", stage: "ELITE1"){operator{name} stage{name} description isAutoCharge isAuto duration spCost spInitial}}`
      });
      expect(res.data.data.getCombatSkill).to.be.an("object");
      expect(res.data.data.getCombatSkill).to.have.property("operator");
      expect(res.data.data.getCombatSkill.operator.name).to.equal("Exusiai");
      expect(res.data.data.getCombatSkill).to.have.property("stage");
      expect(res.data.data.getCombatSkill.stage.name).to.equal("ELITE1");
      expect(res.data.data.getCombatSkill).to.have.property("description");
      expect(res.data.data.getCombatSkill).to.have.property("isAutoCharge");
      expect(res.data.data.getCombatSkill).to.have.property("isAuto");
      expect(res.data.data.getCombatSkill).to.have.property("duration");
      expect(res.data.data.getCombatSkill).to.have.property("spCost");
      expect(res.data.data.getCombatSkill).to.have.property("spInitial");
    });
    it("should not return a combat skill that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkill(operator:"FAKE",stage:"FAKE"){description}}`
      });
      expect(res.data.data.getCombatSkill).to.equal(null);
    });
    it("should return all of an operator's combat skills with the operator query", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Exusiai"){ combatSkills{description} }}`
      });
      const data = res.data.data.getOperator;
      expect(data).to.be.an("object");
      expect(data).to.have.property("combatSkills");
    });
  });
  describe("Mutations", () => {
    it("should create a combat skill", async () => {
      const expected = {
        description: "Skill description",
        isAutoCharge: true,
        isAuto: true,
        duration: 10,
        spCost: 100,
        spInitial: 50
      };
      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: CombatSkillCreateInput!){createCombatSkill(operator: "Lancet-2", stage: "ELITE1", input: $input){description isAutoCharge isAuto duration spCost spInitial}}`,
        variables: { input: expected }
      });
      expect(createRes.data.data.createCombatSkill).to.be.an("object");
      expect(createRes.data.data.createCombatSkill).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkills{description isAutoCharge isAuto duration spCost spInitial}}`
      });
      expect(getRes.data.data.getCombatSkills).to.be.an("array");
      expect(getRes.data.data.getCombatSkills.length).to.equal(151);
      expect(
        getRes.data.data.getCombatSkills[
          getRes.data.data.getCombatSkills.length - 1
        ]
      ).to.deep.equal(expected);
    });
    it("should update a combat skill", async () => {
      const expected = { description: "Updated description" };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: CombatSkillUpdateInput!){updateCombatSkill(operator: "Lancet-2", stage: "ELITE1", input: $input){description}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateCombatSkill).to.be.an("object");
      expect(updateRes.data.data.updateCombatSkill).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkill(operator: "Lancet-2", stage: "ELITE1"){description}}`
      });
      expect(getRes.data.data.getCombatSkill).to.be.an("object");
      expect(getRes.data.data.getCombatSkill).to.deep.equal(expected);
    });
    it("should delete a combat skill", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteCombatSkill(operator: "Lancet-2", stage: "ELITE1")}`
      });
      expect(deleteRes.data.data.deleteCombatSkill).to.be.a("boolean");
      expect(deleteRes.data.data.deleteCombatSkill).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkills{description}}`
      });
      expect(getRes.data.data.getCombatSkills).to.be.an("array");
      expect(getRes.data.data.getCombatSkills.length).to.equal(150);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getCombatSkill(operator: "Lancet-2", stage: "ELITE1"){description}}`
      });
      expect(checkRes.data.data.getCombatSkill).to.equal(null);
    });
  });
});
