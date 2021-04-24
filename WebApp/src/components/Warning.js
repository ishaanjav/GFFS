import React, { Component } from 'react'

export class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = { warning: true };
        this.keyListener = this.keyListener.bind(this);
    }
    keyListener(event) {
        if (event.keyCode === 32) {
            // change the warning state when space key pressed
            this.setState({ warning: !this.state.warning });
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.keyListener, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyListener, false);
    }
    render() {
        var floodBox;
        if (this.state.warning) {
            floodBox = <p style={{ marginLeft: '25px', marginRight: '25px', fontSize: '21px' }}>
                No warnings at this time
                    </p>
        } else {
            floodBox = <p style={{ marginLeft: '25px', marginRight: '25px', fontSize: '21px', lineHeight: '1.5' }}>
                <span style={{ fontSize: '26px', fontWeight: '700', color: '#f00' }}>Emergency Alert: </span> Flood warning in area til 6:00 PM PDT. Take shelter now.
                    </p>
        }
        return (
            <div style={{
                alignContent: 'center', display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{ ...divStyle }}>
                    <h1 style={{ paddingTop: '17px', paddingBottom: '17px', background: '#e8f4fc', margin: '0px', borderRadius: '15px 15px 0px 0px', }}>Flood Warnings</h1>
                    {/* divider */}
                    <div style={{ height: '4px', background: '#54b2ff' }}></div>
                    <div style={{ background: '#fff' }}>
                        {floodBox}

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
}
export default Warning
