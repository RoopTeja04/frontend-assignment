import React from 'react'
import { useEffect, useState } from "react";
import { getProfile, updateProfile, getTasks, createTask, updateTask, deleteTask } from "../Services/api";

const Dashboard = () => {

    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskForm, setEditTaskForm] = useState({ title: "", description: "" });

    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await getProfile();
            setProfile(data);
            setForm({ name: data.name, email: data.email, password: "" });
        }
        fetchProfile();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        await updateProfile(form);
        setEditMode(false);
        const { data } = await getProfile();
        setProfile(data);
    };

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await getTasks();
            setTasks(data);
        }
        fetchTasks();
    }, []);

    const handleCreate = async () => {
        if (!newTask.title) return alert("Title required");
        await createTask(newTask);
        const { data } = await getTasks();
        setTasks(data);
        setNewTask({ title: "", description: "" });
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(t => t._id !== id));
    };

    const handleEdit = (task) => {
        setEditTaskId(task._id);
        setEditTaskForm({ title: task.title, description: task.description });
    };

    const handleUpdateTask = async () => {
        await updateTask(editTaskId, editTaskForm);
        const { data } = await getTasks();
        setTasks(data);
        setEditTaskId(null);
        setEditTaskForm({ title: "", description: "" });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {profile && (
                <div className="mt-4 bg-gray-100 p-4 rounded shadow w-96">
                    {!editMode ? (
                        <>
                            <p><b>Name:</b> {profile.name}</p>
                            <p><b>Email:</b> {profile.email}</p>
                            <button className="mt-2 bg-blue-500 text-white px-4 py-2" onClick={() => setEditMode(true)}>Edit Profile</button>
                        </>
                    ) : (
                        <div>
                            <input className="border p-2 mb-2 w-full" name="name" value={form.name} onChange={handleChange} />
                            <input className="border p-2 mb-2 w-full" name="email" value={form.email} onChange={handleChange} />
                            <input className="border p-2 mb-2 w-full" type="password" name="password" placeholder="New Password" onChange={handleChange} />
                            <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handleUpdate}>Save</button>
                            <button className="bg-gray-400 px-4 py-2" onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            )}

            <input
                className="border p-2 mt-4 w-1/2"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h2 className="text-xl font-bold mt-6">My Tasks</h2>
            <div className="mt-2 flex gap-2">
                <input
                    className="border p-2"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    className="border p-2"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button className="bg-blue-500 text-white px-4" onClick={handleCreate}>
                    Add
                </button>
            </div>

            <ul className="mt-4">
                {tasks
                    .filter(
                        (t) =>
                            t.title.toLowerCase().includes(search.toLowerCase()) ||
                            t.description.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((task) => (
                        <li key={task._id} className="bg-gray-100 p-2 mb-2 rounded">
                            {editTaskId === task._id ? (
                                <div className="flex gap-2">
                                    <input
                                        className="border p-2 flex-1"
                                        value={editTaskForm.title}
                                        onChange={(e) => setEditTaskForm({ ...editTaskForm, title: e.target.value })}
                                    />
                                    <input
                                        className="border p-2 flex-1"
                                        value={editTaskForm.description}
                                        onChange={(e) => setEditTaskForm({ ...editTaskForm, description: e.target.value })}
                                    />
                                    <button className="bg-green-500 text-white px-3" onClick={handleUpdateTask}>
                                        Save
                                    </button>
                                    <button className="bg-gray-400 text-white px-3" onClick={() => setEditTaskId(null)}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <b>{task.title}</b> - {task.description}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="bg-yellow-500 text-white px-2" onClick={() => handleEdit(task)}>
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white px-2" onClick={() => handleDelete(task._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
            </ul>
        </div >
    )
}

export default Dashboard