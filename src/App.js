import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/todolist";

const App = () => {
  const [username, setUsername] = useState("burak");
  const [currentState, setCurrentState] = useState("login");
  const [projectName, setProjectName] = useState({
    name: "",
    description: ""
  });
  const [projectList, setProjectList] = useState([]);

  const login = () => {
    setCurrentState("form");
  };

  const usernameOnChange = e => {
    setUsername(e.target.value);
  };

  const projectNameOnChange = e => {
    setProjectName(e.target.value);
  };

  const addProject = () => {
    setProjectList(prev => [...prev, { name: projectName }]);
  };

  const removeProject = projectIndex => {
    setProjectList(prev => [
      ...prev.slice(0, projectIndex),
      ...prev.slice(projectIndex + 1)
    ]);
  };

  return (
    <div className="container">
      <div>
        {currentState == "login" && (

          <div className="row justify-content-md-center">
            <div className="col-md-3">
              <div>
                <div className="text-center">
                  {" "}
                  <h1>Welcome</h1>
                </div>
                <input type="text" class="form-control" onChange={usernameOnChange} />
                <button className="btn btn-primary btn-block" onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>

        )}
        {currentState == "form" && (
          <div>

            <div className="row justify-content-md-center">
              <div className="col-md-4">
                <div>Welcome {username}!</div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={projectNameOnChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={addProject}
                  >
                    Create To Do List
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              {projectList.map((value, index) => {
                return (
                  <div className="col-md-4">
                    <TodoList
                      key={index}
                      index={index}
                      name={value.name}
                      removeProject={removeProject}
                    />
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;
