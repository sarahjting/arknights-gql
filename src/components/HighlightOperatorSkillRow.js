import React from "react";
import utils from "../utils/index.js";
export default function HighlightOperatorSkillRow(props) {
  const skill = props.skill;
  return (
    <div className="skills-skill">
      <div className="skill-body">
        <div className="skill-header">
          <div className="stage-icon">
            <img src={utils.getStageImage(skill.stage.name)} />
          </div>
          <div className="skill-title">
            <h1>{skill.stage.name}</h1>
          </div>
        </div>
        <div className="skill-description">{skill.description}</div>
      </div>
      <div className="skill-stats">
        <table>
          <tbody>
            <tr>
              <td className="stats-header">AUTO</td>
              <td className="isAuto">{skill.isAuto ? "YES" : "NO"}</td>
            </tr>
            <tr>
              <td className="stats-header">CHRG</td>
              <td className="isAutoCharge">
                {skill.isAutoCharge ? "YES" : "NO"}
              </td>
            </tr>
            <tr>
              <td className="stats-header">DRTN</td>
              <td className="duration">{skill.duration}s</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <td className="stats-header">COST</td>
              <td className="spCost">{skill.spCost}</td>
            </tr>
            <tr>
              <td className="stats-header">INIT</td>
              <td className="spInitial">{skill.spInitial}</td>
            </tr>
            <tr>
              <td className="stats-header"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
