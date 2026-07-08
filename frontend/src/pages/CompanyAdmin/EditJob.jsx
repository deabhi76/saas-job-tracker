import {
  useState,
  useEffect
}
from "react";

import {
  useParams
}
from "react-router-dom";

import {
  getJobById,
  updateJob
}
from "../../api/jobApi";

export default function EditJob() {

  const { id } =
    useParams();

  const [
    formData,
    setFormData
  ] = useState({

    title: "",

    description: "",

    location: "",

    salaryMin: "",

    salaryMax: "",

    employmentType:
      "FULL_TIME"
  });

  const loadJob =
async () => {

  try {

    const response =
      await getJobById(id);

    const job =
      response.data.data;

    setFormData({

      title:
        job.title,

      description:
        job.description,

      location:
        job.location,

      salaryMin:
        job.salary_min,

      salaryMax:
        job.salary_max,

      employmentType:
        job.employment_type
    });

} catch (err) {

    console.error(err);

    alert(
      "Failed to load job"
    );
  }
};

useEffect(() => {

  loadJob();

}, []);

const handleChange =
(e) => {

  setFormData({

    ...formData,

    [e.target.name]:
      e.target.value
  });
};

const handleSubmit =
async (e) => {

  e.preventDefault();

  try {

    await updateJob(
      id,
      formData
    );

    alert(
      "Job updated"
    );

  

  } catch (err) {

    console.error(err);

    alert(
      "Update failed"
    );
  }
};

  return (

  <div>

    <h2>
      Edit Job
    </h2>

    <form
      onSubmit={handleSubmit}
    >

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <input
        type="number"
        name="salaryMin"
        value={formData.salaryMin}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <input
        type="number"
        name="salaryMax"
        value={formData.salaryMax}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <select
        name="employmentType"
        value={
          formData.employmentType
        }
        onChange={handleChange}
        className="form-select mb-3"
      >

        <option value="FULL_TIME">
          Full Time
        </option>

        <option value="PART_TIME">
          Part Time
        </option>

        <option value="INTERNSHIP">
          Internship
        </option>

        <option value="CONTRACT">
          Contract
        </option>

      </select>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Update Job
      </button>

    </form>

  </div>
);
}

