import React, { Component } from 'react'
import icon from '../images/icon.png'
export default class Header extends Component {
    render() {
        return (
            <div style={{
                padding: '1px',
                margin: '0px',
                background: '#fff0c4',
                textAlign: 'left'
            }}>
                <img style={{ marginTop: '-19px', verticalAlign: 'middle', marginLeft: '3%', width: '50px', display: 'inline-block' }} src={icon}></img>
                <h1 style={{ marginLeft: '1%', display: 'inline-block' }}>Disaster Dashboard</h1>
                <p style={{
                    float: 'right', display: 'inline-block',
                    marginTop: '31px', marginRight: '20px',
                    color: 'blue',
                }}><u>Log out</u></p>
            </div>
        )
    }
}
