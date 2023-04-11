import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Container, Row, Col, Button, NavLink } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import formatDistance from 'date-fns/formatDistance';
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import default_image from '../logo/default_user.jpg';
import ReactMarkdown from "react-markdown";
import './markdownStyles.css'
import { Helmet } from 'react-helmet'; // Import Helmet

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!id) { return }
    axios
      .get(`/api/posts/post/${id}`)
      .then(res => setPost(res.data[0]))
      .catch(err => {
        toast.error(err)
      });

    axios
      .get(`/api/comments/post/${id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch(err => toast.error(err));
  }, [id]);

  const toggleCommentForm = () => {
    setToggleForm(!toggleForm);
  };

  const refreshCommentData = async() => {
    await axios
      .get(`/api/comments/post/${id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch(err => toast.error(err));
  }

  const addMyFavoritePost = async () => {
    if (!id || !user) {
      toast.error('Post Id and user id are required');
    } else {
      const data = {id};
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios
        .post('/api/favoriteposts/', data, config)
        .then(res => {
          toast.success('The task has been done. Please visit your favorite posts page.');
          return res.data
        })
        .catch(err =>
          {
            if(err.response && err.response.status===400) {
              toast.error('The post already exists in your favorite post collection.');
            };
          });
    }
  };

  // Get author image
  const authorImage = post.author && post.author.image ? post.author.image : default_image;

  return (
      <Container fluid>

        <Helmet>
          <title>{post.title ? `${post.title} - Pop Zombie` : 'Post Detail - Pop Zombie'}</title>
          <meta name="description" content={post.title ? `Post detail page for ${post.title} by ${post.author.firstName} ${post.author.lastName}.` : "Post detail page of the application."} />
        </Helmet>


        <div className='title bottom__line' style={{
          backgroundColor: '#fcf7e3',
          color: "#88d8c0",
          marginTop:'8px',
          marginBottom:'8px',
          textAlign:'left'


        }}>
          <strong>{post.title}</strong>
        </div>
        <Row>
          <Col>
            <Card className='mb-2' style={{ backgroundColor: '#fcf7e3' }}>
              {post.image ? <Card.Img src={post.image} alt={post.title} /> : ''}
              <Card.Body>
                <Card.Text style={{ color: '#b99ef5' }}>
                  <img src={authorImage} alt='' className='author-small-image' />
                  {post.author ? ` ${post.author.firstName} ${post.author.lastName}` : ''}
                  {post.updatedAt ? ` - Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}` : ''}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card.Text style={{
              color: '#b99ef5'
            }}>
              <strong>Category: </strong>{" "}<strong><span style={{color: '#f17891'}}>{post.city}</span></strong> - <strong><span style={{color: '#88d8c0'}}>{post.country}</span></strong>
            </Card.Text>



            {post.airBnBPrice ? (
                <a href={post.airBnBPrice} target="_blank" rel="noopener noreferrer">
                  <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#FFA07A",
                        color: "white",
                        borderColor: "#FFA07A",
                        marginBottom: "16px",
                        width:'30%'
                      }}
                  >
                    Visit Website
                  </Button>
                </a>
            ) : null}

            <div className="markdown-container">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {user && !toggleForm ?
                (<div className="mb-2">
                  <Button variant="outline-primary" type="submit" onClick={() => toggleCommentForm()}
                          style={{
                            backgroundColor: '#f17891',
                            borderColor: '#f17891',
                            color: 'white',
                            width:'30%',
                            marginBottom:'16px'

                          }}>
                    Add New Comment
                  </Button>

                </div>)
                : ''
            }
            <div className={toggleForm ? 'show' : 'hide'}>
              <Card.Body>
                <CommentForm postId={id} user={user} toggleCommentForm={toggleCommentForm} refreshCommentData={refreshCommentData} />
              </Card.Body>
            </div>

            {/*this is the background color of the comment list*/}

            <Card className='mb-2' style={{
              backgroundColor: '#88d8c0',
              borderColor:'#88d8c0'
            }}>
              <Card.Body>
                {comments && comments.length > 0 ? <CommentList comments={comments} refreshCommentData={refreshCommentData} /> : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button variant="outline-primary" type="submit" onClick={() => navigate('/')} style={{ backgroundColor: '#c3edbf', borderColor: '#c3edbf', color: 'white', width: '20%', marginRight: '8px' }}>
          Back to Home
        </Button>{"  "}
        {user ?
            <Button variant="outline-primary" type="submit" onClick={addMyFavoritePost} style={{ backgroundColor: '#e6c8fe', borderColor: '#e6c8fe', color: 'white', width: '20%', marginTop: '8px' }}>
              Add to Favorites
            </Button>
            : ''
        }
      </Container>
  );

}

export default PostDetail
