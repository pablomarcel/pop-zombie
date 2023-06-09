import { useEffect, useState } from 'react';
import axios from 'axios';
import { createPost, updatePost } from '../features/posts/postSlice';
import { Card, Container, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
function PostForm({ postId, togglePostForm, returnAddForm }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    country: '',
    content: '',
    airBnBPrice: '',
    hotelPrice: 0,
    couplePrice: 0,
    familyPrice: 0,
  });

  const [image, setImage] = useState('');
  const [imagePath, setImagePath] = useState('')

  const {title, city, country, content, airBnBPrice, hotelPrice, couplePrice, familyPrice} = formData;

  useEffect(() => {
    if (!postId) {
      setFormData({
        ...formData,
        title: '',
        city: '',
        country: '',
        content: '',
        airBnBPrice: '',
        hotelPrice: 0,
        couplePrice: 0,
        familyPrice: 0,
      })
      setImage('');
      return
    }
    axios
      .get(`/api/posts/post/${postId}`)
      .then(res => {
        setImage(res.data[0].image)
        setFormData({
          ...formData,
          title: res.data[0].title,
          city: res.data[0].city? res.data[0].city : '',
          country: res.data[0].country? res.data[0].country : '',
          content: res.data[0].content? res.data[0].content : '',
          airBnBPrice: res.data[0].airBnBPrice? res.data[0].airBnBPrice : '',
          hotelPrice: res.data[0].hotelPrice? res.data[0].hotelPrice : 0,
          couplePrice: res.data[0].couplePrice? res.data[0].couplePrice : 0,
          familyPrice: res.data[0].familyPrice? res.data[0].familyPrice : 0,
        })
      })
      .catch(err => {
        toast.error(err)
      });
  }, [postId])


  useEffect(() => {
    if (!image || image.length < 1) return;
    image instanceof Object ? setImagePath(URL.createObjectURL(image)) : setImagePath(image)
  }, [image]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Title and content are mandatory fields
    if (!title || !content) {
      toast.error('Title and content are required');
      return
    }

    if (!postId) {
      const postData = {
        title,
        city,
        country,
        content,
        airBnBPrice,
        hotelPrice,
        couplePrice,
        familyPrice,
        image
      }
      dispatch(createPost(postData))
    } else {
      // Update post
      const postData = {
        postId,
        title,
        city,
        country,
        content,
        airBnBPrice,
        hotelPrice,
        couplePrice,
        familyPrice,
        image
      }
      // update database
      dispatch(updatePost(postData))
      // Return AddPost Form
      returnAddForm();
    }
  };


  return (
      <Container>
        <div className="pb-2 box" style={{ backgroundColor: "#fcf7e3" }}>
          <div className='sub-header'>
            <div onClick={()=>togglePostForm()} className='form-icon' style={{ color: "#fbb9c5" }}>
              <FiX />
            </div>
          </div>
          <h3 className="mb-2 title" style={{ color: "#b8dfe6" }}>{postId ? "Update Post" : "New Post"}</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                  type="file"
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            {image? (
                <Form.Group controlId="formCard" className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={imagePath} />
                  </Card>
                </Form.Group>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Control
                  type="text"
                  id='title'
                  name='title'
                  value={title}
                  placeholder="Title"
                  onChange={onChange}
                  required
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                  type="text"
                  id='city'
                  name='city'
                  value={city}
                  placeholder="Category"
                  onChange={onChange}
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                  type="text"
                  id='airBnBPrice'
                  name='airBnBPrice'
                  value={airBnBPrice}
                  placeholder="Link"
                  onChange={onChange}
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                  type="text"
                  id='country'
                  name='country'
                  value={country}
                  placeholder="Date"
                  onChange={onChange}
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                  as="textarea"
                  id='content'
                  name='content'
                  value={content}
                  placeholder="Content"
                  rows={10}
                  onChange={onChange}
                  style={{ backgroundColor: "#e6c8fe" }}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit" style={{ backgroundColor: "#b8dfe6", borderColor: "#b8dfe6", width: "20%" }}>
                {postId ? "Update Post" : "Add Post"}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
  )

}

// Define props types for postId, returnAddForm
PostForm.propTypes = {
  postId: PropTypes.string,
  togglePostForm: PropTypes.func.isRequired,
  returnAddForm: PropTypes.func.isRequired
}


export default PostForm
