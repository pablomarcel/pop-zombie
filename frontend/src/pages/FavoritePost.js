import { useState, useEffect } from "react";
import Post from "../components/Post";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ImageSlideShow from "../components/ImageSlideShow";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyFavoritePosts, reset, deleteMyFavoritePost } from "../features/favoritepost/favoritePostSlice";
import { getAllPosts } from '../features/posts/postSlice'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from 'react';
import ReactPlayer from 'react-player'
import { Helmet } from 'react-helmet';

const FavoritePost = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleSlideShow, setToggleSlideShow] = useState(true);
  const { favoriteposts, isLoading, isError, message } = useSelector((state) => state.favoriteposts)
  const { posts } = useSelector((state) => state.posts)

  // Get my favorite products data
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    }
    dispatch(getAllMyFavoritePosts());
    dispatch(getAllPosts())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
    return <Spinner />
  }

  // Delete post function
  const delMyFavoritePost = async (id) => {
    if (window.confirm("Are you sure you want to remove this post from your collection?")) {
      dispatch(deleteMyFavoritePost(id))
    };
  };

  return (
      <Container fluid>

        <Helmet>
          <title>{user ? `${user.firstName}'s Favorite Posts - Pop Zombie` : "My Favorite Posts - Pop Zombie"}</title>
          <meta name="description" content={favoriteposts.length > 0 ? `A list of ${user.firstName}'s ${favoriteposts.length} favorite posts in the application.` : "A list of the user's favorite posts in the application."} />
        </Helmet>



        {/* Rendering button showing/hiding slide show */}
        <div className="right__side mt-2">
          <Button
              variant="outline-primary"
              size="sm"
              onClick={()=> setToggleSlideShow(!toggleSlideShow)}
              style={{ backgroundColor: '#c3edbf', borderColor: '#c3edbf' }}
          >
            {toggleSlideShow? "Hide Slide Show" : "Show Slide Show"}
          </Button>
        </div>

        <Row>
          <Col>
            <h3 className='title' style={{ color: '#fbb9c5' }}>My Favorites</h3>

            {favoriteposts.length > 0 ? (
                <>
                  {favoriteposts.map((post) =>
                      <div key={post._id} className='pb-2 mb-2 bottom__line'>
                        <Post post={post} showUsername={true} fromFavoritePostPage={true} />
                        {/* Remove button */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => delMyFavoritePost(post._id)}
                            style={{ backgroundColor: '#e6c8fe', borderColor: '#e6c8fe', width: '30%' }}
                        >
                          Remove
                        </Button>
                      </div>
                  )}
                </>
            ) : ('There is no favorite post here.')
            }

          </Col>
          {/* Image Slide Show area */}
          <Col className={toggleSlideShow? "show":"hide"}>
            <h3 className='title' style={{ color: '#b8dfe6' }}>Pop Zombie Slide Show</h3>
            {posts.length > 0 ? (<ImageSlideShow posts={posts} />):('')}
          </Col>
        </Row>
      </Container>
  )

}

export default FavoritePost
