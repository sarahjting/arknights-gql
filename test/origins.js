require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Origins", () => {
  describe("Queries", () => {
    it("should return all origins", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: "query{getOrigins{name}}"
      });
      expect(res.data.data.getOrigins).to.be.an("array");
      expect(res.data.data.getOrigins.length).to.equal(19);
      expect(res.data.data.getOrigins[0]).to.have.property("name");
    });
    it("should return a single origin", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOrigin(name:"Laterano"){name}}`
      });
      expect(res.data.data.getOrigin).to.be.an("object");
      expect(res.data.data.getOrigin).to.have.property("name");
      expect(res.data.data.getOrigin.name).to.equal("Laterano");
    });
    it("should not return a origin that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOrigin(name:"Fake Origin"){name}}`
      });
      expect(res.data.data.getOrigin).to.equal(null);
    });
    it("should return operators for a origin", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getOrigin(name:"Laterano"){operators{name}}}`
      });

      expect(res.data.data.getOrigin).to.be.an("object");
      expect(res.data.data.getOrigin.operators).to.be.an("array");
      expect(res.data.data.getOrigin.operators.length).to.equal(3);
    });
  });
  describe("Mutations", () => {
    it("should create a origin", async () => {
      const expected = {
        name: "Test Origin"
      };

      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OriginCreateInput!){createOrigin(input: $input){name}}`,
        variables: { input: expected }
      });
      expect(createRes.data.data.createOrigin).to.be.an("object");
      expect(createRes.data.data.createOrigin).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOrigins{name}}`
      });
      expect(getRes.data.data.getOrigins).to.be.an("array");
      expect(getRes.data.data.getOrigins.length).to.equal(20);
      expect(
        getRes.data.data.getOrigins[getRes.data.data.getOrigins.length - 1]
      ).to.deep.equal(expected);
    });
    it("should update a origin", async () => {
      const expected = {
        name: "Updated Origin"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OriginUpdateInput!){updateOrigin(name: "Test Origin", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateOrigin).to.be.an("object");
      expect(updateRes.data.data.updateOrigin).to.deep.equal(expected);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOrigin(name:"Updated Origin"){name}}`
      });
      expect(getRes.data.data.getOrigin).to.be.an("object");
      expect(getRes.data.data.getOrigin).to.deep.equal(expected);
    });
    it("should not update a origin that does not exist", async () => {
      const expected = {
        name: "New Origin"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: OriginUpdateInput!){updateOrigin(name: "Fake Origin", input: $input){name}}`,
        variables: { input: expected }
      });
      expect(updateRes.data.data.updateOrigin).to.equal(null);
    });
    it("should delete a origin", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteOrigin(name: "Updated Origin")}`
      });
      expect(deleteRes.data.data.deleteOrigin).to.be.a("boolean");
      expect(deleteRes.data.data.deleteOrigin).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getOrigins{name}}`
      });
      expect(getRes.data.data.getOrigins).to.be.an("array");
      expect(getRes.data.data.getOrigins.length).to.equal(19);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getOrigin(name:"Test Origin Updated"){name}}`
      });
      expect(checkRes.data.data.getOrigin).to.equal(null);
    });
    it("should not delete a origin that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteOrigin(name: "Test Origin")}`
      });
      expect(res.data.data.deleteOrigin).to.be.a("boolean");
      expect(res.data.data.deleteOrigin).to.equal(false);
    });
  });
});
