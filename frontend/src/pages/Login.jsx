import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Container } from 'react-bootstrap'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message.error);
    }

    if (isSuccess || user) {
      // Jump to My Posts page
      navigate("/userHome");
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter your email and password!')
      return
    }

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))

  }

  if (isLoading) {
    return <Spinner />
  }

  return (
      <Container style={{ width: "400px", backgroundColor: "#fcf7e3", padding: "30px", borderRadius: "10px" }}>
        <section className='heading'>
          <h3 style={{ color: "#fbb9c5", marginBottom: "15px" }}>
            <FaSignInAlt style={{ marginRight: "10px" }} /> Login
          </h3>
          <h4 style={{ color: "#b8dfe6" }}>Login and start posting posts</h4>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
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
                  style={{ backgroundColor: "#e6c8fe", border: "none", borderRadius: "5px", padding: "10px", marginBottom: "15px" }}
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
                  required
                  style={{ backgroundColor: "#c3edbf", border: "none", borderRadius: "5px", padding: "10px" }}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block' style={{ backgroundColor: "#fbb9c5", color: "#fcf7e3", borderRadius: "5px", padding: "10px", border: "none", marginTop: "15px" }}>
                Submit
              </button>
            </div>
          </form>
        </section>
      </Container>
  )
}

export default Login
