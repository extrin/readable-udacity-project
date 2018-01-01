import React, { Component } from 'react';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Remove from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/image/edit';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import { connect } from 'react-redux';
import {
  deleteComment,
  changeCommentVotescore,
  selectComment
} from '../Actions/Comment';
import { openCommentEditModal, closeCommentEditModal } from '../Actions/Modal';
import CommentEdit from './CommentEdit';
import { getStringDate } from '../Util/Helpers';

class Comments extends Component {
  render() {
    const {
      comments,
      upVote,
      downVote,
      deleteComment,
      openForEdit,
      closeModal
    } = this.props;
    const editModalOpen = this.props.modalMode === 'opened' ? true : false;
    return (
      <div className="comments-list">
        {comments.sort(sortBy('-timestamp')).map(comment => (
          <Card className="comment" key={comment.id}>
            <CardActions>
              <FlatButton
                className="vote-up"
                onClick={() => upVote(comment.id)}
                icon={<ArrowUp color="red" />}
              />
              <FlatButton
                className="voteScore"
                disabled={true}
                label={comment.voteScore}
              />
              <FlatButton
                className="vote-down"
                onClick={() => downVote(comment.id)}
                icon={<ArrowDown color="blue" />}
              />
              <FlatButton
                className="comment-edit-btn"
                onClick={() => openForEdit(comment.id)}
                icon={<Edit />}
              />
              <FlatButton
                className="comment-delete-btn"
                onClick={() => deleteComment(comment.id)}
                icon={<Remove />}
              />
            </CardActions>
            <CardHeader
              title={comment.author}
              subtitle={getStringDate(comment.timestamp)}
            />
            <CardText className="comment-body">{comment.body}</CardText>
          </Card>
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
  comments: state.comments,
  modalMode: state.modals.commentEditModal
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(changeCommentVotescore(id, 'upVote')),
  downVote: id => dispatch(changeCommentVotescore(id, 'downVote')),
  removeComment: id => dispatch(deleteComment(id)),
  openForEdit: id => {
    dispatch(selectComment(id));
    dispatch(openCommentEditModal());
  },
  closeModal: () => dispatch(closeCommentEditModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
