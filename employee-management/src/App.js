import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
import EmployeeCreate from "./Components/EmployeeCreate";
import EmployeeDetail from "./Components/EmployeeDetail";
import EmployeeEdit from "./Components/EmployeeEdit";

function App() {
  return (
    <div className="App">
      {/* Setting up BrowserRouter to enable routing */}
      <BrowserRouter>
        {/* Define routes for different components */}
        <Routes>
          {/* Route for the EmployeeList component, rendered on the home path */}
          <Route path="/" element={<EmployeeList></EmployeeList>}></Route>

          {/* Route for the EmployeeCreate component, rendered on the create path */}
          <Route
            path="/employee/create"
            element={<EmployeeCreate></EmployeeCreate>}
          ></Route>

          {/* Route for the EmployeeDetail component, rendered on the detail path with an employee ID parameter */}
          <Route
            path="/employee/detail/:id"
            element={<EmployeeDetail></EmployeeDetail>}
          ></Route>

          {/* Route for the EmployeeEdit component, rendered on the edit path with an employee ID parameter */}
          <Route
            path="/employee/edit/:empid"
            element={<EmployeeEdit></EmployeeEdit>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
