import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => (
  createStyles({
    "button" : {
      borderColor: '#FFB549',  // Either " " or '' is ok. 
      color: "#FFB549",
      fontWeight: 600,  // If the value is number, no need to be surrounded by "" or ''.
      marginBottom: '8px',

      "&:hover": {  // Once the button is on hover, the button color will be changed.
        backgroundColor: "#FFB549",
        color: '#fff'
      }
    }
  })

));

const Answer = (props) => {
  const classes = useStyles();

  return(
    <Button 
      className={classes.button} // Implement useStyles() function
      variant="outlined"
      onClick={() => props.select(props.content, props.nextId)}
    >
      {props.content}
    </Button>
  )
} 


export default Answer;