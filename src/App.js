import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useState } from 'react';
import "react-color-palette/dist/css/rcp.css";
import {ColorPicker, useColor} from "react-color-palette";
import {ChromePicker} from "react-color";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faPowerOff, faPowerOn, faStop, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';


const firebaseConfig = {
    apiKey: "AIzaSyAnN-nIGYryOTafsBtiahwQNXbiU8yPBu8",
    authDomain: "led-ligths-682cc.firebaseapp.com",
    databaseURL: "https://led-ligths-682cc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "led-ligths-682cc",
    storageBucket: "led-ligths-682cc.appspot.com",
    messagingSenderId: "626969193906",
    appId: "1:626969193906:web:70283ab71e0475265ec8ab"
};
firebase.initializeApp(firebaseConfig);
function App() {
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [thirdNumber, setThirdNumber] = useState(0);
    const [isIncluded, setIsIncluded] = useState(true);
    const prevState=false;
    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };
    const [color, setColor] = useColor("hex", "#00FF00");
    const sendDataToFirebase = () => {
        firebase.database().ref('ledColors').set({
            firstNumber: parseInt(firstNumber),
            secondNumber: parseInt(secondNumber),
            thirdNumber: parseInt(thirdNumber)
        }).then(() => {
            console.log('Data sent successfully');
        }).catch((error) => {
            console.error('Error sending data:', error);
        });
    }
    const [isPowerOn, setIsPowerOn] = useState(false);

    const sendValueOnffToFirebase = (isPowerOn) => {
        firebase.database().ref('power').set({
            powerOnOrOff: isPowerOn
        }).then(() => {
            console.log('Data sent successfully');
        }).catch((error) => {
            console.error('Error sending data:', error);
        });
    };
    const togglePower = () => {
        setIsPowerOn(prevState => !prevState);
        sendValueOnffToFirebase(isPowerOn)
    };
    const toggleAutomaticLight = () => {
        setIsIncluded(prevState => !prevState); // Toggle the state
        sendValueToFirebase(isIncluded); // Call function to send value to Firebase
    };
    const sendValueToFirebase=(value)=>{
        firebase.database().ref('photoresistor').set({
            usePhotoresistor: isIncluded
        }).then(() => {
            console.log('Data sent successfully');
        }).catch((error) => {
            console.error('Error sending data:', error);
        });
    }
    const handleColorChange = (newColor) => {
        setColor(newColor);
        setFirstNumber(parseInt(newColor.rgb.r));
        setSecondNumber(parseInt(newColor.rgb.g));
        setThirdNumber(parseInt(newColor.rgb.b));
    };

    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="text-center">
                    <button className="power-button" onClick={togglePower}>
                        <FontAwesomeIcon icon={isPowerOn ? faToggleOn  : faToggleOff} />
                    </button>
                    <span>{isPowerOn ? 'LED turned on' : 'LED turned Off'}</span>

                </div>
                <br/>
                <br/>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">LED Color Picker</h1>
                            <ChromePicker
                                color={color}
                                onChange={handleColorChange}
                            />
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                                <label className="mr-2">Selected Color: </label>
                                <div className="ColorDiv" style={{ backgroundColor: `rgb(${firstNumber},${secondNumber},${thirdNumber})` }}></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Red:</label>
                                <input type="number" className="form-control" value={firstNumber} onChange={(e) => handleInputChange(e, setFirstNumber)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Green:</label>
                                <input type="number" className="form-control" value={secondNumber} onChange={(e) => handleInputChange(e, setSecondNumber)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Blue:</label>
                                <input type="number" className="form-control" value={thirdNumber} onChange={(e) => handleInputChange(e, setThirdNumber)} />
                            </div>
                            <button className="btn btn-primary" onClick={sendDataToFirebase}>Send to LED</button>
                        </div>
                    </div>
                    <button className={`btn ${isIncluded ? 'btn-secondary' : 'btn-primary'}`} onClick={toggleAutomaticLight}>
                        {isIncluded ? 'Automatic light OFF' : 'Automatic light ON'}
                    </button>
                </div>
            </div>
        </div>
    );

}

export default App;
