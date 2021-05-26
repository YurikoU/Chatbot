import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name: "",
      email: "",
      description: ""
    }

    // inputName(), inputEmail(), inputDescription() are fixed, even if render() works.
    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
  }

  inputName = (event) => {
    this.setState({ name: event.target.value })
  }

  inputEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  inputDescription = (event) => {
    this.setState({ description: event.target.value })
  }


  render() {
    return(
      <Dialog
        open={this.props.open} // Referring to open from App.jsx
        onClose={this.props.handleClose} // Referring to handleClose() from App.jsx
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"How can we help?"}</DialogTitle>
      <DialogContent>
        <TextInput 
          label={}
          multiline={}
          rows={}
          value={}
          type={}
          onChange={}        
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={this.props.handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
      </Dialog>
    )
  }

}

