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
  )
}

function CenterRow(props) {
  return (
    <Row className='justify-content-md-center'>
      {props.children}
    </Row>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexRight: 0,
      indexLeft: 0,
      loading: false,
      show: false,
    };
  }

  generateImage() {
    this.setState({ loading: true });
    const idGen = setInterval(() => {
      this.setState({
        indexRight: Math.floor(Math.random() * 3),
        indexLeft: Math.floor(Math.random() * 3),
      });
    }, 75);
    setTimeout(() => {
      clearInterval(idGen);
      this.setState({
        loading: false,
        show: true,
      });
    }, 2000);
  }

  render() {
    const btnTxt = this.state.loading ? 'Loading...' : 'Start';
    return (
      <>
        <Container className='mt-lg-5'>
          <CenterContainer>
            <h1>Gunting Kertas Batu</h1>
          </CenterContainer>
          <CenterRow>
            <Col md='auto'>
              <h3>You</h3>
              <h3 className='d-flex justify-content-center'>0</h3>
            </Col>
            <Col md='auto'>
              <h3>VS</h3>
            </Col>
            <Col md='auto'>
              <h3>Comp</h3>
              <h3 className='d-flex justify-content-center'>0</h3>
            </Col>
          </CenterRow>
          <CenterRow>
            <Col md='auto'>
              <Image img={imagesRight[this.state.indexRight]} />
            </Col>
            <Col md='auto'>
              <Image img={imagesLeft[this.state.indexLeft]} />
            </Col>
          </CenterRow>
          <CenterContainer>
            <Button
              onClick={() => this.generateImage()}
              disabled={this.state.loading}>
              {btnTxt}
            </Button>
          </CenterContainer>
          <SweetAlert
            show={this.state.show}
            type='success'
            title="Result"
            text="You Win"
            onConfirm={() => this.setState({ show: false })}
          />
        </Container>
      </>
    );
  }
}

export default App;
