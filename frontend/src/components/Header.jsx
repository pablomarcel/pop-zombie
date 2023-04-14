import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header' style={{backgroundColor:'#fbb9c5'}}>
            <div className='logo'>
                <Link to='/' style={{color:'#e6c8fe'}}>GoalSetter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout} style={{
                            backgroundColor:'#b8dfe6'
                        }}>
                            <FaSignOutAlt /> <span style={{color:'#fcf7e3'}}>Logout</span>
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login' style={{color:'#c3edbf'}}>
                                <FaSignInAlt /> <span style={{color:'#fcf7e3'}}>Login</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' style={{color:'#e6c8fe'}}>
                                <FaUser /> <span style={{color:'#fcf7e3'}}>Register</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header
