import React from 'react';
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

  updateCategory = cat => {
    this.setState({ postCategory: cat });
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
            onChange={event => this.updateCategory(event.target.value)}
          >
            <MenuItem disabled value="Select category">
              Select category
            </MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.path} value={cat.name}>
                {cat.name}
              </MenuItem>
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
            style={{ marginTop: '20px' }}
            className="post-save-btn"
            onClick={() => {
              savePost(postTitle, postBody, postCategory, postAuthor);
            }}
            label="SAVE"
            href="/"
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
