import React from 'react';
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this); // selectAnswer is fixed.
  }


  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;  // Store the current chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question, // Question from an user
      type: 'question'
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers, // Choice list
      chats: chats,
      currentId: nextQuestionId 
    })
  }


  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500); // Delay the new chat by 0.5 second.
        break;
      
      // If the values of nextQuestionId is "https:..........."
      case(/^https:*/.test(nextQuestionId)):   // Codes surrounded by // is the regular expression.
        const a = document.createElement('a'); // Create a new <a> element.
        a.href = nextQuestionId; // Set URL as href attribute.
        a.target = '_blank'; // New page will be opened for the URL.
        a.click(); // Jump to the URL if <a> is clicked.
        break;

      default:
        const chats = this.state.chats;
        chats.push(
          {
            text: selectedAnswer,
            type:'answer'
          }
        );
        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000); // Delay the response by 1 second.
        break;
    }
  }



  componentDidMount() {
    const initAnswer = ""; // Initialize the answer
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  // Set the top of the scroll bar at the bottom of the scroll area to see the latest chat
  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea)
    {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />        
        </div>       
      </section>
    );
  }
}

