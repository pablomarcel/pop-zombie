import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Container } from 'react-bootstrap'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  })

  const [image, setImage] = useState('')
  const [imagePath, setImagePath] = useState('')

  const { firstName, lastName, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message.error);
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  useEffect(() => {
    if (!image || image.length < 1) return;
    setImagePath(URL.createObjectURL(image));
  }, [image]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Check if all mandatory fields are valid or not
    if (!email || !firstName || !lastName || !password) {
      toast.error('Email, password, first name and last name are mandatory!')
      return
    }
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        image
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
      <Container style={{ width: "400px" }}>
        <section className='heading' style={{ backgroundColor: "#fcf7e3" }}>
          <h3 style={{ color: "#fbb9c5" }}>
            <FaUser /> Register
          </h3>
          <h4 style={{ color: "#b8dfe6" }}>Please create an account</h4>
        </section>

        <section className='form' style={{ backgroundColor: "#fcf7e3" }}>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                  type='text'
                  className='form-control'
                  id='firstName'
                  name='firstName'
                  value={firstName}
                  placeholder='First name'
                  onChange={onChange}
                  required
                  style={{ backgroundColor: "#c3edbf" }}
              />
              <input
                  type='text'
                  className='form-control'
                  id='lastName'
                  name='lastName'
                  value={lastName}
                  placeholder='Last name'
                  onChange={onChange}
                  required
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </div>
            <div className='form-group'>
              <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                  required
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </div>
            <div className='form-group'>
              <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </div>
            <div className='form-group'>
              <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  placeholder='Confirm password'
                  onChange={onChange}
                  style={{ backgroundColor: "#c3edbf" }}
              />
            </div>
            <div className='form-group'>
              <input
                  type='file'
                  className='form-control'
                  id='image'
                  name='image'
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ backgroundColor: "#c3edbf" }}
              />
              {imagePath ? (
                  <img src={imagePath} alt='' className='author-image' />
              ) : null}
            </div>

            <div className='form-group'>
              <button
                  type='submit'
                  className='btn btn-block'
                  style={{ backgroundColor: "#fbb9c5", color: "#fcf7e3" }}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </Container>
  );

}

export default Register
