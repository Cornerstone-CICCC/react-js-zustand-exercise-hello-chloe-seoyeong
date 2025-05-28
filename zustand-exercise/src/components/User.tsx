import { useState, type FormEvent, type ChangeEvent } from "react";
import { useUserStore, type IUser } from "../stores/user.store";

interface ICheckHobby {
  hobby: string;
  status: boolean;
}

const checkboxHobbies: ICheckHobby[] = [
  {
    hobby: "bouldering",
    status: false,
  },
  {
    hobby: "coding",
    status: false,
  },
  {
    hobby: "Singing",
    status: false,
  },
];

const User = () => {
  const { users, addUser, deleteUser } = useUserStore();
  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    firstname: "",
    lastname: "",
    age: 0,
    hobbies: [],
  });
  const [hobbyCheck, setHobbyCheck] = useState<ICheckHobby[]>([
    ...checkboxHobbies,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(formData);
    setFormData({
      firstname: "",
      lastname: "",
      age: 0,
      hobbies: [],
    });
    setHobbyCheck([...checkboxHobbies]);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { value, checked } = e.target;

    setHobbyCheck(
      hobbyCheck.map((h) =>
        h.hobby === value ? { ...h, status: !h.status } : h
      )
    );

    if (checked) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, value],
      });
    } else {
      setFormData({
        ...formData,
        hobbies: formData.hobbies.filter((hobby) => hobby !== value),
      });
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} {user.lastname} - {user.age} - hobbies:
            {user.hobbies.map((hobby, i) => (
              <span key={i}>
                {hobby}
                {user.hobbies.length - 1 > i ? ", " : ""}
              </span>
            ))}
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
          {hobbyCheck.map(({ hobby, status }, i) => (
            <div key={i}>
              <label htmlFor={hobby}>{hobby}</label>
              <input
                type="checkbox"
                value={hobby}
                id={hobby}
                name="hobby"
                checked={status}
                onChange={(e) => handleCheckboxChange(e)}
              />
            </div>
          ))}
        </fieldset>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default User;
