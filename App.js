import React, { Component } from 'react'
import QuizData from './QuizData';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            userAnswer: null,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        }
    }
    loadQuiz = () => {
        const { currentIndex } = this.state;
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question,
                options: QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        })
    }
    nextQuestionHandler = () => {
        const { userAnswer, score, answer } = this.state;
        if (userAnswer === answer) {
            this.setState({
                score: score + 1
            })
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })
    }


    componentDidMount() {
        this.loadQuiz();
    }
    checkAnswer = answer=> {
        this.setState({
            userAnswer:answer,
            disabled: false
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        if (currentIndex != prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: QuizData[currentIndex].question,
                    options: QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer
                }
            })
        }
    }
    finishHandler = () => {
        const { currentIndex } = this.state;
        if (currentIndex === QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
    }

    render() {

        const { question, quizEnd, options, currentIndex, userAnswer } = this.state;

        if (quizEnd) {
            return (
                <div>
                    <h1>Game over!</h1>
                    <h2>Your score is {this.state.score}points</h2>
                    {QuizData.map((item, index) =>
                        <li className="options" key={index}>{item.answer}</li>
                    )}
                </div>
            )
        }


        return (
            <div>
                <h1>{question}</h1>
                <h2>{`Question ${currentIndex + 1} of ${QuizData.length}`}</h2>


                {options.map(option =>
                    <li key={option.id} className={`options ${userAnswer === option ? "selected" : null}`}
                        onClick={()=>this.checkAnswer(option)}>{option}</li>
                )}


                {currentIndex < QuizData.length - 1 &&
                    <button onClick={this.nextQuestionHandler} disabled={this.state.disabled}>Next Question</button>
                }
                {currentIndex === QuizData.length - 1 &&
                    <button onClick={this.finishHandler} disabled={this.state.disabled}>Finsih</button>
                }
            </div>
        )
    }
}
export default App