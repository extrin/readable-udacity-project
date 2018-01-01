import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStringDate, trim } from '../Util/Helpers';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Star from 'material-ui/svg-icons/toggle/star';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import Comment from 'material-ui/svg-icons/communication/comment';
import Remove from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/image/edit';
import { deletePost, changePostVotescore, selectPost } from '../Actions/Post';
import {
  deleteComment,
  changeCommentVotescore,
  selectComment,
  getComments
} from '../Actions/Comment';
import { openCommentEditModal, closeCommentEditModal } from '../Actions/Modal';

class CustomCard extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  renderEditButton = () => {
    if (this.props.mode === 'post')
      return (
        <IconButton
          className="post-edit-btn"
          containerElement={
            <Link
              className="post-edit-link"
              to={`/${this.props.text.category}/${this.props.id}/edit`}
            />
          }
          onClick={() => this.props.selectItem(this.props.id)}
        >
          <Edit />
        </IconButton>
      );
    else
      return (
        <IconButton
          className="comment-edit-btn"
          onClick={() => this.props.openCommentModal(this.props.id)}
        >
          <Edit />
        </IconButton>
      );
  };

  renderTitle = () => {
    if (this.props.mode === 'post')
      return (
        <h2 className="title">
          <Link
            className="post-title"
            style={{ textDecoration: 'none' }}
            to={`/${this.props.text.category}/${this.props.id}`}
            onClick={() => this.props.openItem(this.props.id)}
          >
            {this.props.text.title}
          </Link>
        </h2>
      );
    else return <div />;
  };

  renderCommentsCount = () => {
    if (this.props.mode === 'post')
      return (
        <FlatButton
          className="comment-count-btn"
          containerElement={
            <Link
              className="post-view-link"
              to={`/${this.props.text.category}/${this.props.id}`}
            />
          }
          onClick={() => this.props.openItem(this.props.id)}
          icon={<Comment />}
          label={this.props.text.commentCount || '0'}
          labelPosition="after"
        />
      );
    else return <div />;
  };

  render() {
    const { upVote, downVote, deleteItem, id, text } = this.props;
    return (
      <div className="wrapper">
        <Paper zDepth={2}>
          <Paper zDepth={1} className="actions">
            <div className="voting">
              <IconButton
                className="vote-up"
                onClick={() => upVote(id)}
                tooltip="Vote Up"
              >
                <ArrowUp />
              </IconButton>
              <FlatButton
                disabled
                tooltip="Votescore"
                label={text.voteScore}
                labelPosition="after"
                icon={<Star color="pink" />}
              />
              <IconButton
                className="vote-down"
                onClick={() => downVote(id)}
                tooltip="Vote Down"
              >
                <ArrowDown />
              </IconButton>
            </div>
            <div className="managing">
              {this.renderEditButton()}
              <IconButton className="delete-btn" onClick={() => deleteItem(id)}>
                <Remove />
              </IconButton>
            </div>
          </Paper>
          {this.renderTitle()}
          <Subheader className="subtitle">
            {getStringDate(text.timestamp)} by {text.author}
          </Subheader>
          <div className="text-body">
            <p>{text.body}</p>
          </div>
          {this.renderCommentsCount()}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.mode === 'post')
    return { text: state.posts.find(post => post.id === props.id) };
  else
    return {
      text: state.comments.find(comment => comment.id === props.id),
      modalMode: state.modals.commentEditModal
    };
};

const mapDispatchToProps = (dispatch, props) => {
  if (props.mode === 'post')
    return {
      upVote: id => dispatch(changePostVotescore(id, 'upVote')),
      downVote: id => dispatch(changePostVotescore(id, 'downVote')),
      openItem: id => {
        dispatch(selectPost(id));
        dispatch(getComments(id));
      },
      selectItem: id => dispatch(selectPost(id)),
      deleteItem: id => dispatch(deletePost(id))
    };
  else
    return {
      upVote: id => dispatch(changeCommentVotescore(id, 'upVote')),
      downVote: id => dispatch(changeCommentVotescore(id, 'downVote')),
      openCommentModal: id => {
        dispatch(selectComment(id));
        dispatch(openCommentEditModal());
      },
      closeCommentModal: () => dispatch(closeCommentEditModal()),
      deleteItem: id => dispatch(deleteComment(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard);
