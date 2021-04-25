import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import simpleCanvas from "simple-canvas"
const ENDPOINT = "HIDDEN FROM PUBLIC REPO";

function Susmap(props) {
    console.log("INDEX:", props.index)
    const [susdata, setSusData] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("susmap", data => {
            setSusData(data);
          });
    }, [])

    useEffect(() => {
        reader.onload = (event) => { // called once readAsDataURL is completed
            console.log(event);
             this.url = event.target.result;
             const canvas = document.getElementById('test');
             const ctx = canvas.getContext('2d');
             const image = new Image();
             image.src = this.url;
     
             ctx.drawImage(img2canvas(data));
     
           }
    }, props.index)
    return (<>
    <div className="absolute" style={{"marginLeft": 40, "marginTop": 340, "width": 500}}>
    <div className="text-2xl text-center">
        Region Susceptibility Map 
    </div>
    {<img id="test" />}
       
    </div>
    </>)
}

export default Susmap;
