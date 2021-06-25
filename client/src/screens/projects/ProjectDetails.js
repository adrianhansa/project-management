import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject, deleteProject } from "../../actions/projectActions";
import Swal from "sweetalert2";

const ProjectDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector(
    (state) => state.getProject || state.updatedProject
  );
  useEffect(() => {
    dispatch(getProject(match.params.slug));
  }, [match, dispatch]);

  const handleDelete = async () => {
    const { value } = await Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete!",
    });
    if (value) {
      dispatch(deleteProject(match.params.slug));
      history.push("/");
    }
  };
  return (
    <div>
      {loading ? (
        <h4>Loading...</h4>
      ) : project ? (
        <>
          <h3>{project.name}</h3>
          <Link to={`/update-project/${match.params.slug}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default ProjectDetails;
