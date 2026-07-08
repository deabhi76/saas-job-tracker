import { useState }
from "react";

import { createJob }
from "../../api/jobApi";

export default function CreateJob() {

  const [formData,
    setFormData] =
    useState({

      title: "",

      description: "",

      location: "",

      salaryMin: "",

      salaryMax: "",

      employmentType:
        "FULL_TIME"
    });

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

        await createJob(
          formData
        );

        alert(
          "Job created"
        );

      } catch(err) {

    if (

        err.response?.status === 403

    ) {

        alert(

            err.response.data.message

        );

        navigate(
            "/billing"
        );

        return;
    }

    alert(
        "Failed to create job"
    );
}
    };

  return (

    <div>

      <h2>
        Create Job
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        <input
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="salaryMin"
          placeholder="Minimum Salary"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="salaryMax"
          placeholder="Maximum Salary"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <select
          name="employmentType"
          className="form-select mb-3"
          onChange={handleChange}
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
          className="btn btn-primary"
          type="submit"
        >
          Create Job
        </button>

      </form>

    </div>
  );
}