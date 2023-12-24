import React, { useEffect } from "react";
import { supabase } from "../createClient";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", age: "" });
  const [user1, setUser1] = useState({ id: "", name: "", age: "" });
  console.log(user1);
  console.log(user);
  useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers() {
    const { data } = await supabase.from("user").select("*");
    setUsers(data);
  }
  const handleChange = (e) => {
    setUser((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const handleChange1 = (e) => {
    setUser1((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };
  async function createUser(e) {
    e.preventDefault();
    try {
      console.log("function called");
      await supabase.from("user").insert({ name: user.name, age: user.age });
      setTimeout(5000);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }
  async function deleteUser(userId) {
    const { data, error } = await supabase
      .from("user")
      .delete()
      .eq("id", userId);
    fetchUsers();
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  }
  async function displayUser(userId) {
    const foundUser = users.find((user) => user.id === userId);

    if (foundUser) {
      setUser1({ id: foundUser.id, name: foundUser.name, age: foundUser.age });
    }
  }

  async function updateUser(userId, e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("user")
        .update({ id: user1.id, name: user1.name, age: user1.age })
        .eq("id", userId);

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
      }

      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  }

  return (
    <div className="container border mt-5">
      <form onSubmit={createUser}>
        {/**form 1 */}
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputage" className="form-label">
            age
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputAge"
            onChange={handleChange}
            name="age"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>

      {/**form 2 */}
      <form onSubmit={() => updateUser(user1.id, e)}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            onChange={handleChange1}
            name="name"
            defaultValue={user1.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputage" className="form-label">
            age
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputAge"
            onChange={handleChange1}
            name="age"
            defaultValue={user1.age}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    displayUser(user.id);
                  }}
                >
                  update
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
