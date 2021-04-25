import React, { useState, useEffect } from "react";
import DraggableMap from "./DraggableMap";
import firebase from "firebase";
import Header from "./Header";
import Table from "./Table";
import Warning from "./Warning";
import Susmap from "./Susmap";

function App(props) {
  const [currentCenter, setCurrentCenter] = useState({ lat: 43, lng: -80 });
  const [locations, setLocations] = useState([])
  const lats = [47.606, 51.0447, 49.2827];
  const lons = [122.332, 114.0719, 123.1207];
  const [idx, setidx] = useState(-1);
  const [currlat, setcurrlat] = useState(0);
  const [currlon, setcurrlon] = useState(0);



  useEffect(() => {
    function keyListener(event) {
      if (event.keyCode === 75) {
        // change the warning state when k key pressed
        // console.log(idx);
        setidx(prev => prev+1);
      }
    }
    document.addEventListener("keydown", keyListener, false);
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

    let ref = firebase.database().ref('/dashboard_floods');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log("state", state);
      var locs = []
      let i = 0
      for (var timestamp in state) {
        console.log(timestamp)
        locs.push({ lat: state[timestamp].lat, lng: state[timestamp].lon });
      }
      setLocations(locs);
    });
  }, []);

  // const cols = cells => {
  //   return cells.colors.map((c, i) => <td key={i}>
  //     <div style={{ background: background(c), height: '40px', width: '40px' }}>
  //       <span style={{ fontSize: '0.6em' }}>{cells.scales[i].toFixed(1)}</span>
  //     </div>
  //   </td>);
  // }
  
  // const Rows = () =>
  //   data.rows.map((row, i) => <tr key={row.label}>
  //     <td>{row.label}</td>{cols(row.cells)}
  //   </tr>
  //   );

  useEffect(() => {
    console.log("locations", locations);
  }, [locations]);

  return <>
    <Header></Header>

    <div style={{ maxWidth: "100%", maxHeight: "100%" }} className="h-screen flex">
      <div className="flex-row">
        <div className="border-gray-300 border-2 mx-2 my-2" style={{ "width": 600, "height": 300 }}>
          <h1 className="font-bold text-xl px-3 pt-3"> Flood Risk Results for {lats[idx]} {lons[idx]}</h1>
          <Warning></Warning>

          <div className="bg-white mx-2 absolute" style={{ "marginLeft": 610, "marginTop": -130, "width": 700, "height": 300 }}>

          </div>
        </div>
      </div>
      <DraggableMap
        currentCenter={currentCenter}
        locations={locations}
      />
      <Susmap index={idx}></Susmap>
      <Table></Table>
    </div>
  </>
}
export default App;