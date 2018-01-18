import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FlatButton from 'material-ui/FlatButton';
import Comment from 'material-ui/svg-icons/communication/comment';
import {
  openCommentCreateModal,
  closeCommentCreateModal
} from '../Actions/Modal';
import { getComments } from '../Actions/Comment';
import CommentCreate from './CommentCreate';
import Comments from './Comments';
import CustomCard from './CustomCard';
import LoadingSpinner from './LoadingSpinner';

class PostView extends React.Component {
  componentWillMount = () => {
    const { getComments, postId, commentsLoaded } = this.props;
    if (commentsLoaded !== postId) {
      getComments(postId);
    }
  };

  renderPost = () => {
    const { postsLoaded, postId } = this.props;
    return postsLoaded ? (
      <CustomCard mode="post" id={postId} />
    ) : (
      <LoadingSpinner />
    );
  };

  render() {
    const commentModalOpen = this.props.modalMode === 'opened' ? true : false;
    const {
      postId,
      openCommentCreateModal,
      closeCommentCreateModal
    } = this.props;
    return (
      <div className="post-view">
        {this.renderPost()}
        <FlatButton
          className="add-comment-btn"
          onClick={() => openCommentCreateModal()}
          label="Add new Comment"
          labelPosition="before"
          icon={<Comment />}
        />
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={commentModalOpen}
          onRequestClose={() => closeCommentCreateModal()}
          contentLabel="Modal"
        >
          <CommentCreate parentId={postId} />
        </Modal>
        <div className="post-comments">
          <Comments />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  postId: props.match.params.post_id,
  modalMode: state.modals.commentCreateModal,
  commentsLoaded: state.loading.commentsLoaded,
  postsLoaded: state.loading.postsLoaded
});

export default connect(mapStateToProps, {
  openCommentCreateModal,
  closeCommentCreateModal,
  getComments
})(PostView);
