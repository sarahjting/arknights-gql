import React, { useEffect, useState } from "react";
import Blurb from "./Blurb.js";
import Form from "./Form.js";
import HighlightOperator from "./HighlightOperator.js";
import OperatorList from "./OperatorList.js";
import utils from "../utils/index.js";

export default function App() {
  const [operator, setOperator] = useState(null);
  const [operatorList, setOperatorList] = useState(null);
  const [formData, setFormData] = useState(null);

  const loadOperator = name => {
    utils
      .query(
        `query{getOperator(name: "${name}"){
          iid name rarity isRanged class{name} faction{name} race{name}
          stages{stage{name} hp atk def cost block res redeploy atkSpeed}
          combatSkills{stage{name} description isAutoCharge isAuto duration spCost spInitial}
        }}`
      )
      .then(data => {
        setOperator(data.getOperator);
      });
  };

  const loadOperators = (where, orderBy) => {
    let q = `query($where: OperatorWhereInput, $orderBy: OperatorOrderBy){
      getOperators(where: $where, orderBy: $orderBy){
          name rarity isRanged 
          class{name} faction{name} 
          finalStage{stage{name} hp atk def cost block res redeploy atkSpeed}
        }
    }`;
    utils.query(q, { where, orderBy }).then(data => {
      setOperatorList(data.getOperators);
    });
  };

  useEffect(() => {
    utils
      .query(
        "query{classes:getClasses{name} races:getRaces{name} factions:getFactions{name}}"
      )
      .then(data => setFormData(data));
  }, []);

  let formComponent = "",
    operatorListComponent = "",
    highlightOperatorComponent = "";
  if (operator) {
    highlightOperatorComponent = (
      <HighlightOperator operator={operator} setOperator={setOperator} />
    );
  }
  if (!operator && formData) {
    formComponent = (
      <Form operator={operator} data={formData} loadOperators={loadOperators} />
    );
  }
  if (!operator && operatorList) {
    operatorListComponent = (
      <OperatorList setOperator={loadOperator} operators={operatorList} />
    );
  }

  return (
    <div>
      <Blurb />
      {highlightOperatorComponent}
      {formComponent}
      {operatorListComponent}
    </div>
  );
}
