import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://foodappapi-arpit045-boop.onrender.com/api/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container">
      <form
        className="d-flex align-items-center flex-column bd-highlight mb-3"
        style={{ marginTop: "120px" }}
        onSubmit={handleSubmit}
      >
        <h4>Sign Up</h4>
        <p>Please enter the required information</p>
        <label className="mb-3">Name</label>
        <input
          className="mb-3"
          style={{ width: "300px" }}
          type="text"
          name="name"
          value={credentials.name}
          onChange={handleChange}
        />
        <label className="mb-3">Email</label>
        <input
          type="email"
          name="email"
          style={{ width: "300px" }}
          value={credentials.email}
          onChange={handleChange}
        />
        <label className="mb-3 my-3">password</label>
        <input
          type="password"
          name="password"
          style={{ width: "300px" }}
          value={credentials.password}
          onChange={handleChange}
        />
        <label className="mb-3 my-3">location</label>
        <input
          className="mb-3"
          type="text"
          style={{ width: "300px" }}
          name="location"
          value={credentials.location}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-success mb-3"
          style={{ width: "200px" }}
        >
          Submit
        </button>
        <Link to="/login">
          <button type="submit" className="btn btn-danger mx-3">
            Already a User
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
