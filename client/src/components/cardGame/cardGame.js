import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import axios from 'axios';
import './cardGame.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

class Cards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            tempArr: [],
            correct: [],
            flipped: Boolean,
            cardList: [],
            times: [],
            finalTime: 0
        }
    }

    componentDidMount() {
        this.loadCardGame()
        // this.loadCurrentUser() WILL IMPLEMENT IN FUTURE
    };
    
    // GET number game questions from database and SET cardList
    loadCardGame = () => {
        API.getCardGame()
          .then ( res => {
              this.setState({ cardList: res.data })
          })
          .catch(err => console.log(err));
    };


    turnCard = (event) => {
        const state = this.state
        state.counter = state.counter + 1
        state.tempArr.push(event.target.getAttribute('value'))
        this.setState({ flipped: true })

        // takes in time in seconds
        state.times.push(new Date().getTime())

        console.log(state)
        console.log(event.target.getAttribute('value'))
        console.log(this.state.flipped)

        // console.log(state.tempArr)

        if (state.counter % 2 === 0) {
            if (state.tempArr[0] === state.tempArr[1]) {
                // alert(`Great Job!`)

                state.correct.push(state.tempArr[0], state.tempArr[1])
                this.setState({ tempArr: [] })

                if (state.correct.length === 12) {

                    let userTime = ((state.times[(state.times.length - 1)] - state.times[0]) / 1000)
                    // no alerts in game
                    alert(`You finished the game in ${userTime} seconds, Great job! Play again?`)
                    // console.log(userTime)

                    // set final state
                    this.setState({
                        finalTime: userTime
                    })

                    // axios request to post
                    axios.post('/api/cardgame', {
                        times: userTime
                    })
                        .then(function (response) {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err);

                        })

                } else if (state.correct.length === 6) {
                    alert(`You're half way there!`)
                }

            } else {
                alert('not a match')
                this.setState({ tempArr: [] })
                this.flipped = false
            }
            return
        }
    }

    newGame = () => {
        // shuffle cards
        this.setState({ counter: 0 })
        this.setState({ tempArr: [] })
        this.setState({ correct: [] })
        this.setState({ flipped: false })
        console.log('game has been reset')
    }

    render() {

        return (
            <Fragment>
                <Navbar/>
                <h1>Card Memory Game!</h1>
                {/* <p>The time is : {new Date().toLocaleTimeString()}</p> */}
                <div className="row">
                    {this.state.cardList.map(card =>
                        <Fragment>
                            <div className='cardBorder col s3 m2' >
                                <div className='card-small waves-effect waves-light blue' onClick={this.turnCard} value={card.name} key={card.id} flipped={false.toString()}>
                                    <img id='cardImages' src={card.image} alt={card.name} />
                                    <h3>{card.name}</h3>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>

                <div><a id='shuffleBtn' className="waves-effect waves-light btn-large pink" onClick={this.newGame}>New Game!</a></div>
                <Footer/>
            </Fragment>
        )
    }
}

export default Cards;

