import React, { useState, useEffect } from "react";
import DraggableMap from "./DraggableMap";
import firebase from "firebase";
import Header from "./Header";
import Table from "./Table";

function App(props) {
  const [currentCenter, setCurrentCenter] = useState({ lat: 43, lng: -80 });
  const [locations, setLocations] = useState([])

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

  useEffect(() => {
    console.log("locations", locations);
  }, [locations]);

  return <>
    <Header></Header>

    <div style={{ maxWidth: "100%", maxHeight: "100%" }} className="h-screen flex">
      <div className="flex-row">
        <div className="border-gray-300 border-2 mx-2 my-2" style={{ "width": 600, "height": 300 }}>
          <h1 className="font-bold text-xl px-3 pt-3"> Query Results for 35.5N 82.6W</h1>
          <div className="bg-white mx-2 absolute" style={{ "marginLeft": 610, "marginTop": -44, "width": 700, "height": 300 }}>
          <DraggableMap
            currentCenter={currentCenter}
            locations={locations}
          />
          </div>
        </div>
      </div>

      <Table></Table>
    </div>
  </>
}

export default App;