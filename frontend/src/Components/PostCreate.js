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
  state = { postTitle: '', postBody: '', postCategory: '', postAuthor: '' };

  updateTitle = title => {
    this.setState({ postTitle: title });
  };

  updateBody = body => {
    this.setState({ postBody: body });
  };

  updateCategory = (event, key, payload) => {
    this.setState({ postCategory: payload });
  };

  updateAuthor = author => {
    this.setState({ postAuthor: author });
  };

  render() {
    const { categories, savePost } = this.props;
    const { postTitle, postBody, postCategory, postAuthor } = this.state;

    return (
      <div className="post-create">
        <Paper zDepth={2}>
          <TextField
            className="post-title"
            style={{ width: '95%' }}
            value={postTitle}
            onChange={event => this.updateTitle(event.target.value)}
            hintText="Post title"
            errorText={postTitle === '' && 'This field is required.'}
            required
          />
          <TextField
            className="post-body"
            value={postBody}
            style={{ width: '95%' }}
            onChange={event => this.updateBody(event.target.value)}
            hintText="Post body"
            errorText={postBody === '' && 'This field is required.'}
            floatingLabelText="Write your post here"
            multiLine={true}
            rows={10}
            required
          />
          <SelectField
            className="post-category-select"
            floatingLabelText="Post category"
            errorText={postCategory === '' && 'This field is required.'}
            value={postCategory}
            onChange={(event, key, payload) =>
              this.updateCategory(event, key, payload)
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
            type="text"
            value={postAuthor}
            onChange={event => this.updateAuthor(event.target.value)}
            hintText="Author nickname"
            errorText={postAuthor === '' && 'This field is required.'}
            required
          />
          <RaisedButton
            style={{ marginTop: '20px', marginBottom: '10px' }}
            className="post-save-btn"
            onClick={() => {
              savePost(postTitle, postBody, postAuthor, postCategory);
            }}
            label="SAVE"
            containerElement={<Link to="/" />}
            primary={true}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  savePost: (title, body, author, category) => {
    dispatch(createPost(title, body, author, category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
