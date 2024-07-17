import { useEffect, useState } from "react";

const Todo = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const fetchData = async () => {
    console.log(1);
    const res = await fetch("http://localhost:8080/todolists");
    console.log(2, res);
    const resData = await res.json();
    console.log(3, resData);
    if (resData.status == 200);
    {
      setTodoLists(resData.data);
    }
  };

  const addTodoListData = async () => {
    const res = await fetch("http://localhost:8080/todolists", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoValue,
      }),
    });
    return res;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addTodoListData();
    if (res.ok) {
      fetchData();
      setTodoValue("");
    }
  };
  const handleChange = (e) => {
    let todoInput = e.target.value;
    setTodoValue(todoInput);
  };
  const handleEdit = () => {
    console.log("will get the edit functionalty soon");
  };
  const handleDelete = () => {
    console.log("will get the delete functionalty soon");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Add The Content to the list</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addInput">Add the Value : </label>
        <input
          type="text"
          id="todoInput"
          placeholder="Enter the Values"
          required
          onChange={handleChange}
          value={todoValue}
        ></input>
        <button type="submit">Add</button>
      </form>
      <>
        {todoLists.map((todolist, index) => {
          return (
            <>
              <div>
                <div className="content" key={index}>
                  {todolist.value}
                  <button className="edit" onClick={handleEdit}>
                    Edit
                  </button>
                  <button className="delete" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
                <br></br>
              </div>
            </>
          );
        })}
      </>
    </>
  );
};
export default Todo;
