import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player';
import { Card } from 'react-bootstrap';

const ImageSlideShow = ({ posts }) => {
  const imageList = posts.filter((post) => post.image);

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => url.endsWith(ext));
  };

  return (
      <Carousel>
        {imageList.map((post) => (
            <Carousel.Item key={post._id}>
              <Link to={`/postDetail/${post._id}`}>
                {isVideo(post.image) ? (
                    <ReactPlayer className="w-100" url={post.image} controls />
                ) : (
                    <img
                        className="d-block w-100"
                        src={post.image}
                        alt={post.title}
                    />
                )}
                <Carousel.Caption>
                  <h3>{post.title}</h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
        ))}

      </Carousel>
  );
};

ImageSlideShow.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageSlideShow;
