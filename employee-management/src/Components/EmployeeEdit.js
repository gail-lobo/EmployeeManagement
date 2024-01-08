import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EmployeeEdit = () => {
  // Get the employee id from the route parameters
  const { empid } = useParams();

  // State variables to manage employee information
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);

  // Navigate function to redirect after form submission
  const navigate = useNavigate();

  // Handle form submission to update employee details
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create employee information object
    const empInfo = { id, name, email, phone, active };

    // Make a PUT request to update employee details
    fetch(`http://localhost:8000/employee/${empid}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(empInfo),
    }).then((response) => {
      if (!response.ok) {
        // Handle errors when updating employee details
        throw new Error(`Error updating employee details`);
      } else {
        response
          .json()
          .then(() => {
            // Display success message, navigate to the home page
            alert("Employee Updated Successfully!!");
            navigate("/");
          })
          .catch((error) => {
            // Handle errors when parsing JSON
            throw error;
          });
      }
    });
  };

  // Fetch employee details on component mount to populate the form
  useEffect(() => {
    fetch(`http://localhost:8000/employee/${empid}`).then((response) => {
      if (!response.ok) {
        // Handle errors when fetching employee details
        throw new Error("Error fetching Employee Details");
      } else {
        response
          .json()
          .then((resp) => {
            // Update state with employee details
            setId(resp.id);
            setName(resp.name);
            setEmail(resp.email);
            setPhone(resp.phone);
            setActive(resp.active);
          })
          .catch((err) => {
            // Handle errors when parsing JSON
            throw err;
          });
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          {/* Employee edit form */}
          <form
            className="container"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="card">
              <div className="card-title">
                <h2>Edit Employee</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Employee ID */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Employeed Id:</label>
                      <input
                        className="form-control"
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                        disabled
                      ></input>
                    </div>
                  </div>
                  {/* Employee Name */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        required
                        className="form-control"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Email */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        required
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Phone */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        required
                        className="form-control"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Active status */}
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => {
                          setActive(e.target.checked);
                        }}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  {/* Save and Back buttons */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/">
                        <button className="btn btn-primary">Back</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
