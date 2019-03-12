import React, { useState } from "react";

const TodoList = ({ index, name, removeProject }) => {
  const [todoItem, setTodoItem] = useState({
    completed: false,
    description: "",
    deadline: "",
    name: ""
  });
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("none");

  const onTodoItemNameChange = e => {
    setTodoItem({
      completed: todoItem.completed,
      name: e.target.value,
      description: todoItem.description,
      deadline: todoItem.deadline
    });
  };
  const onTodoItemDescriptionChange = e => {
    setTodoItem({
      completed: todoItem.completed,
      name: todoItem.name,
      description: e.target.value,
      deadline: todoItem.deadline
    });
  };
  const onTodoItemDeadlineChange = e => {
    setTodoItem({
      completed: todoItem.completed,
      name: todoItem.name,
      description: todoItem.description,
      deadline: e.target.value
    });
  };

  const addTodoItemToList = () => {
    setTodoList(prev => [...prev, todoItem]);
    setTodoItem({
      completed: false,
      name: "",
      description: "",
      deadline: ""
    });
  };

  const toggleTodoItem = index => {
    const item = todoList[index];
    setTodoList(prev => [
      ...prev.slice(0, index),
      {
        completed: !item.completed,
        name: item.name,
        description: item.description,
        deadline: item.deadline
      },
      ...prev.slice(index + 1)
    ]);
  };

  const deleteTodoItem = index => {
    setTodoList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const showUnCompleted = () => {
    setFilter("uncompleted");
  };

  const showCompleted = () => {
    setFilter("completed");
  };

  const resetFilter = () => {
    setFilter("none");
  };

  return (
    <div>
      <div className="row justify-content-between">
        <div className="col">
          {name}{" "}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeProject(index)}
          >
            X
          </button>
        </div>
        <div className="col">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" onClick={showUnCompleted}>
                Show Uncompleted
              </button>
              <button className="dropdown-item" onClick={showCompleted}>
                Show Completed
              </button>
              <button className="dropdown-item" onClick={resetFilter}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          onChange={onTodoItemNameChange}
          value={todoItem.name}
        />
      </div>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          onChange={onTodoItemDescriptionChange}
          value={todoItem.description}
        />
      </div>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Deadline"
          onChange={onTodoItemDeadlineChange}
          value={todoItem.deadline}
        />
      </div>
      <div>
        <button
          className="btn btn-success btn-block"
          onClick={addTodoItemToList}
        >
          Add
        </button>
      </div>
      <div>
        <ul>
          {todoList
            .filter(x => {
              if (filter == "none") {
                return true;
              } else if (filter == "completed") {
                return x.completed == true;
              } else if (filter == "uncompleted") {
                return x.completed == false;
              }
            })
            .map((value, key) => {
              return (
                <li key={key}>
                  <div>
                    <span
                      onClick={() => toggleTodoItem(key)}
                      style={{
                        textDecoration: value.completed ? "line-through" : ""
                      }}
                    >
                      {value.name} - {value.description} - {value.deadline}
                    </span>
                    <button onClick={() => deleteTodoItem(key)}>Delete</button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
