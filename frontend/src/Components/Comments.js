import React from 'react';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import CommentEdit from './CommentEdit';
import CustomCard from './CustomCard';
import { closeCommentEditModal } from '../Actions/Modal';

class Comments extends React.Component {
  render() {
    const { comments, closeModal, modalMode } = this.props;
    const editModalOpen = modalMode === 'opened' ? true : false;
    return (
      <div className="comments-list">
        {comments
          .sort(sortBy('-timestamp'))
          .map(comment => (
            <CustomCard mode="comment" id={comment.id} key={comment.id} />
          ))}
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={editModalOpen}
          onRequestClose={() => closeModal()}
          contentLabel="Modal"
        >
          <CommentEdit />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: Object.values(state.comments),
  modalMode: state.modals.commentEditModal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeCommentEditModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
