require("dotenv").config();
const axios = require("axios");
const { expect } = require("chai");
const url = `http://localhost:${process.env.PORT}`;

describe("Classes", () => {
  describe("Queries", () => {
    it("should return all classes", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: "query{getClasses{name description}}"
      });
      expect(res.data.data.getClasses).to.be.an("array");
      expect(res.data.data.getClasses.length).to.equal(8);
      expect(res.data.data.getClasses[0]).to.have.property("name");
      expect(res.data.data.getClasses[0]).to.have.property("description");
    });
    it("should return a single class", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Vanguard"){name description}}`
      });
      expect(res.data.data.getClass).to.be.an("object");
      expect(res.data.data.getClass).to.have.property("name");
      expect(res.data.data.getClass).to.have.property("description");
      expect(res.data.data.getClass.name).to.equal("Vanguard");
    });
    it("should not return a class that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Fake Class"){name description}}`
      });
      expect(res.data.data.getClass).to.equal(null);
    });
    it("should return operators for a class", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Vanguard"){operators{name}}}`
      });

      expect(res.data.data.getClass).to.be.an("object");
      expect(res.data.data.getClass.operators).to.be.an("array");
      expect(res.data.data.getClass.operators.length).to.equal(10);
    });
  });
  describe("Mutations", () => {
    it("should create a class", async () => {
      const expectedClass = {
        name: "Test Class",
        description: "test class description"
      };

      const createRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: ClassInput!){createClass(input: $input){name description}}`,
        variables: { input: expectedClass }
      });
      expect(createRes.data.data.createClass).to.be.an("object");
      expect(createRes.data.data.createClass).to.deep.equal(expectedClass);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getClasses{name description}}`
      });
      expect(getRes.data.data.getClasses).to.be.an("array");
      expect(getRes.data.data.getClasses.length).to.equal(9);
      expect(
        getRes.data.data.getClasses[getRes.data.data.getClasses.length - 1]
      ).to.deep.equal(expectedClass);
    });
    it("should update a class", async () => {
      const expectedClass = {
        name: "Updated Class",
        description: "test class description updated"
      };

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: ClassInput!){updateClass(name: "Test Class", input: $input){name description}}`,
        variables: { input: expectedClass }
      });
      expect(updateRes.data.data.updateClass).to.be.an("object");
      expect(updateRes.data.data.updateClass).to.deep.equal(expectedClass);

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Updated Class"){name description}}`
      });
      expect(getRes.data.data.getClass).to.be.an("object");
      expect(getRes.data.data.getClass).to.deep.equal(expectedClass);
    });
    it("should partially update a class", async () => {
      const expectedDescription = "test class description updated 2";

      const updateRes = await axios.post(`${url}/graphql`, {
        query: `mutation($input: ClassInput!){updateClass(name: "Updated Class", input: $input){name description}}`,
        variables: { input: { description: expectedDescription } }
      });
      expect(updateRes.data.data.updateClass).to.be.an("object");
      expect(updateRes.data.data.updateClass.description).to.equal(
        expectedDescription
      );

      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Updated Class"){name description}}`
      });
      expect(getRes.data.data.getClass).to.be.an("object");
      expect(getRes.data.data.getClass.description).to.equal(
        expectedDescription
      );
    });
    it("should delete a class", async () => {
      const deleteRes = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteClass(name: "Updated Class")}`
      });
      expect(deleteRes.data.data.deleteClass).to.be.a("boolean");
      expect(deleteRes.data.data.deleteClass).to.equal(true);
      const getRes = await axios.post(`${url}/graphql`, {
        query: `query{getClasses{name description}}`
      });
      expect(getRes.data.data.getClasses).to.be.an("array");
      expect(getRes.data.data.getClasses.length).to.equal(8);
      const checkRes = await axios.post(`${url}/graphql`, {
        query: `query{getClass(name:"Test Class Updated"){name description}}`
      });
      expect(checkRes.data.data.getClass).to.equal(null);
    });
    it("should not delete a class that does not exist", async () => {
      const res = await axios.post(`${url}/graphql`, {
        query: `mutation{deleteClass(name: "Test Class")}`
      });
      expect(res.data.data.deleteClass).to.be.a("boolean");
      expect(res.data.data.deleteClass).to.equal(false);
    });
  });
});
