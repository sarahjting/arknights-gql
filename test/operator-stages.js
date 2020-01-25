require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Operator Stages", () => {
  describe("Operator Queries", () => {
    it("should return all of an operator's stage stats", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Exusiai"){ stages { stage {name} hp atk def res redeploy cost block atkSpeed } }}`
      });
      const data = res.data.data.getOperator;
      expect(data).to.be.an("object");
      expect(data).to.have.property("stages");
      expect(data.stages).to.be.an("array");
      expect(data.stages.length).to.equal(3);
      expect(data.stages[0]).to.have.property("stage");
      expect(data.stages[0].stage).to.have.property("name");
      expect(data.stages[0]).to.have.property("hp");
      expect(data.stages[0]).to.have.property("atk");
      expect(data.stages[0]).to.have.property("def");
      expect(data.stages[0]).to.have.property("res");
      expect(data.stages[0]).to.have.property("redeploy");
      expect(data.stages[0]).to.have.property("cost");
      expect(data.stages[0]).to.have.property("block");
      expect(data.stages[0]).to.have.property("atkSpeed");
    });
  });
  describe("Stage Queries", () => {
    it("should return all of a stage's operators", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getStage(name: "ELITE2"){ operators {operator {name} hp atk def res redeploy cost block atkSpeed }}}`
      });
      const data = res.data.data.getStage;
      expect(data).to.be.an("object");
      expect(data).to.have.property("operators");
      expect(data.operators).to.be.an("array");
      expect(data.operators.length).to.equal(64);
      expect(data.operators[0]).to.have.property("operator");
      expect(data.operators[0].operator).to.have.property("name");
      expect(data.operators[0]).to.have.property("hp");
      expect(data.operators[0]).to.have.property("atk");
      expect(data.operators[0]).to.have.property("def");
      expect(data.operators[0]).to.have.property("res");
      expect(data.operators[0]).to.have.property("redeploy");
      expect(data.operators[0]).to.have.property("cost");
      expect(data.operators[0]).to.have.property("block");
      expect(data.operators[0]).to.have.property("atkSpeed");
    });
  });
  describe("Mutations", () => {
    it("should create an operator stage", async () => {
      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OperatorStageCreateInput!){createOperatorStage(operator: "Lancet-2", stage: "ELITE1", input: $input){hp}}`,
        variables: {
          input: {
            hp: 1000,
            atk: 100,
            def: 100,
            res: 1,
            redeploy: 100,
            cost: 5,
            block: 2,
            atkSpeed: 150
          }
        }
      });
      expect(createRes.data.data.createOperatorStage).to.be.an("object");
      expect(createRes.data.data.createOperatorStage.hp).to.equal(1000);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Lancet-2"){stages {stage{name} hp}}}`
      });
      const data = getRes.data.data.getOperator;
      expect(data).to.be.an("object");
      expect(data.stages.length).to.equal(2);
      expect(data.stages[1].hp).to.equal(1000);
      expect(data.stages[1].stage.name).to.equal("ELITE1");
    });
    it("should update an operator stage", async () => {
      const expected = {
        hp: 1000,
        atk: 1000,
        def: 1000,
        res: 1000,
        redeploy: 10,
        cost: 10,
        block: 10,
        atkSpeed: 1000
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OperatorStageUpdateInput!){updateOperatorStage(operator: "Lancet-2", stage: "ELITE1", input: $input){hp atk def res redeploy cost block atkSpeed}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateOperatorStage).to.be.an("object");
      expect(updateRes.data.data.updateOperatorStage).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Lancet-2"){stages{hp atk def res redeploy cost block atkSpeed}}}`
      });
      const data = getRes.data.data.getOperator;
      expect(data).to.be.an("object");
      expect(data.stages.length).to.equal(2);
      expect(data.stages[1]).to.deep.equal(expected);
    });
    it("should delete an operator stage", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteOperatorStage(operator: "Lancet-2", stage: "ELITE1")}`
      });
      expect(deleteRes.data.data.deleteOperatorStage).to.be.a("boolean");
      expect(deleteRes.data.data.deleteOperatorStage).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Lancet-2"){stages{hp atk def res redeploy cost block atkSpeed}}}`
      });
      const data = getRes.data.data.getOperator;
      expect(data).to.be.an("object");
      expect(data.stages.length).to.equal(1);
    });
  });
});
