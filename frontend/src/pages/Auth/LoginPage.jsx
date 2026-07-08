import { useState } from "react";

import { login }
  from "../../api/authApi";

import { setAuthToken }
from "../../api/axios";

import { useNavigate }
  from "react-router-dom";

import { useAuth }
  from "../../context/AuthContext";

export default function LoginPage() {

  const navigate = useNavigate();

  const {
    setUser,
    setAccessToken,
    setIsAuthenticated
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await login({
          email,
          password
        });

      const {
        accessToken,
        user
        } = response.data;

        setAccessToken(accessToken);

        setAuthToken(accessToken);

      setUser(user);

      setIsAuthenticated(true);

      switch (user.role) {

        case "CANDIDATE":

          navigate(
            "/candidate"
          );

          break;

        case "RECRUITER":

          navigate(
            "/recruiter"
          );

          break;

        case "COMPANY_ADMIN":

          navigate(
            "/company-admin"
          );

          break;

        case "SUPER_ADMIN":

          navigate(
            "/admin/dashboard"
          );

          break;

        default:

          navigate("/login");
      }

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Login failed"
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
                Login
              </h2>

              <form
                onSubmit={handleSubmit}
              >

                <div className="mb-3">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-3">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}