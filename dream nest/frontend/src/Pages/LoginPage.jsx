import { useState } from "react"
import axios from "axios"
import { setLogin } from "../redux/state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../styles/Login.scss"

const LoginPage = () => {

  const url = "https://dream-nest-guuf.onrender.com/auth";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/login`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const loggedIn = response.data;
      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form onSubmit={handleSubmit} className="login_content_form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Do not have an account? Sign In Here</a>
      </div>
    </div>
  )
}

export default LoginPage