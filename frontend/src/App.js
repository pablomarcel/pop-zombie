import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { routes } from './routes';

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
                <Footer />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
