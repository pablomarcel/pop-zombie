import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (!user) {
      return
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    axios
        .get('/api/users/me', config)
        .then(res => setCurrentUser(res.data))
        .catch(err => toast.error(err))
  },[]);

  return (
      <Container style={{ width: "400px" }}>
        <div className="p-3 box" style={{backgroundColor: "#fcf7e3"}}>
          <h3 className="mb-3 text-center" style={{color: "#fbb9c5"}}>My Profile</h3>
          <div className="pb-2" style={{color: "#b8dfe6"}}>
            Display name: {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className="pb-3" style={{color: "#b8dfe6"}}>
            Email: {currentUser.email}
          </div>
          {currentUser.image ? (
              <div className="pb-3">
                <img src={currentUser.image} alt='' className='author-image' />
              </div>
          ) : null}
          <div className="d-grid gap-2">
            <Button
                variant="secondary"
                type="submit"
                style={{backgroundColor: "#e6c8fe", color: "#fbb9c5"}}
                onClick={() => navigate('/userForm/')}
            >
              Edit My Profile
            </Button>
            <Button
                variant="secondary"
                type="submit"
                style={{backgroundColor: "#c3edbf", color: "#fbb9c5"}}
                onClick={() => navigate('/userHome')}
            >
              Back to My Posts page
            </Button>
          </div>

        </div>
      </Container>
  )
}

export default Profile
