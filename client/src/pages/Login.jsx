import React, { useState } from 'react'
import { login } from '../Services/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const defaultValues = { email: "", password: "" }

    const [form, setForm] = useState(defaultValues);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Error occurred");
        }
        finally {
            setForm(defaultValues);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input className="border p-2 mb-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
                <input className="border p-2 mb-2 w-full" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="bg-green-500 text-white px-4 py-2 w-full">Login</button>
            </form>
            <div>
                <p>New User!</p>
                <span onClick={() => navigate("/register")} className='cursor-pointer'>Register</span>
            </div>
        </div>
    )
}

export default Login