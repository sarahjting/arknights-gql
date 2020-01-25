const axios = require("axios");
require("./app.scss");

$(document).ready(function() {
  $(".class-icon").on("click", function() {
    const className = $(this).attr("data-class");
    if (className) loadOperators({ class: className });
  });
});

function query(query, variables = []) {
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

function loadForm() {
  query("query{getClasses{name} getRaces{name} getFactions{name}}").then(
    data => {
      data.getClasses.forEach(v => {
        $($(".class-select")[0]).append(`<option>${v.name}</option>`);
      });
      data.getRaces.forEach(v => {
        $($(".race-select")[0]).append(`<option>${v.name}</option>`);
      });
      data.getFactions.forEach(v => {
        $($(".faction-select")[0]).append(`<option>${v.name}</option>`);
      });
      $(".form-wrapper").removeClass("hide");
    }
  );
}
function getOperatorImage(operatorName, imageName) {
  return `/img/operators/${operatorName
    .toLowerCase()
    .replace(`'`, "")
    .replace(" ", "-")}-${imageName === "ELITE0" ? "BASE" : imageName}.png`;
}
function getFactionImage(factionName) {
  return `/img/factions/${factionName.toLowerCase().replace(" ", "-")}.png`;
}
function getClassImage(className) {
  return `/img/classes/${className.toLowerCase()}.png`;
}
function getStageImage(stageName) {
  return `/img/stages/${stageName}.png`;
}
function loadOperatorStage(operator, stage) {
  $(".image img", ".highlight").attr(
    "src",
    getOperatorImage(operator.name, stage)
  );
  ["hp", "atk", "def", "cost", "block", "res", "redeploy", "atkSpeed"].forEach(
    key => {
      $(`.${key}`, ".highlight").text(
        operator.stages.find(d => d.stage.name === stage)[key]
      );
    }
  );
  $(".highlight .header .stage-icon").removeClass("active");
  $(`.highlight .header .stage-icon[data-stage="${stage}"]`).addClass("active");
}
function loadOperator(name) {
  query(
    `query{getOperator(name: "${name}"){
          iid name rarity isRanged class{name} faction{name} race{name}
          stages{stage{name} hp atk def cost block res redeploy atkSpeed}
          combatSkills{stage{name} description isAutoCharge isAuto duration spCost spInitial}
        }}`
  ).then(data => {
    if (!data.getOperator) return;
    const v = data.getOperator;

    if (v.faction) {
      $(".faction img", ".highlight").attr(
        "src",
        getFactionImage(v.faction.name)
      );
    }
    $(".class-icon", ".highlight").attr("data-class", v.class.name);
    $(".class-icon img", ".highlight").attr("src", getClassImage(v.class.name));
    $(".title h1", ".highlight").text(v.name);
    $(".iid", ".highlight").text(v.iid);
    $(".rarity", ".highlight").text("⭐⭐⭐⭐⭐⭐".substr(0, v.rarity));
    $(".isRanged", ".highlight").text(v.isRanged ? "YES" : "NO");
    $(".highlight .header .stage-icon").each((i, el) => {
      if (v.stages.length > i) {
        el.classList.remove("hide");
      } else {
        el.classList.add("hide");
      }
    });

    ["class", "faction", "race"].forEach(k => {
      $(`.${k}`, ".highlight").text(v[k] ? v[k].name : "");
    });

    $(".skills .skills-skill", ".highlight").remove();
    if (!v.combatSkills.length) {
      $(".skills", ".highlight").addClass("hide");
    } else {
      $(".skills", ".highlight").removeClass("hide");
      v.combatSkills.forEach(sk => {
        const newRow = $(".skill-clone .skills-skill").clone();
        $(".stage-icon img", newRow).attr("src", getStageImage(sk.stage.name));
        $(".skill-title h1", newRow).text(sk.stage.name);
        $(".skill-description", newRow).text(sk.description);
        $(".isAuto", newRow).text(sk.isAuto ? "YES" : "NO");
        $(".isAutoCharge", newRow).text(sk.isAutoCharge ? "YES" : "NO");
        ["duration", "spCost", "spInitial"].forEach(k => {
          $(`.${k}`, newRow).text(sk[k]);
        });
        $(".skills").append(newRow);
      });
    }

    loadOperatorStage(v, "ELITE0");
    $(".highlight .stage-icon").each((i, el) => {
      $(el).unbind("click");
      if (!$(el).hasClass("hide")) {
        $(el).click(function() {
          loadOperatorStage(v, $(this).data("stage"));
        });
      }
    });
    $(".operators").addClass("hide");
    $(".highlight-wrapper").removeClass("hide");

    $(".highlight-close").click(() => {
      $(".highlight-wrapper").addClass("hide");
      $(".operators").removeClass("hide");
    });
  });
}
function loadOperators(where) {
  let q =
    "query{getOperators{name rarity isRanged class{name} faction{name} finalStage{stage{name} hp atk def cost block res redeploy atkSpeed}}}";
  query(q).then(data => {
    $(".operators").html("");
    if (data.getOperators.length == 0) {
      $(".operators").html("No operators found!");
    } else {
      data.getOperators.forEach(v => {
        const newRow = $(".operator-clone .operators-operator").clone();

        $(".thumb img", newRow).attr("src", getOperatorImage(v.name, "thumb"));
        if (v.faction) {
          $(".faction img", newRow).attr(
            "src",
            getFactionImage(v.faction.name)
          );
        }
        $(".stage-icon img", newRow).attr(
          "src",
          getStageImage(v.finalStage.stage.name)
        );
        $(".class-icon img", newRow).attr("src", getClassImage(v.class.name));
        $(".class-icon", newRow).attr("data-class", v.class.name);

        $(".title h1", newRow).text(v.name);
        $(".isRanged", newRow).text(v.isRanged ? "YES" : "NO");
        $(".rarity", newRow).text("⭐⭐⭐⭐⭐⭐".substr(0, v.rarity));

        [
          "hp",
          "atk",
          "def",
          "cost",
          "block",
          "res",
          "redeploy",
          "atkSpeed"
        ].forEach(k => {
          $(`.${k}`, newRow).text(v.finalStage[k]);
        });

        $(newRow).removeClass("hide");
        $(".operators").prepend(newRow);
        $(".thumb", newRow).click(() => loadOperator(v.name));
        $(".title", newRow).click(() => loadOperator(v.name));
      });
    }
  });
}

loadForm();
loadOperators();
