import React from "react";


import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap defaultZoom={3} center={props.center}>
            {props.markers.map((value, index) => {
                return <h1>{value.lat}</h1>
            })}
            {props.markers.map((value, index) => {
                return <Marker key={index} position={{ lat: parseFloat(value.lat), lng: parseFloat(value.lng) }}
                    icon="https://www.robotwoods.com/dev/misc/bluecircle.png" />
            })}
        </GoogleMap>
    ))
);


function DraggableMap(props) {
    return <>
        <div className="flex-1 h-full overflow-y-hidden">
            <MapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9u0a8wUPG0p0pw_Ym_pmV_gkvd1jUfIs&v=3.exp"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={props.currentCenter}
                markers={props.locations}
            />
        </div>
    </>
}

export default DraggableMap;