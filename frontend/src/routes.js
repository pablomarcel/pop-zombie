import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome';
import PostDetail from './pages/PostDetail';
import FavoritePost from './pages/FavoritePost';
import Profile from './pages/Profile';
import UserForm from './components/UserForm';

export const routePaths = [
    { path: '/' },
    { path: '/login' },
    { path: '/register' },
    { path: '/userHome' },
    { path: '/favoritePost' },
    { path: '/postDetail/:id' },
    { path: '/profile/:userId' },
    { path: '/userForm' },
];

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/userHome', element: <UserHome /> },
    { path: '/favoritePost', element: <FavoritePost /> },
    { path: '/postDetail/:id', element: <PostDetail /> },
    { path: '/profile/:userId', element: <Profile /> },
    { path: '/userForm', element: <UserForm /> },
];
