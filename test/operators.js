require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Operators", () => {
  describe("Queries", () => {
    it("should return all operators with all fields", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query:
          "query{getOperators{name rarity iid origin{name} race{name} class{name} faction{name} isRanged}}"
      });
      expect(res.data.data.getOperators).to.be.an("array");
      expect(res.data.data.getOperators.length).to.equal(84);
      expect(res.data.data.getOperators[0]).to.have.property("name");
      expect(res.data.data.getOperators[0]).to.have.property("rarity");
      expect(res.data.data.getOperators[0]).to.have.property("iid");
      expect(res.data.data.getOperators[0]).to.have.property("isRanged");
      expect(res.data.data.getOperators[0]).to.have.property("origin");
      expect(res.data.data.getOperators[0]).to.have.property("race");
      expect(res.data.data.getOperators[0]).to.have.property("class");
      expect(res.data.data.getOperators[0]).to.have.property("faction");
    });
    it("should filter operators", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query($where: OperatorWhereInput){
          getOperators(where: $where){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}
        }`,
        variables: {
          where: { class: "Vanguard" }
        }
      });
      expect(res.data.data.getOperators).to.be.an("array");
      expect(res.data.data.getOperators.length).to.equal(10);
    });
    it("should filter operators by multiple filters", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query($where: OperatorWhereInput){
          getOperators(where: $where){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}
        }`,
        variables: {
          where: { class: "Vanguard", rarity: 6 }
        }
      });
      expect(res.data.data.getOperators).to.be.an("array");
      expect(res.data.data.getOperators.length).to.equal(1);
    });
    it("should sort operators", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query($where: OperatorWhereInput, $orderBy: OperatorOrderBy){
            getOperators(where: $where, orderBy: $orderBy){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}
          }`,
        variables: {
          where: { class: "Vanguard" },
          orderBy: "atk"
        }
      });
      expect(res.data.data.getOperators).to.be.an("array");
      expect(res.data.data.getOperators.length).to.equal(10);
      expect(res.data.data.getOperators[0].name).to.equal("Vigna");
    });
    it("should return a single operator by name with all fields", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Exusiai"){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}}`
      });
      expect(res.data.data.getOperator).to.be.an("object");
      expect(res.data.data.getOperator).to.have.property("name");
      expect(res.data.data.getOperator).to.have.property("rarity");
      expect(res.data.data.getOperator).to.have.property("iid");
      expect(res.data.data.getOperator).to.have.property("isRanged");
      expect(res.data.data.getOperator).to.have.property("origin");
      expect(res.data.data.getOperator).to.have.property("race");
      expect(res.data.data.getOperator).to.have.property("class");
      expect(res.data.data.getOperator).to.have.property("faction");
    });
    it("should not return a operator that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name:"FAKE"){name}}`
      });
      expect(res.data.data.getOperator).to.equal(null);
    });
  });
  describe("Mutations", () => {
    it("should create a operator", async () => {
      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OperatorCreateInput!){createOperator(input: $input){name}}`,
        variables: {
          input: {
            name: "Operator",
            rarity: 6,
            iid: 0,
            origin: "RIM Billiton",
            faction: "Rhodes Island",
            race: "Kuranta",
            class: "Sniper",
            isRanged: true
          }
        }
      });
      expect(createRes.data.data.createOperator).to.be.an("object");
      expect(createRes.data.data.createOperator.name).to.equal("Operator");

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query($orderBy: OperatorOrderBy){getOperators(orderBy:$orderBy){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}}`,
        variables: { orderBy: "id" }
      });
      expect(getRes.data.data.getOperators).to.be.an("array");
      expect(getRes.data.data.getOperators.length).to.equal(85);
      expect(getRes.data.data.getOperators[0]).to.deep.equal({
        name: "Operator",
        rarity: 6,
        iid: 0,
        origin: {
          name: "RIM Billiton"
        },
        faction: {
          name: "Rhodes Island"
        },
        race: {
          name: "Kuranta"
        },
        class: {
          name: "Sniper"
        },
        isRanged: true
      });
    });
    it("should update a operator", async () => {
      const expected = {
        name: "Updated",
        rarity: 5,
        iid: 1,
        origin: "Kazimierz",
        faction: "Great Lungmen",
        race: "Zarak",
        class: "Medic",
        isRanged: false
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OperatorUpdateInput!){updateOperator(name: "Operator", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateOperator).to.be.an("object");
      expect(updateRes.data.data.updateOperator.name).to.equal("Updated");

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name: "Updated"){name rarity iid origin{name} race{name} class{name} faction{name} isRanged}}`
      });
      expect(getRes.data.data.getOperator).to.be.an("object");
      expect(getRes.data.data.getOperator).to.deep.equal({
        name: "Updated",
        rarity: 5,
        iid: 1,
        origin: {
          name: "Kazimierz"
        },
        faction: {
          name: "Great Lungmen"
        },
        race: {
          name: "Zarak"
        },
        class: {
          name: "Medic"
        },
        isRanged: false
      });
    });
    it("should delete a operator", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteOperator(name: "Updated")}`
      });
      expect(deleteRes.data.data.deleteOperator).to.be.a("boolean");
      expect(deleteRes.data.data.deleteOperator).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperators{name}}`
      });
      expect(getRes.data.data.getOperators).to.be.an("array");
      expect(getRes.data.data.getOperators.length).to.equal(84);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getOperator(name:"Updated"){name}}`
      });
      expect(checkRes.data.data.getOperator).to.equal(null);
    });
  });
});
