import { useRef, useState } from 'react';
import './Style.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {

        e.preventDefault();

        const data = {
            "username": username,
            "password": password
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);

            if (response.status === 200) {
                localStorage.setItem("token", response.data);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                navigate("/");
            }

        } catch (error) {
            setPassword('');
            setUsername('');
            alert("Invalid Username or Password");
        }

    }

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <>
            <div className="text-center mb-5 mt-4">
                <h3>Welcome! Please Login to continue.</h3>
                <div>New member?<button type="button" class="btn btn-link" onClick={handleRegister}>Register</button>here.</div>
            </div>
            <div className="login-box">

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required value={username} />
                    </div>

                    <div className="form-group mb-3">
                        <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required value={password} />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )

}

export default Login;