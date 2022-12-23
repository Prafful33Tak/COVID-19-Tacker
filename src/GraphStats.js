import React from "react";
import LineGraph from "./LineGraph";
import Aux from "../../hoc/Aux";
import { caseTypes } from "../../constants";
import { useContext } from "react";
import { SomeContext } from "../../Provider";
import "./GraphStats.css";

export default function GraphStats() {
  const [context, _] = useContext(SomeContext);
  const { caseType } = context;
  return (
    <Aux>
      <div className="graph_heading">
        <h3 className="title">{caseTypes[caseType].title} cases</h3>
      </div>
      <LineGraph casesType={caseType} />
    </Aux>
  );
}
