import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Torahack from '../assets/img/torahack.png';

const Chat = (props) => {
  const isQuestion = (props.type === 'question'); // If the condition surrounded by () is true, isQuestion is true.
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={Torahack} /> // If the last line was a question from an user, the current icon is torahack.
          ) : (
          <Avatar alt="icon" src={NoProfile} /> // If not, the current icon is no-profile.
        )}

      </ListItemAvatar>
      <div className='p-chat__bubble'>{props.text}</div>
    </ListItem>
  )
}

export default Chat;