import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Background } from "../../background/Background.tsx";
import React, { useState } from "react";

// Define types for the props
interface LoginFormProps {
  onLogin: (userName: string, password: string) => Promise<void>;
  onRegister: (userName: string, email: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [active, setActive] = useState<"login" | "register">("login");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onLogin(userName, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onRegister(userName, email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Background type="video" />
      <div className="position">
        <div className="wrapper">
          {active === "login" ? (
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  value={userName}
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit">Login</button>
              <div className="register-link">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => setActive("register")}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h1>Register</h1>
              <div className="input-box">
                <input
                  value={userName}
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  value={email}
                  type="text"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <button type="submit">Register</button>
              <div className="register-link">
                <p>
                  Do you have an account?{" "}
                  <a href="#" onClick={() => setActive("login")}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
