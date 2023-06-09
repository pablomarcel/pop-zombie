import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { toast } from "react-toastify";
import axios from "axios";
const CommentForm = ({ postId, user, toggleCommentForm, refreshCommentData }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postId || !user || !comment) {
      toast.error('Comment is required.');
    } else {
      const commentData = {postId, comment, rating};
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios
        .post('/api/comments/', commentData, config)
        .then(res => {
          return res.data
        })
        .catch(err => toast.error(err));
    }
    setComment('');
    setRating(0);
    refreshCommentData();
  };
  // Catch Rating value
  const handleRating = (rate) => {
    // Convert rating from 20 to 1, 40 to 2
    setRating(rate/20);
  }

  return (
      <Container>
        <div className="pb-2 box"
             style={{
               backgroundColor: '#fcf7e3',

        }}>
          <div className='sub-header'>
            <div onClick={()=>toggleCommentForm()} className='form-icon' style={{ backgroundColor: '#fbb9c5' }}>
              <FiX />
            </div>
          </div>
          <h3 className="mb-2 title" style={{ color: '#b99ef5' }}>New Comment</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                  as="textarea"
                  id='comment'
                  name='comment'
                  value={comment}
                  placeholder="Write a comment..."
                  rows={3}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ backgroundColor: '#fcf7e3' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Rating onClick={handleRating} ratingValue={rating} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit"
                      style={{
                        backgroundColor: '#88d8c0',
                        borderColor: '#88d8c0'
              }}>
                Add comment
              </Button>
            </div>
          </Form>
        </div>
      </Container>
  );

}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  user: PropTypes.object,
  toggleCommentForm: PropTypes.func.isRequired,
  refreshCommentData: PropTypes.func.isRequired,
}

export default CommentForm
