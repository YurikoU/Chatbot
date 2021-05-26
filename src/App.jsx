import React from 'react';
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index';
import FormDialog from './components/forms/FormDialog';

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

    // selectAnswer(), handleClickOpen(), handleClose() are fixed, even if render() works.
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

      // If the nextQuestionId is 'contact', the modal will open.
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
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

  handleClickOpen = () => {
    this.setState({ open: true });  // Once handleClickOpen() works, open state will be switched to true. The modal will open.
  };

  handleClose = () => {
    this.setState({ open: false }); // Once handleClose() works, open state will be switched to false. The modal will close.
  };

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
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>       
      </section>
    );
  }
}

