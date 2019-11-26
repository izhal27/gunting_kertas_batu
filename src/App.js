import React, { Component } from 'react';

const scissorsRight = require('./images/scissors-right.png');
const paperRight = require('./images/paper-right.png');
const rockRight = require('./images/rock-right.png');

const imagesRight = [scissorsRight, paperRight, rockRight];

const scissorsLeft = require('./images/scissors-left.png');
const paperLeft = require('./images/paper-left.png');
const rockLeft = require('./images/rock-left.png');

const imagesLeft = [scissorsLeft, paperLeft, rockLeft];

function Image(props) {
  return (
    <img src={props.img} alt='image' />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexRight: 0,
      indexLeft: 0,
    }
  }

  generateImage() {
    const idGen = setInterval(() => {
      this.setState({
        indexRight: Math.floor(Math.random() * 3),
        indexLeft: Math.floor(Math.random() * 3),
      });
    }, 75)

    setTimeout(() => {
      clearInterval(idGen)
    }, 2000);
  }

  render() {
    return (
      <>
        <h1>Gunting Kertas Batu</h1>
        <Image img={imagesRight[this.state.indexRight]} /><br />
        <Image img={imagesLeft[this.state.indexLeft]} /><br />
        <button onClick={() => this.generateImage()}>Random image</button>
      </>
    );
  }
}

export default App;
