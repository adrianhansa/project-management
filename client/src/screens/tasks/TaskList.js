import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../actions/taskActions";

const TaskList = ({ projectId }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.getTaskList);
  useEffect(() => {
    dispatch(getTasks(projectId));
  }, [dispatch, projectId]);
  return (
    <div>
      {loading ? (
        <h4>Loading...</h4>
      ) : tasks ? (
        <>
          <h3>Tasks</h3>
          <ul>
            {tasks.map((task) => {
              return <li key={task._id}>{task.description}</li>;
            })}
          </ul>
        </>
      ) : (
        <h4>{error}</h4>
      )}
    </div>
  );
};

export default TaskList;
