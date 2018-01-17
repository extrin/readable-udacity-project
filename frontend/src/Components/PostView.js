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
    const { loadComments, postId, commentsLoaded } = this.props;
    if (commentsLoaded !== postId) {
      loadComments(postId);
    }
  };

  render() {
    const commentModalOpen = this.props.modalMode === 'opened' ? true : false;
    const {
      postsLoaded,
      postId,
      openCommentModal,
      closeCommentModal
    } = this.props;
    return (
      <div className="post-view">
        {postsLoaded === true ? (
          <CustomCard mode="post" id={postId} />
        ) : (
          <LoadingSpinner />
        )}
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

const mapDispatchToProps = dispatch => ({
  openCommentModal: () => dispatch(openCommentCreateModal()),
  closeCommentModal: () => dispatch(closeCommentCreateModal()),
  loadComments: postId => dispatch(getComments(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
