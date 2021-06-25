import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projectActions";

const CreateProject = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(createProject({ name }));
      history.push("/");
    }
  };
  return (
    <div>
      <h3>Create Project</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
