import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  // State variable to store employee data
  const [employeeData, setEmployeeData] = useState([]);

  // Navigate function to handle page redirection
  const navigate = useNavigate();

  // Fetch employee data from the server on component mount
  useEffect(() => {
    fetch(`http://localhost:8000/employee`).then((response) => {
      if (!response.ok) {
        // Handle errors when fetching employee data
        throw new Error(`Error fetching employee Info`);
      } else {
        // Parse the response and update the state with employee data
        response
          .json()
          .then((resp) => {
            setEmployeeData(resp);
          })
          .catch((error) => {
            // Handle errors when parsing JSON
            throw error;
          });
      }
    });
  }, []);

  // Function to navigate to the employee details page
  const handleDetailComponent = (id) => {
    navigate(`/employee/detail/${id}`);
  };

  // Function to navigate to the employee edit page
  const handleEditComponent = (empid) => {
    navigate(`/employee/edit/${empid}`);
  };

  // Function to handle employee deletion
  const handleDeleteComponent = (id, name) => {
    if (window.confirm(`Do you want to delete the employee '${name}'?`)) {
      // Make a DELETE request to delete the employee
      fetch(`http://localhost:8000/employee/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }).then((response) => {
        if (!response.ok) {
          // Handle errors when deleting the employee
          throw new Error(`Error deleting employee`);
        } else {
          // Reload the page after successful deletion
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee List</h2>
        </div>
        <div className="card-body">
          {/* Add Employee button */}
          <div className="addEmpButton">
            <Link to="/employee/create">
              <button className="btn btn-success">Add Employee</button>
            </Link>
          </div>
          {/* Employee table */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData?.map((employee) => {
                return (
                  // Employee data row
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    {/* Edit, Delete, and Details buttons */}
                    <td>
                      <button
                        onClick={() => {
                          handleEditComponent(employee.id);
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteComponent(employee.id, employee.name);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleDetailComponent(employee.id);
                        }}
                        className="btn btn-success"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
