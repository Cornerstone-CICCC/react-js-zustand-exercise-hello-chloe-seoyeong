import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUserStore, type IUser } from "../stores/user.store";

const User = () => {
  const { users, addUser, deleteUser } = useUserStore();
  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    firstname: "",
    lastname: "",
    age: 0,
    hobbies: [],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(formData);
    setFormData({
      firstname: "",
      lastname: "",
      age: 0,
      hobbies: [],
    });
  };

  const handleHobbiesCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("eeee");
    if (e.target.checked) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, e.target.name],
      });
    } else {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies],
      });
    }
  };
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} {user.lastname} - {user.age} - hobbies:{" "}
            {/* {user.hobbies.map((hobby) => (
              <span>{hobby}</span>
            ))} */}
            {user.hobbies}
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Enter Firstname..."
          style={{ padding: "8px" }}
          type="text"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />
        <input
          placeholder="Enter Lastname..."
          style={{ padding: "8px" }}
          type="text"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />
        <input
          placeholder="Enter Age..."
          style={{ padding: "8px" }}
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: Number(e.target.value) })
          }
        />
        <fieldset>
          <legend>Choose your hobbies:</legend>
          <div>
            <label htmlFor="bouldering">Bouldering</label>
            <input
              type="checkbox"
              id="bouldering"
              name="bouldering"
              onClick={() => handleHobbiesCheck}
            />
          </div>
          <div>
            <label htmlFor="walking">Walking</label>
            <input
              type="checkbox"
              id="walking"
              name="walking"
              onClick={() => handleHobbiesCheck}
            />
          </div>
          <div>
            <label htmlFor="coding">Coding</label>
            <input
              type="checkbox"
              id="coding"
              name="coding"
              onClick={() => handleHobbiesCheck}
            />
          </div>{" "}
          <div>
            <label htmlFor="eating">eating</label>
            <input
              type="checkbox"
              id="eating"
              name="eating"
              onClick={() => handleHobbiesCheck}
            />
          </div>
        </fieldset>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default User;
