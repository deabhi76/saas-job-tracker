import { useState } from "react";
import { companySignup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

import { setAuthToken }
from "../../api/axios";

import { useAuth }
  from "../../context/AuthContext";

export default function CompanySignupPage() {

  const {
        setUser,
        setAccessToken,
        setIsAuthenticated
      } = useAuth();

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await companySignup(formData);

    console.log(
        "SIGNUP RESPONSE:",
        response.data
    );
    
            const {
                accessToken,
                user
                } = response.data;
        
                setAccessToken(accessToken);
        
                setAuthToken(accessToken);
        
              setUser(user);
        
              setIsAuthenticated(true);

    alert("Signup successful");

    navigate("/company-admin");


   } catch (err) {
    console.error(
    "SIGNUP ERROR:",
    err
  );

  console.error(
    err.response?.data
  );

  alert(
    err.response?.data?.message ||
    err.message ||
    "Signup failed"
  );
  }
};

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card">

            <div className="card-body">

              <h2 className="mb-4">
                Company Signup
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Company Name</label>

                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                  />

                </div>

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

                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

                <button
                  className="btn btn-success"
                  type="submit"
                >
                  Sign Up
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}