import "./App.css";
import { useState, useEffect } from "react";
import { ActiveList } from "./components/list";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(false);
  const [isEditing, setIsEditing] = useState(null); 
  const [editText, setEditText] = useState("");
  

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }, [todos]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((obj) => obj.id !== id));
  };

  const addTodo = () => {
    if (todo.trim() === "") { 
      return;
    }
    const isDuplicate = todos.some((t) => t.text.toLowerCase() === todo.trim().toLowerCase());
    if (isDuplicate) {
      return;
    }
    setTodos([...todos, { id: new Date(), text: todo, status: false }]);
    setTodo("");
  };


  const startEditing = (id, currentText) => {
    setIsEditing(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.text = editText;
        }
        return todo;
      })
    );
    setIsEditing(null);
    setEditText("");
  };
  const col1="red"
  const col2="blue"
  const [color,setColor]=useState(true)
  
  return (
    <section className="container">
      {color?<button style={{color:col1}} onClick={()=>{setColor(!color)}}>brototype</button>:
      <button style={{color:col2}} onClick={()=>{setColor(!color)}}>brototype</button>}
      
      <div className="heading">
        <img className="heading__img"src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"alt="nothing"/>
        <h1 className="heading__title">To-Do List</h1>
      </div>

      <div>
        <label className="form__label" htmlFor="todo">
          ~ Today I need to ~
        </label>
        <input className="form__input"type="text"value={todo}onChange={(e) => {setTodo(e.target.value)}}size="30"required/>
        <button className="button" onClick={addTodo}>
          <span>Submit</span>
        </button>
     
      </div>
      <div>
        <div className="box">
          <span
            onClick={() => {
              setActive(false);
            }}
            className="span"
          >
            all task
          </span>

          <span
            onClick={() => {
              setActive(true);
            }}
            className="span"
          >
            active task
          </span>
        </div>
      </div>
      {active ? (
        <ActiveList list={todos}deleteTodo={deleteTodo} />
      ) : (
        <div>
          {todos.map((obj) => {
            return (
              <div key={obj.id}  className="outer">
                <div className="tab">
                  <div>
                    <input
                      onChange={(e) => {
                        setTodos(
                          todos.filter((obj2) => {
                            if (obj2.id === obj.id) {
                              obj2.status = e.target.checked;
                            }
                            return obj2;
                          })
                        );
                      }}
                      checked={obj.status}
                      type="checkbox"
                    />
                    {isEditing === obj.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      <span>{obj.text}</span>
                    )}
                  </div>
                  <div>
                    {isEditing === obj.id ? (
                      <i
                        onClick={() => saveEdit(obj.id)}
                        className="bi bi-check"
                        title="Save"
                      ></i>
                    ) : (
                      <i
                        onClick={() => startEditing(obj.id, obj.text)}
                        className="bi bi-pen"
                        title="Edit"
                      ></i>
                    )}
                    <i
                      onClick={() => {
                        deleteTodo(obj.id);
                      }}
                      className="bi bi-trash"
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default App;
