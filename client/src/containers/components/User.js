import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Image, Form, Button} from 'semantic-ui-react';
import {UpdateUser, UpdateImage} from '../../redux/ActionCreators';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: this.props.name,
        surname: this.props.surname
      },
      wantChange: false
    }
  }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.UpdateUser(this.props.id, this.state.data);
  }

  handleImageUpload = e => {
    console.log(this.fileInput.files[0])
    const fd = new FormData();
    fd.append('file', this.fileInput.files[0]);
    const config = {headers: {'content-type': 'multipart/form-data'}}
    for (var pair of fd.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
    }
    this.props.UpdateImage(this.props.id, fd, config)
  }

  render() {
    let {id, name, surname, profileImgUrl } = this.props;
    return(
      <section className='formContainer'>
        <Card>
          <Image src={profileImgUrl} alt={`Zdjęcie użytkownika: ${name} ${surname}`} />
          <input type='file' ref={input => this.fileInput = input} />
          <Button onClick={this.handleImageUpload}>Zamień zdjęcie!</Button>
          <Card.Content>
            <Card.Header>{`lek. wet. ${name} ${surname}`}</Card.Header>
            <Card.Meta>{`Id.: ${id}`}</Card.Meta>
          </Card.Content>
        </Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Imię</label>
            <input type='text' value={this.state.data.name} onChange={this.handleChange('name')} />
          </Form.Field>
          <Form.Field>
            <label>Nazwisko</label>
            <input type='text' value={this.state.data.surname} onChange={this.handleChange('surname')} />
          </Form.Field>
          <Button type='submit' color='green'>Zaktualizuj profil!</Button>
        </Form>
      </section>
    )
  }
}

export default connect(null, {UpdateUser, UpdateImage})(User);
