import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {/* this will loop through all the countries and put the country name and country case in one table row */}
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            {/* this will seperate the cases by commas */}
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
