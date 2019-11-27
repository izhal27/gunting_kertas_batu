import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap/';
import SweetAlert from 'sweetalert2-react';

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
    <img src={props.img} alt={props.img} />
  )
}

function CenterContainer(props) {
  return (
    <Row className='justify-content-md-center'>
      <Col md='auto'>
        {props.children}
      </Col>
    </Row>
  );
}

function CenterRow(props) {
  return (
    <Row className='justify-content-md-center'>
      {props.children}
    </Row>
  );
}

function Header() {
  return (
    <CenterContainer>
      <h1>Gunting Kertas Batu</h1>
    </CenterContainer>
  );
}

function Status(props) {
  return (
    <CenterRow>
      <Col md='auto'>
        <h3>You</h3>
        <h3 className='d-flex justify-content-center'>{props.humanScore}</h3>
      </Col>
      <Col md='auto'>
        <h3>VS</h3>
      </Col>
      <Col md='auto'>
        <h3>Comp</h3>
        <h3 className='d-flex justify-content-center'>{props.compScore}</h3>
      </Col>
    </CenterRow>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexRight: 0,
      indexLeft: 0,
      loading: false,
      winner: '',
      humanScore: 0,
      compScore: 0,
      show: false,
    };
  }

  calculateWinner() {
    var result = (3 + this.state.indexLeft - this.state.indexRight) % 3;
    if (!result) {
      return 'Draw';
    } else if (result === 1) {
      this.setState(state => ({ humanScore: ++state.humanScore }));
      return 'You Win';
    } else {
      this.setState(state => ({ compScore: ++state.compScore }));
      return 'Comp Win';
    }
  }

  randomImage() {
    this.setState({ loading: true });
    const randomId = setInterval(() => {
      this.setState({
        indexLeft: Math.floor(Math.random() * 3),
        indexRight: Math.floor(Math.random() * 3),
      });
    }, 75);
    setTimeout(() => {
      clearInterval(randomId);
      setTimeout(() => {
        this.setState({
          winner: this.calculateWinner(),
          show: true,
        });
      }, 1000);
    }, 2000);
  }

  render() {
    const btnTxt = this.state.loading ? 'Loading...' : 'Start';
    const humanScore = this.state.humanScore;
    const compScore = this.state.compScore;
    const youImage = imagesLeft[this.state.indexLeft];
    const compImage = imagesRight[this.state.indexRight];
    const loading = this.state.loading;
    const show = this.state.show;
    const winner = this.state.winner;
    return (
      <>
        <Container className='mt-lg-5'>
          <Header />
          <Status humanScore={humanScore} compScore={compScore} />
          <CenterRow>
            <Col md='auto'>
              <Image img={compImage} />
            </Col>
            <Col md='auto'>
              <Image img={youImage} />
            </Col>
          </CenterRow>
          <CenterContainer>
            <Button
              onClick={() => this.randomImage()}
              disabled={loading}>
              {btnTxt}
            </Button>
          </CenterContainer>
          <SweetAlert
            show={show}
            type='info'
            title="Result"
            text={winner}
            onConfirm={() => this.setState({
              show: false,
              loading: false,
            })}
          />
        </Container>
      </>
    );
  }
}

export default App;
