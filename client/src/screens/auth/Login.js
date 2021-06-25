import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [dispatch, user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="name"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <br />
      </form>
    </div>
  );
};

export default Login;
