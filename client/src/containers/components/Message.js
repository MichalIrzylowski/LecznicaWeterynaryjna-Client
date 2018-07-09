import React from 'react';
import {Image, Item, Button} from 'semantic-ui-react';

const Message = ({title, text, author, onDelete, isCorrectUser}) => (
  <Item>
    <Item.Image size='tiny' src={author.profileImgUrl} />
    <Item.Content>
      <Item.Header>
        {title}
      </Item.Header>
      <Item.Description>
        {text}
      </Item.Description>
      <Item.Extra>lek. wet. {author.name} {author.surname}</Item.Extra>
    </Item.Content>
    {isCorrectUser ? (
      <Button color='red' onClick={onDelete}>
        Usuń wiadomość!
      </Button>
    ) : (
      ''
    ) }

  </Item>
)

/*const Message = ({title, text, author, onDelete}) => (
  <article>
    <img src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
  </article>
)*/

export default Message;
