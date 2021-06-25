import React, { useEffect, useState } from "react";
import { updateProject, getProject } from "../../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";

const UpdateProject = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, project, error } = useSelector((state) => state.getProject);
  const [name, setName] = useState("");
  const status = ["not started", "in progress", "pending", "finalized"];
  const [projectStatus, setProjectStatus] = useState("");

  useEffect(() => {
    if (!project) {
      dispatch(getProject(match.params.slug));
    } else {
      setName(project.name);
      setProjectStatus(project.status);
    }
  }, [dispatch, match, history, project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(name, {
      lower: true,
      remove: /[*+~.,()'"?!:@]/g,
    });
    dispatch(updateProject(project._id, { name, status: projectStatus }));
    history.push(`/project-details/${slug}`);
  };
  return (
    <div>
      {loading ? (
        <h4>Loading...</h4>
      ) : project ? (
        <>
          <h3>Update Project - {project.name}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              onChange={(e) => setProjectStatus(e.target.value)}
              value={projectStatus}
            >
              {status.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
            <button type="submit">Save changes</button>
          </form>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default UpdateProject;
