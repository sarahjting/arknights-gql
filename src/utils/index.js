import axios from "axios";
export default {
  getOperatorImage: (operatorName, imageName) => {
    return `/img/operators/${operatorName
      .toLowerCase()
      .replace(`'`, "")
      .replace(" ", "-")}-${imageName === "ELITE0" ? "BASE" : imageName}.png`;
  },
  getFactionImage: factionName =>
    `/img/factions/${factionName.toLowerCase().replace(" ", "-")}.png`,
  getClassImage: className => `/img/classes/${className.toLowerCase()}.png`,
  getStageImage: stageName => `/img/stages/${stageName}.png`,
  query: (query, variables = []) => {
    return new Promise((res, rej) => {
      axios
        .post("/graphql", {
          query: query,
          variables: variables
        })
        .then(data => data.data.data)
        .then(data => {
          console.log(query, variables, data);
          res(data);
        })
        .catch(err => {
          console.log(query, variables, err);
        });
    });
  }
};
