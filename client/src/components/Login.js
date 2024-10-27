import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple check for demo purposes
        if (username === "admin" && password === "password") {
            onLogin(); // Calls the onLogin function passed from App to update the login state
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="bodyLogin">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="buttonLogin" type="submit">Login</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
