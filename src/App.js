import React, { Component } from 'react';
import "./App.css";
import Navigation from "./Components/Navigation/Navigation"
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";

// got from https://docs.clarifai.com/clarifai-basics/authentication/authorize
const app = new Clarifai.App({apiKey: 'c5bad98c05e1426f8f6629cd3768b20f'});

// Got below code from: https://www.npmjs.com/package/react-particles-js
const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin"
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === "signin"
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
