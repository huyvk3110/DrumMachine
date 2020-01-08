import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

const CONFIG = {
    pad: [
        { key: 'Q', pad: 'Heater-1', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
        { key: 'W', pad: 'Heater-2', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
        { key: 'E', pad: 'Heater-3', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
        { key: 'A', pad: 'Heater-4', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
        { key: 'S', pad: 'Clap', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
        { key: 'D', pad: 'Open-HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
        { key: 'Z', pad: "Kick-n'-Hat", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
        { key: 'X', pad: 'Kick', sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
        { key: 'C', pad: 'Closed-HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
    ],
    bank: [
        { key: 'Q', pad: "Chord-1", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
        { key: 'W', pad: "Chord-2", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
        { key: 'E', pad: "Chord-3", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
        { key: 'A', pad: "Shaker", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
        { key: 'S', pad: "Open-HH", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
        { key: 'D', pad: "Closed-HH", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
        { key: 'Z', pad: "Punchy-Kick", sound: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
        { key: 'X', pad: "Side-Stick", sound: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
        { key: 'C', pad: "Snare", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' },
    ]
}

class App extends React.Component {
    constructor(props) {
        super(props);
        window['app'] = this;

        this.state = {
            powerOn: false,
            volume: 0,
            padKey: 'pad',
        }

        this.onTouchPad = this.onTouchPad.bind(this);
        this.onPadPlay = this.onPadPlay.bind(this);
        this.onPadEnded = this.onPadEnded.bind(this);
        this.onClickPower = this.onClickPower.bind(this);
        this.onChangeVolume = this.onChangeVolume.bind(this);
        this.onChangeBank = this.onChangeBank.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            if ('qweasdzxc'.includes(event.key)) this.onTouchPad(event.key.toUpperCase());
        })
    }

    onTouchPad(key) {
        let data = CONFIG[this.state.padKey].find(o => o.key === key);
        let audio = document.getElementById(data.key);

        if (this.state.powerOn) {
            audio.volume = this.state.volume;
            audio.play();
        }
    }

    onPadPlay(event) {
        let data = CONFIG[this.state.padKey].find(o => o.key === event.target.id);
        //Button color
        let btn = document.getElementById(`${data.pad}`);
        btn.style['background-color'] = '#ffee58';
        //Display
        let display = document.getElementById('display');
        display.innerText = data.pad
    }

    onPadEnded(event) {
        let data = CONFIG[this.state.padKey].find(o => o.key === event.target.id);
        //Button color
        let btn = document.getElementById(`${data.pad}`);
        btn.style['background-color'] = '#f5f5f5';
        //Display
        let display = document.getElementById('display');
        if (display.innerText === data.pad) display.innerText = '';
    }

    onClickPower() {
        this.setState({
            powerOn: !this.state.powerOn
        })
    }

    onChangeVolume(event) {
        this.setState({
            volume: event.target.value / 100
        })
    }

    onChangeBank(event) {
        this.setState({
            padKey: this.state.padKey === 'pad' ? 'bank' : 'pad',
        })
    }

    render() {
        const { powerOn, volume, padKey } = this.state;
        return (
            <div id="drum-machine">
                <div id="keyboard">
                    {CONFIG[padKey].map((o, i) => (<div className="drum-pad" id={o.pad} key={i} onClick={() => { this.onTouchPad(o.key) }}>
                        <audio className="clip" id={o.key} src={o.sound} onPlay={this.onPadPlay} onEnded={this.onPadEnded}></audio>{o.key}
                    </div>))}
                </div>
                <div id="controller">
                    <div className="custom-control custom-switch" id="control-power">
                        <input type="checkbox" className="custom-control-input" id="power" defaultValue={powerOn} onClick={this.onClickPower} />
                        <label htmlFor="power" className="custom-control-label">Power</label>
                    </div>
                    <div id="display"></div>
                    <div id="control-volume">
                        <input type="range" className="custom-range" id="volume" defaultValue={volume} onChange={this.onChangeVolume} />
                    </div>
                    <div className="custom-control custom-switch" id="control-bank">
                        <input type="checkbox" className="custom-control-input" id="bank" defaultValue={padKey === 'bank'} onChange={this.onChangeBank} />
                        <label htmlFor="bank" className="custom-control-label">Bank</label>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));