import React, { Component } from 'react'

export class Past extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dividerWidth: '90',
        }
    }
    getBack(a) {
        var r = 255, g = 255, b = 255;
        // var tr = 222, tg = 240, tb = 255
        var tr = 224, tg = 224, tb = 224
        let fact = a / 10;
        r = parseInt(r - fact * (r - tr))
        g = parseInt(g - fact * (g - tg))
        b = parseInt(b - fact * (b - tb))
        // console.log(fact, r, g, b,)
        if (a % 2 == 0) {
            return '#fff'
        } else {
            return '#f1f1f1'
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    render() {
        var divider;
        if (this.props.row != this.props.total - 1) {
            divider = <div style={{
                alignSelf: 'center', marginLeft: 50 - this.state.dividerWidth / 2 + "%",
                width: this.state.dividerWidth + "%", background: '#8fd3ff', height: '2px',
                display: 'flex'
            }}></div>
        } else {
        }
        return (
            <div style={{
                // alignItems: 'center', textAlign: 'center', justifyContent: 'center', 
                width: '100%',
                background: this.getBack(this.props.row),
            }}>
                <p style={{
                    float: 'left', marginLeft: '50px', fontSize: '21px',
                    display: 'inline-block',
                }}>
                    {this.props.date}</p>
                <p style={{
                    display: 'inline-block',
                    marginTop: '23px', marginLeft: '-10px', fontSize: '18px'
                }}>@ {this.props.time}</p>
                <p style={{
                    float: 'right', marginTop: '23px',
                    marginRight: '25px', fontSize: '17px'
                }}>Severity: <span style={{ fontSize: '18px' }}>{this.props.severity}</span></p>
                {/* <h1>{ }</h1> */}
                {divider}
            </div>
        )
    }
}

export default Past
