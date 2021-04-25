import React, { useState } from "react";
import HeatMap, { Style } from "jsheatmap";
import { getHeadings, getLabels, getValues } from "./dataSet2"
import Headings from './Headings';
useEffect(() => {
    var firebaseConfig = {
      "project_number": "138122529101",
      "project_id": "flooddetection-710f1",
      "storage_bucket": "flooddetection-710f1.appspot.com",
      "databaseURL": "https://flooddetection-710f1-default-rtdb.firebaseio.com"
      // measurementId: "G-MEASUREMENT_ID",
    };
    if (firebase.apps.length == 0) {
      firebase.initializeApp(firebaseConfig);
    }
    const headings = getHeadings()
    const labels = getLabels()
    const values = getValues()
    var data = [];
    const heatMap = new HeatMap(headings, input);
    let ref = firebase.database().ref('/dashboard_floods');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log("state", state);
      var locs = []
      let i = 0
      for (var timestamp in state) {
        console.log(timestamp)
        locs.push({ lat: state[timestamp].lat, lng: state[timestamp].lon });
        if (state[timestamp].latitude > 36 && state[timestamp].latitude < 38 && state[timestamp].lon > 119 state[timestamp].lon < 120)
        data.push(new Array({ lat: state[timestamp].lat, lng: state[timestamp].lon }));
      }
      setLocations(locs);
      const dataMap = heatMap.getData();
      
      const background = (rgb) => {    
        return `rgb(${rgb.red * 100}%, ${rgb.green * 100}%, ${rgb.blue * 100}%)`;
      }
      
    });
  }, []);

const cols = cells => {
  return cells.colors.map((c, i) => <td key={i}>
    <div style={{ background: background(c), height: '40px', width: '40px' }}>
      <span style={{ fontSize: '0.6em' }}>{cells.scales[i].toFixed(1)}</span>
    </div>
  </td>);
}

const Rows = () =>
  data.rows.map((row, i) => <tr key={row.label}>
    <td>{row.label}</td>{cols(row.cells)}
  </tr>
  );
  
const HeatMapTable = () =>
  <table>
    <tbody>
      <Headings data={data.headings} />
      <Rows />
    </tbody>
  </table>

export default HeatMapTable;
  