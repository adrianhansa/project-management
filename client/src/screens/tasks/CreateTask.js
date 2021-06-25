import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../actions/taskActions";

const CreateTask = ({ projectId }) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(projectId, { description }));
    setDescription("");
  };
  return (
    <div>
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          placeholder="task description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
