import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Employee({ employee }) {
  return (
    <div className="employee-card">
      <img src={employee.image} alt={employee.firstName} />
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div className="App">
      <div className="employee-list">
        {employees.map((employee, index) =>
          <Employee key={index} employee={employee} />
        )}
      </div>
    </div>
  );
}

export default App;
