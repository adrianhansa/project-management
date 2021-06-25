import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../actions/projectActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const { loading, error, projects } = useSelector(
    (state) => state.getProjects
  );
  return (
    <>
      <h1>Home - Project Management</h1>
      <div>
        {loading ? (
          <h5>Loading...</h5>
        ) : projects ? (
          projects.map((project) => {
            return (
              <p key={project._id}>
                <Link to={`/project-details/${project.slug}`}>
                  {project.name}
                </Link>
              </p>
            );
          })
        ) : (
          <p>{error}</p>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
