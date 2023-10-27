import React, { useState } from "react";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { LuClipboardEdit } from "react-icons/lu";

function Todolist() {
  const [data, setData] = useState("");
  const [user, setUser] = useState([]);
  const [editData, setEditData] = useState({ id: null, item: "" });

  const handleonChange = (e) => {
    setData(e.target.value);
  };

  const submit = () => {
    if (data) {
      setUser([
        ...user,
        { item: data, id: new Date().getSeconds().toString() },
      ]);
      setData("");
    } else {
      alert("Please enter a todo item.");
    }
  };

  const remove = (key) => {
    const reducedList = user.filter((item) => item.id !== key);
    setUser(reducedList);
  };

  const removeAll = () => {
    setUser([]);
  };

  const edit = (key) => {
    const itemToEdit = user.find((item) => item.id === key);
    if (itemToEdit) {
      setEditData({ id: key, item: itemToEdit.item });
    }
  };

  const update = (key) => {
    const updatedata = user.map((item) => {
      if (item.id === key) {
        return { ...item, item: editData.item };
      }
      return item;
    });
    setUser(updatedata);
    setEditData({ id: null, item: "" });
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-back my-4">
          TodoList Progress
        </h1>
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-lg">
          <div className="mb-4">
            <div className="flex items-center">
              <input
                className="background text-white w-full py-2 px-3 border border-gray-300 rounded"
                placeholder="Enter Your Todo Here"
                type="text"
                value={editData.id === null ? data : editData.item}
                onChange={(e) => {
                  editData.id === null
                    ? handleonChange(e)
                    : setEditData({ ...editData, item: e.target.value });
                }}
              />
              <button
                className="ml-2 py-2 px-3 bg-green-500 text-white rounded cursor-pointer"
                onClick={() => {
                  editData.id === null ? submit() : update(editData.id);
                }}
              >
                {editData.id === null ? <AiOutlinePlus /> : "Update"}
              </button>
            </div>
          </div>
          {user.map((e, id) => (
            <div
              className="bg-img mb-4 py-2 px-3 border border-gray-300 rounded flex justify-between"
              key={id}
            >
              <h2>{e.item}</h2>
              <div className="flex justify-between w-32">
                <button
                  className="py-2 px-3 bg-blue-500 text-white rounded cursor-pointer"
                  onClick={() => edit(e.id)}
                >
                  <LuClipboardEdit />
                </button>
                <button
                  className="py-2 px-3 bg-red-500 text-white rounded cursor-pointer"
                  onClick={() => remove(e.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          {user.length >= 2 && (
            <button
              className="mt-4 py-2 px-3 bg-red-500 text-white rounded cursor-pointer"
              onClick={removeAll}
            >
              Remove All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todolist;
