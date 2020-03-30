import React from "react";
import OperatorListRow from "./OperatorListRow.js";
export default function OperatorList(props) {
  const getOperatorListRows = () => {
    if (!operators) return "";
    return operators.map(operator => (
      <OperatorListRow
        operator={operator}
        setOperator={setOperator}
        key={operator.name}
      />
    ));
  };

  const { operators, setOperator } = props;
  return <div className="operators">{getOperatorListRows()}</div>;
}
