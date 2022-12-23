import React from "react";
import numeral from "numeral";

// pulling Circle and popups from the react-leaflet library
// the circle is for making circle on the maps based on the number of cases
// popup is basically a card pops up when clicking on any country giving information about the cases
import { Circle, Popup } from "react-leaflet";

// defining a schema which will decide the color of the circles and multiplier to
// determine radius of the circle based on the casesType paased as a props in the function "showDataonMap"
export const casesTypeColors = {
  // color scheme for total cases - red
  cases: {
    multiplier: 200,
    option: { color: "#CC1034", fillColor: "rgba(204, 16, 52, 0.5)" },
  },

  // color scheme for recovered cases - green
  recovered: {
    multiplier: 300,
    option: { color: "#7dd71d", fillColor: "rgba(125, 215, 29, 0.5)" },
  },

  //color scheme for deaths - orange
  deaths: {
    multiplier: 800,
    option: { color: "#FF8C00", fillColor: "rgba(255,140,0,0.5)" },
  },
  
};

// function for sorting the total number of cases which is to be shown on the right side of the webpage
export const sortData = (data) => {
  let sortedData = [...data]; // this will copy all the data into this variable

  // writing the condition for the custom sort function
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  // return sorted data
  return sortedData;

  // return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
};

// this function is to format the todayCases/todayRecovered/todayDeaths
// by adding a '+' sign in front of it and changing into thousands format(....k)
export const prettyPrintStat = (stat) =>
  // if there is any stat for that country then format it in this way otherwise simply return +0
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// This function adds the circles and the popups to the map.
export const showDataOnMap = (
  data,
  casesType = "cases" // getting the data and casesType as props and caseType is set to cases as default
) =>
  data.map((country) => (
    // circle componnets with some of its attributes defined
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]} // determines the center of the circle to the latitude and longitude location of country
      pathOptions={casesTypeColors[casesType].option}
      fillOpacity={0.4} // opacity/transparancy of the color filled in the circles
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier // determining the radius of the circle using the multiplier from the schema defined
      }
    >
      {/* Popup component when we click on a particular country on the map */}
      <Popup>
        <div className="info-container">
          {/* first div will add the country flag which whic is pulled from the api */}
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>

          {/* Name of the country */}
          <div className="info-name">{country.country}</div>

          {/* total no of cases which is formated to use commas in between */}
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>

          {/* total no of recovered cases which is formated to use commas in between */}
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>

          {/* total no of death cases which is formated to use commas in between */}
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
