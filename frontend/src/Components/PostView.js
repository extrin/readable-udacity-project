import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Star from 'material-ui/svg-icons/toggle/star';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import Comment from 'material-ui/svg-icons/communication/comment';
import Remove from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/image/edit';
import Subheader from 'material-ui/Subheader';
import { deletePost, changePostVotescore, selectPost } from '../Actions/Post';
import {
  openCommentCreateModal,
  closeCommentCreateModal
} from '../Actions/Modal';
import CommentCreate from './CommentCreate';
import Comments from './Comments';
import { getStringDate } from '../Util/Helpers';

class PostView extends Component {
  render() {
    const commentModalOpen = this.props.modalMode === 'opened' ? true : false;
    const {
      post,
      upVote,
      downVote,
      removePost,
      openPost,
      openCommentModal,
      closeCommentModal
    } = this.props;
    return (
      <div className="post-view">
        <Paper zDepth={2} className="post-details">
          <Paper zDepth={1} className="post-actions">
            <div className="post-actions-voting">
              <IconButton
                className="vote-up"
                onClick={() => upVote(post.id)}
                tooltip="Vote Up"
              >
                <ArrowUp />
              </IconButton>
              <FlatButton
                disabled
                tooltip="Votescore"
                label={post.voteScore}
                labelPosition="after"
                icon={<Star color="pink" />}
              />

              <IconButton
                className="vote-down"
                onClick={() => downVote(post.id)}
                tooltip="Vote Down"
              >
                <ArrowDown />
              </IconButton>
            </div>
            <div className="post-actions-managing">
              <IconButton
                className="post-edit-btn"
                containerElement={
                  <Link
                    className="post-edit-link"
                    to={`/${post.category}/${post.id}/edit`}
                  />
                }
                onClick={() => openPost(post.id)}
              >
                <Edit />
              </IconButton>
              <IconButton
                className="post-delete-btn"
                onClick={() => removePost(post.id)}
              >
                <Remove />
              </IconButton>
            </div>
          </Paper>
          <h2 className="post-title">{post.title}</h2>
          <Subheader className="post-author">
            {getStringDate(post.timestamp)} by {post.author}
          </Subheader>

          <div className="post-body">
            <p>{post.body}</p>
          </div>
        </Paper>
        <FlatButton
          className="add-comment-btn"
          onClick={() => openCommentModal()}
          label="Add new Comment"
          labelPosition="before"
          icon={<Comment />}
        />

        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={commentModalOpen}
          onRequestClose={() => closeCommentModal()}
          contentLabel="Modal"
        >
          <CommentCreate />
        </Modal>

        <div className="post-comments">
          <Comments />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.find(post => post.id === state.selections.selectedPost),
  modalMode: state.modals.commentCreateModal
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(changePostVotescore(id, 'upVote')),
  downVote: id => dispatch(changePostVotescore(id, 'downVote')),
  removePost: id => dispatch(deletePost(id)),
  openPost: id => dispatch(selectPost(id)),
  openCommentModal: () => dispatch(openCommentCreateModal()),
  closeCommentModal: () => dispatch(closeCommentCreateModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
