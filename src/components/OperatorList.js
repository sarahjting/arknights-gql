import React from "react";
import OperatorListRow from "./OperatorListRow.js";
export default function OperatorList(props) {
  const { operators, setOperator } = props;
  return (
    <div className="operators">
      {operators
        ? operators.map(operator => (
            <OperatorListRow
              operator={operator}
              setOperator={setOperator}
              key={operator.name}
            />
          ))
        : ""}
    </div>
  );
}
