import React, {useState} from "react";

function Susmap(props) {
    console.log("INDEX:", props.index)

    return (<>
    <div className="absolute" style={{"marginLeft": 40, "marginTop": 340, "width": 500}}>
    <div className="text-2xl text-center">
        Region Susceptibility Map 
    </div>
    {<img src = {images[props.index]} />}
       
    </div>
    </>)
}

export default Susmap;
