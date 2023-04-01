import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from "./components/Footer";
import UserHome from "./pages/UserHome";
import PostDetail from "./pages/PostDetail";
import FavoritePost from "./pages/FavoritePost";
import Profile from "./pages/Profile";
import UserForm from './components/UserForm';
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/favoritePost" element={<FavoritePost />} />
          <Route path="/postDetail/:id" element={<PostDetail />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/userForm" element={<UserForm />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
