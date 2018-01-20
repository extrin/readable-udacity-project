import React from 'react';
import { Link } from 'react-router-dom';
import { createPost } from '../Actions/Post';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class PostCreate extends React.Component {
  state = {
    postTitle: '',
    postBody: '',
    postCategory: '',
    postAuthor: '',
    titleValid: false,
    bodyValid: false,
    categoryValid: false,
    authorValid: false,
    formValid: false
  };

  handleUserInput = (event, payload) => {
    const name = event.target.name || 'postCategory';
    const value = payload ? payload : event.target.value;
    this.setState({ [name]: value }, this.validateField(name, value));
  };

  validateField = (name, value) => {
    let { titleValid, bodyValid, categoryValid, authorValid } = this.state;
    switch (name) {
      case 'postTitle':
        titleValid = value ? value.length > 0 : false;
        break;
      case 'postBody':
        bodyValid = value ? value.length > 0 : false;
        break;
      case 'postCategory':
        categoryValid = value ? value.length > 0 : false;
        break;
      case 'postAuthor':
        authorValid = value ? value.length > 0 : false;
        break;
      default:
        break;
    }
    this.setState({
      titleValid: titleValid,
      bodyValid: bodyValid,
      categoryValid: categoryValid,
      authorValid: authorValid,
      formValid: titleValid && bodyValid && categoryValid && authorValid
    });
  };

  render() {
    const { categories, createPost } = this.props;
    const {
      postTitle,
      postBody,
      postCategory,
      postAuthor,
      titleValid,
      bodyValid,
      categoryValid,
      authorValid
    } = this.state;

    return (
      <div className="post-create">
        <Paper zDepth={2}>
          <TextField
            className="post-title"
            name="postTitle"
            style={{ width: '95%' }}
            value={postTitle}
            onChange={event => this.handleUserInput(event)}
            hintText="Post title"
            errorText={!titleValid && 'This field is required.'}
            required
          />
          <TextField
            className="post-body"
            name="postBody"
            value={postBody}
            style={{ width: '95%' }}
            onChange={event => this.handleUserInput(event)}
            hintText="Post body"
            errorText={!bodyValid && 'This field is required.'}
            floatingLabelText="Write your post here"
            multiLine={true}
            rows={10}
            required
          />
          <SelectField
            className="post-category-select"
            name="postCategory"
            floatingLabelText="Post category"
            errorText={!categoryValid && 'This field is required.'}
            value={postCategory}
            onChange={(event, key, payload) =>
              this.handleUserInput(event, payload)
            }
          >
            <MenuItem
              disabled
              value="Select category"
              primaryText="Select category"
            />
            {categories.map(cat => (
              <MenuItem
                key={cat.path}
                value={cat.name}
                primaryText={cat.name}
              />
            ))}
          </SelectField>
          <TextField
            className="post-author"
            name="postAuthor"
            type="text"
            value={postAuthor}
            onChange={event => this.handleUserInput(event)}
            hintText="Author nickname"
            errorText={!authorValid && 'This field is required.'}
            required
          />
          <RaisedButton
            style={{ marginTop: '20px', marginBottom: '10px' }}
            className="post-save-btn"
            onClick={() => {
              createPost(postTitle, postBody, postAuthor, postCategory);
            }}
            label="SAVE"
            containerElement={<Link to="/" disabled={!this.state.formValid} />}
            primary={true}
            disabled={!this.state.formValid}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps, { createPost })(PostCreate);
