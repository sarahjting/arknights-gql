import React from "react";
import utils from "../utils/index.js";
export default function OperatorListRow(props) {
  const { operator, setOperator } = props;
  return (
    <div
      className="operators-operator"
      onClick={() => setOperator(operator.name)}
      key={operator.id}
    >
      <div className="thumb">
        <img src={utils.getOperatorImage(operator.name, "thumb")} />
      </div>
      <div className="body">
        <div className="header">
          <div className="faction">
            <img src={utils.getFactionImage(operator.faction.name)} />
          </div>
          <div className="stage-icon">
            <img src={utils.getStageImage(operator.finalStage.stage.name)} />
          </div>
          <div className="class-icon">
            <img src={utils.getClassImage(operator.class.name)} />
          </div>
          <div className="title">
            <h1>{operator.name}</h1>
            <span className="rarity">
              {"⭐⭐⭐⭐⭐⭐".substr(0, operator.rarity)}
            </span>
          </div>
        </div>
        <div className="stats">
          <table>
            <tbody>
              <tr>
                <td className="stats-header">HP</td>
                <td className="hp">{operator.finalStage.hp}</td>
              </tr>
              <tr>
                <td className="stats-header">ATK</td>
                <td className="atk">{operator.finalStage.atk}</td>
              </tr>
              <tr>
                <td className="stats-header">DEF</td>
                <td className="def">{operator.finalStage.def}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td className="stats-header">CST</td>
                <td className="cost">{operator.finalStage.cost}</td>
              </tr>
              <tr>
                <td className="stats-header">BLK</td>
                <td className="block">{operator.finalStage.block}</td>
              </tr>
              <tr>
                <td className="stats-header">RES</td>
                <td className="res">{operator.finalStage.res}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td className="stats-header">DEP</td>
                <td className="redeploy">{operator.finalStage.redeploy}</td>
              </tr>
              <tr>
                <td className="stats-header">SPD</td>
                <td className="atkSpeed">{operator.finalStage.atkSpeed}</td>
              </tr>
              <tr>
                <td className="stats-header">RNG</td>
                <td className="isRanged">{operator.isRanged ? "YES" : "NO"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
