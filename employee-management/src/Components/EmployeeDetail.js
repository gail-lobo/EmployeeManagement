import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./EmployeeDetail.css";

const EmployeeDetail = () => {
  // Get the employee id from the route parameters
  const { id } = useParams();

  // State variable to store employee data
  const [empData, setEmpData] = useState([]);

  // Fetch employee details from the server on component mount
  useEffect(() => {
    // Make a GET request to fetch employee details
    fetch(`http://localhost:8000/employee/${id}`).then((response) => {
      if (!response.ok) {
        // Handle errors when fetching employee details
        throw new Error("Error fetching Employee Details");
      } else {
        // Parse the response and update the state with employee data
        response
          .json()
          .then((resp) => {
            setEmpData(resp);
          })
          .catch((err) => {
            // Handle errors when parsing JSON
            throw err;
          });
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="employee-detail-container">
      <div className="card">
        <div className="card-title">
          <h1>Employee Details</h1>
        </div>
        <div className="card-body">
          {/* Display employee details */}
          <h3>
            Id: <span className="detail-value">{empData.id}</span>
          </h3>
          <h2>Name: {empData.name}</h2>
          <br />
          <h2>Contact Details:</h2>
          <h3>Email: {empData.email}</h3>
          <h3>Phone: {empData.phone}</h3>
          <br />
          <h3>Status: {empData.active ? "Working" : "Not Working"}</h3>

          {/* Link to navigate back to the employee list */}
          <Link to="/">
            <button className="btn btn-primary">Back to Employee List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
