import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface EmployeeType {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  image: string;
}

function Employee({ employee }: { employee: EmployeeType }) {
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
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    axios
      .get<EmployeeType[]>("http://localhost:3001/employees")
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
        {employees.map((employee) => (
          <Employee key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default App;
