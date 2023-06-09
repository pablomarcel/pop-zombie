import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import default_image from '../logo/default_user.jpg';
import React from "react";
import ReactPlayer from "react-player";

import './postStyles.css';

const Post = ({ post, showUsername, fromFavoritePostPage }) => {
  if (!post) {return}

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => url.endsWith(ext));
  };

  // Get author image & name
  let authorImage = '';
  let author = '';

  if (showUsername) {
    authorImage = fromFavoritePostPage ?
                    post.post.author && post.post.author.image ?
                      <img src={post.post.author.image} alt = '' className='author-small-image' />
                      :
                      <img src={default_image} alt = '' className='author-small-image' />
                    :
                    post.author && post.author.image?
                    <img src={post.author.image} alt = '' className='author-small-image' />
                      :
                      <img src={default_image} alt = '' className='author-small-image' />;
    author = fromFavoritePostPage ?
              post.post? ` ${post.post.author.firstName} ${post.post.author.lastName} - `:''
              :
              post.author? ` ${post.author.firstName} ${post.author.lastName} - `:'';
  }

  const postId = fromFavoritePostPage ? post.post._id : post._id;
  const title = fromFavoritePostPage ? post.post.title : post.title;
  const image = fromFavoritePostPage ? post.post.image : post.image;

  const postDate = post.updatedAt ? ` Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}` : '';

  return (


      <Card className='custom-card mb-2'
            style={{
              backgroundColor: '#fcf7e3',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',

      }}>
        <Link to={`/postDetail/${postId}`}>
          {image ? (
              isVideo(image) ? (
                  <div className="banner">
                    <ReactPlayer className="w-100" url={post.image} controls />
                  </div>
              ) : (
                  <Card.Img
                      src={image}
                      alt={title}
                      className="w-100"
                      style={{
                        borderRadius: '10px',
                        marginTop:'12px'
                  }}
                  />
              )
          ) : (
              ''
          )}
        </Link>

        <Card.Body>
          <Link to={`/postDetail/${postId}`}>
            <Card.Title style={{ color: '#f17891' }}>{title}</Card.Title>
          </Link>
          <Card.Text>
            {authorImage}
            <span style={{ color: '#b99ef5' }}>{author}</span>
            <span style={{ color: '#88d8c0' }}>{postDate}</span>
          </Card.Text>
        </Card.Body>
      </Card>
  )

}
// Define proptypes for post, showUsername, fromFavoritePostPage
Post.propTypes = {
  post: PropTypes.object.isRequired,
  showUsername: PropTypes.bool.isRequired,
  fromFavoritePostPage: PropTypes.bool.isRequired,
}

export default Post
