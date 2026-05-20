import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

    const searchUsers = useCallback(() => {
    if (!search) return fetchUsers();

    API.get(`/users/search?keyword=${search}`)
      .then(res => setUsers(res.data.data))
      .catch(err => console.error(err));
  },[search]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    mikrotikUsername: "",
    packageId: ""
  });

  useEffect(() => {
    fetchUsers();
    fetchPackages();
  }, []);

  const fetchUsers = () => {
    API.get("/users")
      .then(res => setUsers(res.data.data))
      .catch(err => console.error(err));
  };
  const fetchPackages = () => {
  API.get("/packages")
    .then(res => setPackages(res.data.data))
    .catch(err => console.error(err));
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/users", form)
      .then(() => {
        alert("User created!");
        fetchUsers(); // refresh list
      })
      .catch(err => {
        alert(err.response?.data?.message || "Error");
      });
  };
    const toggleStatus = (user) => {
    const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const confirmAction = window.confirm(
      `Set ${user.name} to ${newStatus}?`
    );

    if (!confirmAction) return;

    API.put(`/users/${user.id}/status?status=${newStatus}`)
      .then(() => {
        fetchUsers();
      })
      .catch(err => console.error(err));
  };
  // eslint-disable-next-line
  useEffect(() => {
    const delay = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchUsers]);

  const resetSearchUser = () =>{
    setSearch("");
    fetchUsers();
  }


return (
  <div>
    <Navbar />
    <h2>Users</h2>

    <div className="card">
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="mikrotikUsername" placeholder="Username" onChange={handleChange} />

        <select name="packageId" onChange={handleChange}>
          <option value="">Select Package</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.price}৳
            </option>
          ))}
        </select>

        <button type="submit">Add User</button>
      </form>
    </div>

      <div className="card">
        <h3>Search Users</h3>

        <input
          placeholder="Search by phone or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchUsers}>Search</button>
        <button onClick={resetSearchUser}>Reset</button>
    </div>

    <div className="card">
      <h3>User List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Package</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.mikrotikUsername}</td>
              <td>{u.packageName}</td>
              {u.status === "ACTIVE" ? <td style={{color:"green"}}>ACTIVE</td> : 
                <td style={{color:"red"}}>INACTIVE</td>}
              <td>
                <button onClick={() => toggleStatus(u)}>
                  {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
); 
}

export default Users;