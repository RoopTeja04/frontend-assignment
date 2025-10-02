import React, { useEffect, useState } from 'react'
import { getProfile, updateProfile, getTasks, createTask, updateTask, deleteTask } from "../Services/api"
import toast, { Toaster } from 'react-hot-toast'

const Dashboard = () => {
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [updateLoading, setUpdateLoading] = useState(false)

    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(true)
    const [newTask, setNewTask] = useState({ title: "", description: "" })
    const [editTaskId, setEditTaskId] = useState(null)
    const [editTaskForm, setEditTaskForm] = useState({ title: "", description: "" })
    const [createLoading, setCreateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(null)
    const [updateTaskLoading, setUpdateTaskLoading] = useState(false)

    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchProfile() {
            try {
                setProfileLoading(true)
                const { data } = await getProfile()
                setProfile(data)
                setForm({ name: data.name, email: data.email, password: "" })
            } catch (error) {
                toast.error('Failed to load profile')
            } finally {
                setProfileLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleUpdate = async () => {
        if (!form.name || !form.email) {
            toast.error('Name and email are required')
            return
        }

        try {
            setUpdateLoading(true)
            await updateProfile(form)
            const { data } = await getProfile()
            setProfile(data)
            setEditMode(false)
            toast.success('Profile updated successfully!')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setUpdateLoading(false)
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                setTasksLoading(true)
                const { data } = await getTasks()
                setTasks(data)
            } catch (error) {
                toast.error('Failed to load tasks')
            } finally {
                setTasksLoading(false)
            }
        }
        fetchTasks()
    }, [])

    const handleCreate = async () => {
        if (!newTask.title) {
            toast.error("Title is required")
            return
        }

        try {
            setCreateLoading(true)
            await createTask(newTask)
            const { data } = await getTasks()
            setTasks(data)
            setNewTask({ title: "", description: "" })
            toast.success('Task created successfully!')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create task')
        } finally {
            setCreateLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setDeleteLoading(id)
            await deleteTask(id)
            setTasks(tasks.filter(t => t._id !== id))
            toast.success('Task deleted successfully!')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task')
        } finally {
            setDeleteLoading(null)
        }
    }

    const handleEdit = (task) => {
        setEditTaskId(task._id)
        setEditTaskForm({ title: task.title, description: task.description })
    }

    const handleUpdateTask = async () => {
        if (!editTaskForm.title) {
            toast.error("Title is required")
            return
        }

        try {
            setUpdateTaskLoading(true)
            await updateTask(editTaskId, editTaskForm)
            const { data } = await getTasks()
            setTasks(data)
            setEditTaskId(null)
            setEditTaskForm({ title: "", description: "" })
            toast.success('Task updated successfully!')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update task')
        } finally {
            setUpdateTaskLoading(false)
        }
    }

    const filteredTasks = tasks.filter(
        (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10B981',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#EF4444',
                        },
                    },
                }}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">Welcome back! Manage your profile and tasks.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile Information
                        </h2>

                        {profileLoading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded w-32"></div>
                            </div>
                        ) : profile && (
                            <div className="max-w-2xl">
                                {!editMode ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="font-semibold text-gray-700 w-20">Name:</span>
                                            <span className="text-gray-900">{profile.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="font-semibold text-gray-700 w-20">Email:</span>
                                            <span className="text-gray-900">{profile.email}</span>
                                        </div>
                                        <button
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                                            onClick={() => setEditMode(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                                            <input
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                type="password"
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Leave blank to keep current"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                onClick={handleUpdate}
                                                disabled={updateLoading}
                                            >
                                                {updateLoading ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Saving...
                                                    </>
                                                ) : 'Save Changes'}
                                            </button>
                                            <button
                                                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                                                onClick={() => setEditMode(false)}
                                                disabled={updateLoading}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            My Tasks
                        </h2>

                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Search tasks by title or description..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h3>
                            <div className="flex flex-col md:flex-row gap-3">
                                <input
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Task title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    disabled={createLoading}
                                />
                                <input
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Task description"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    disabled={createLoading}
                                />
                                <button
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                                    onClick={handleCreate}
                                    disabled={createLoading}
                                >
                                    {createLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Task
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {tasksLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse bg-gray-100 p-6 rounded-xl">
                                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-lg font-medium">
                                    {search ? 'No tasks found matching your search' : 'No tasks yet. Create your first task!'}
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {filteredTasks.map((task) => (
                                    <li key={task._id} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                                        {editTaskId === task._id ? (
                                            <div className="space-y-4">
                                                <div className="flex flex-col md:flex-row gap-3">
                                                    <input
                                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                        value={editTaskForm.title}
                                                        onChange={(e) => setEditTaskForm({ ...editTaskForm, title: e.target.value })}
                                                        placeholder="Task title"
                                                        disabled={updateTaskLoading}
                                                    />
                                                    <input
                                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                        value={editTaskForm.description}
                                                        onChange={(e) => setEditTaskForm({ ...editTaskForm, description: e.target.value })}
                                                        placeholder="Task description"
                                                        disabled={updateTaskLoading}
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/30 disabled:opacity-50 flex items-center gap-2"
                                                        onClick={handleUpdateTask}
                                                        disabled={updateTaskLoading}
                                                    >
                                                        {updateTaskLoading ? (
                                                            <>
                                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Saving...
                                                            </>
                                                        ) : 'Save'}
                                                    </button>
                                                    <button
                                                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                                        onClick={() => setEditTaskId(null)}
                                                        disabled={updateTaskLoading}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{task.title}</h3>
                                                    <p className="text-gray-600">{task.description || 'No description'}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
                                                        onClick={() => handleEdit(task)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/30 disabled:opacity-50 flex items-center gap-2"
                                                        onClick={() => handleDelete(task._id)}
                                                        disabled={deleteLoading === task._id}
                                                    >
                                                        {deleteLoading === task._id ? (
                                                            <>
                                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Deleting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Delete
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard