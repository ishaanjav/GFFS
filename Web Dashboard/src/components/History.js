import React, { Component } from 'react'

export class History extends Component {
    render() {
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
                    {/* divider */}
                    <div style={{ height: '3px', background: '#008dff' }}></div>
                    <div style={{}}>
                        <p style={{ marginLeft: '25px', marginRight: '25px', fontSize: '21px' }}>
                            No past floods
                        </p>
                    </div>
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
