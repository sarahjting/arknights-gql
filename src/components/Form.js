import React, { useEffect, useState } from "react";
export default function Form(props) {
  const { data, loadOperators } = props;

  const { races, factions, classes } = data;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("rarity");
  useEffect(() => {
    const where = {};
    if (selectedClass) where.class = selectedClass;
    if (selectedRace) where.race = selectedRace;
    if (selectedFaction) where.faction = selectedFaction;
    if (selectedRarity) where.rarity = Number(selectedRarity);
    loadOperators(where, selectedOrderBy);
  }, [
    selectedClass,
    selectedRace,
    selectedFaction,
    selectedRarity,
    selectedOrderBy
  ]);
  return (
    <div className="form-wrapper">
      <div className="form">
        <div className="form-element">
          <div className="form-header">Class</div>
          <div className="form-input">
            <select
              className="class-select"
              onChange={e => setSelectedClass(e.target.value)}
            >
              <option></option>
              {classes.map(x => (
                <option key={x.name}>{x.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-element">
          <div className="form-header">Race:</div>
          <div className="form-input">
            <select
              className="race-select"
              onChange={e => setSelectedRace(e.target.value)}
            >
              <option></option>
              {races.map(x => (
                <option key={x.name}>{x.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-element">
          <div className="form-header">Faction</div>
          <div className="form-input">
            <select
              className="faction-select"
              onChange={e => setSelectedFaction(e.target.value)}
            >
              <option></option>
              {factions.map(x => (
                <option key={x.name}>{x.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-element">
          <div className="form-header">Rarity</div>
          <div className="form-input">
            <select
              className="rarity-select"
              onChange={e => setSelectedRarity(e.target.value)}
            >
              <option></option>
              <option value="1">1⭐</option>
              <option value="2">2⭐</option>
              <option value="3">3⭐</option>
              <option value="4">4⭐</option>
              <option value="5">5⭐</option>
              <option value="6">6⭐</option>
            </select>
          </div>
        </div>
        <div className="form-element">
          <div className="form-header">Order By</div>
          <div className="form-input">
            <select
              className="order-select"
              onChange={e => setSelectedOrderBy(e.target.value)}
            >
              <option value="rarity">Rarity</option>
              <option value="hp">HP</option>
              <option value="atk">ATK</option>
              <option value="def">DEF</option>
              <option value="cost">COST</option>
              <option value="block">BLOCK</option>
              <option value="res">RES</option>
              <option value="redeploy">REDEPLOY</option>
              <option value="atkSpeed">ATK SPEED</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
