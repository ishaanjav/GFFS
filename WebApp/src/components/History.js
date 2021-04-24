import React, { Component } from 'react'
import Past from '../components/Past'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';
import { convert } from '../Utilities/time.js'

var firebaseConfig = {
    apiKey: "AIzaSyCKRSrpvDr_XuhqL0tCwVvDU4w_ZUykCIU",
    authDomain: "flooddetection-710f1.firebaseapp.com",
    databaseURL: "https://flooddetection-710f1-default-rtdb.firebaseio.com",
    projectId: "flooddetection-710f1",
    storageBucket: "flooddetection-710f1.appspot.com",
    messagingSenderId: "138122529101",
    appId: "1:138122529101:web:931b97319247f61b790f04",
    measurementId: "G-JNGM8CVJVR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
var cnt = 0;
export class History extends Component {
    constructor(props) {
        super(props);
        this.state = { rows: [] };
        this.getPast.bind(this);
    }
    componentDidMount() {
        this.getPast();
    }
    getPast() {
        // This is user's city.
        var cityName = "Plano"
        // Hard coded testing ---V
        /* var indents = [];
        var dates = ["4-22-21", "4-02-21", "3-06-21"];
        var times = ["3 PM", "5 PM", "10 AM"];
        var severities = ["3", "8", "6"];
        for (var i = 0; i < 3; i++) {
            indents.push(<Past date={dates[i]} time={times[i]} severity={severities[i]} row={i} total={times.length} />)
        }
        this.setState({ rows: indents })
        console.log(this.state.rows)
        console.log(indents) */

        var starCountRef = firebase.database().ref('past_floods/' + cityName);
        starCountRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var flood = data.val();
                console.log("DAT: ", data.length);
                var cur = this.state.rows;
                cur.push(<Past date={flood.date} time={convert(flood.time)} severity={flood.severity} row={cur.length} total={3} />)
                this.setState({ rows: cur })
            });
        });
    }
    render() {
        // getPast();
        // { this.getPast() }
        var indents = [];
        for (var i = 0; i < 3; i++) {
            indents.push(<tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
            </tr>);
        }
        return (
            <div style={{
                alignContent: 'center', display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{ ...divStyle }}>
                    <h1 style={{
                        paddingTop: '17px', paddingBottom: '17px', background: '#54b2ff', margin: '0px',
                        borderRadius: '15px 15px 0px 0px', color: 'white'
                    }}>
                        Past Floods
                    </h1>
                    <table style={{ width: '100%' }}>
                        {/* <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Age</th>
                        </tr> */}
                        {this.state.rows}
                        {/* {indents} */}
                    </table>
                </div>

            </div>
        )
    }
}
const divStyle = {
    background: '#fff',
    width: '70%',
    textAlign: 'center',
    borderRadius: '15px',
    // border: '2px solid #bee3fa',
    // boxShadow: '2px 5px #eee',
}
export default History
