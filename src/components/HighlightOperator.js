import React, { useState } from "react";
import HighlightOperatorSkillRow from "./HighlightOperatorSkillRow.js";
import utils from "../utils/index.js";
export default function HighlightOperator(props) {
  const { operator, setOperator } = props;
  const [currentStage, setCurrentStage] = useState(operator.stages[0]);
  return (
    <div className="highlight-wrapper">
      <div className="highlight-close" onClick={() => setOperator(null)}>
        Return to Operator List
      </div>
      <div className="highlight">
        <div className="left">
          <div className="image">
            <img
              src={utils.getOperatorImage(
                operator.name,
                currentStage.stage.name
              )}
            />
          </div>
          <div className="faction">
            <img src={utils.getFactionImage(operator.faction.name)} />
          </div>
          <div className="class-icon">
            <img src={utils.getClassImage(operator.class.name)} />
          </div>
        </div>
        <div className="body">
          <div className="header">
            <div className="title">
              <h1>{operator.name}</h1>
              <span className="rarity">
                {"⭐⭐⭐⭐⭐⭐".substr(0, operator.rarity)}
              </span>
            </div>
            {operator.stages.map((stage, i) => {
              return (
                <div
                  className={
                    "stage-icon " +
                    (stage.stage.name === currentStage.stage.name
                      ? "active"
                      : "")
                  }
                  key={stage.stage.name}
                  data-stage={i}
                  onClick={e => {
                    setCurrentStage(operator.stages[i]);
                  }}
                >
                  <img src={utils.getStageImage(stage.stage.name)} />
                </div>
              );
            })}
          </div>

          <div className="stats">
            <table>
              <tbody>
                <tr>
                  <td className="stats-header">IID</td>
                  <td className="iid">{operator.iid}</td>
                </tr>
                <tr>
                  <td className="stats-header">Class</td>
                  <td className="className">{operator.class.name}</td>
                </tr>
                <tr>
                  <td className="stats-header">Faction</td>
                  <td className="faction">{operator.faction.name}</td>
                </tr>
                <tr>
                  <td className="stats-header">Race</td>
                  <td className="race">{operator.race.name}</td>
                </tr>
                <tr>
                  <td className="stats-header">HP</td>
                  <td className="hp">{currentStage.hp}</td>
                </tr>
                <tr>
                  <td className="stats-header">ATK</td>
                  <td className="atk">{currentStage.atk}</td>
                </tr>
                <tr>
                  <td className="stats-header">DEF</td>
                  <td className="def">{currentStage.def}</td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="stats-header">CST</td>
                  <td className="cost">{currentStage.cost}</td>
                </tr>
                <tr>
                  <td className="stats-header">BLK</td>
                  <td className="block">{currentStage.block}</td>
                </tr>
                <tr>
                  <td className="stats-header">RES</td>
                  <td className="res">{currentStage.res}</td>
                </tr>
                <tr>
                  <td className="stats-header">DEP</td>
                  <td className="redeploy">{currentStage.redeploy}</td>
                </tr>
                <tr>
                  <td className="stats-header">SPD</td>
                  <td className="atkSpeed">{currentStage.atkSpeed}</td>
                </tr>
                <tr>
                  <td className="stats-header">RNG</td>
                  <td className="isRanged">
                    {operator.isRanged ? "YES" : "NO"}
                  </td>
                </tr>
                <tr>
                  <td className="stats-header">&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="skills">
            <h1 className="skills-title">Skills</h1>
            {operator.combatSkills.map(skill => {
              return (
                <HighlightOperatorSkillRow
                  skill={skill}
                  key={skill.stage.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
