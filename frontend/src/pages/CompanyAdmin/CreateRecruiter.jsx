import { useState } from "react";
import { createRecruiter } from "../../api/recruiterApi";

export default function CreateRecruiter() {

  const [formData, setFormData] =
    useState({
      name:"",
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await createRecruiter(
          formData
        );

      alert(
        response.data.message ||
        "Recruiter created"
      );

      setFormData({
        name:"",
        email: "",
        password: ""
      });

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to create recruiter"
      );
    }
  };

  return (
    <div>

      <h2>
        Create Recruiter
      </h2>

      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">

        <label className="form-label">
            Full Name
        </label>

        <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
        />

    </div>

        <div className="mb-3">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Recruiter
        </button>

      </form>

    </div>
  );
}