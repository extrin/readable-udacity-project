import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FlatButton from 'material-ui/FlatButton';
import Comment from 'material-ui/svg-icons/communication/comment';
import {
  openCommentCreateModal,
  closeCommentCreateModal
} from '../Actions/Modal';
import CommentCreate from './CommentCreate';
import Comments from './Comments';
import CustomCard from './CustomCard';

class PostView extends React.Component {
  render() {
    const commentModalOpen = this.props.modalMode === 'opened' ? true : false;
    const { postId, openCommentModal, closeCommentModal } = this.props;
    return (
      <div className="post-view">
        <CustomCard mode="post" id={postId} />
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

const mapStateToProps = (state, props) => ({
  postId: props.match.params.post_id,
  modalMode: state.modals.commentCreateModal
});

const mapDispatchToProps = dispatch => ({
  openCommentModal: () => dispatch(openCommentCreateModal()),
  closeCommentModal: () => dispatch(closeCommentCreateModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
