import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const { user } = useSelector(
    (state) => state.userLogin || state.userRegister
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log(user);
      history.push("/");
    }
  }, [dispatch, history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(email, password, passwordVerify, name));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        <input
          type="text"
          placeholder="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password Verify"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
