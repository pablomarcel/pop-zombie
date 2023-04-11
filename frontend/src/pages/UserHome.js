import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Post from "../components/Post";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import PostForm from "../components/PostForm";
import ImageSlideShow from "../components/ImageSlideShow";
import { getPostsByUser, reset, deletePost } from '../features/posts/postSlice';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet';

const UserHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postId, setPostId] = useState('');
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [toggleSlideShow, setToggleSlideShow] = useState(true);

  const { user } = useSelector((state) => state.auth)

  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )
  // console.log(posts);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPostsByUser())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const togglePostForm = () => {
    setToggleDisplay(!toggleDisplay);
    if (toggleDisplay) {
      setPostId(null);
    }
  };

  const updateForm = (postId) => {
    setToggleDisplay(true);
    setPostId(postId);
   };

  const returnAddForm = () => {
    // Reset postId value
    setPostId('');
  };

  // Delete post function
  const delPost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId))
    };
  };

  return (
      <Container fluid>
        <Helmet>
          <title>{user ? `${user.firstName}'s Posts - Pop Zombie` : "User's Posts - Pop Zombie"}</title>
          <meta name="description" content={user ? `A list of ${user.firstName}'s posts in the application.` : "A list of the user's posts in the application."} />
        </Helmet>
        {/* Rendering button showing/hiding slide show */}
        <div className={toggleDisplay ? "hide" : "right__side mt-2"}>
          {/* Add New Post Button */}
          {!toggleDisplay ? (
              <Button variant="outline-pink" onClick={() => togglePostForm()} className="mr-2" style={{ marginRight: '8px' }}>
                Add New Post
              </Button>
          ) : (
              ""
          )}

          <Button
              variant="outline-pink"
              size="sm"
              onClick={() => setToggleSlideShow(!toggleSlideShow)}
              style={{ backgroundColor: '#c3edbf', borderColor: '#c3edbf' }}
          >
            {toggleSlideShow ? "Hide Slide Show" : "Show Slide Show"}
          </Button>
        </div>

        <Row>
          {/* Post Form area */}
          <Col className={toggleDisplay ? "show" : "hide"}>
            {/* PostForm Component */}
            <PostForm
                postId={postId}
                togglePostForm={togglePostForm}
                returnAddForm={returnAddForm}
            />
          </Col>
          {/* User's Post-List area */}
          <Col>
            <h3 className="title" style={{ color: "#fbb9c5" }}>My Posts List</h3>

            {posts.length > 0 ? (
                <>
                  {posts.map((post, idx) => (
                      <div key={idx} className="pb-2 mb-2 mt-2 bottom__line">
                        <Post
                            post={post}
                            showUsername={false}
                            fromFavoritePostPage={false}
                        />
                        {/* Update Button */}
                        <div>
                          <Button
                              variant="pink"
                              size="sm"
                              onClick={() => updateForm(post._id)}
                              style={{ backgroundColor: '#c3edbf', borderColor: '#c3edbf', width: '30%', marginRight: '8px' }}
                          >
                            Update
                          </Button>
                          <Button
                              variant="outline-yellow"
                              size="sm"
                              onClick={() => delPost(post._id)}
                              style={{ backgroundColor: '#e6c8fe', borderColor: '#e6c8fe', width: '30%', marginTop: '8px' }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                  ))}
                </>
            ) : (
                ""
            )}
          </Col>
          {/* Post Form */}
          <Col className={!toggleDisplay && toggleSlideShow ? "show" : "hide"}>
            <h3 className="title" style={{ color: "#b8dfe6" }}>My Posts Slide Show</h3>
            {posts.length > 0 ? <ImageSlideShow posts={posts} /> : ""}
          </Col>
        </Row>
      </Container>
  );



}

export default UserHome
