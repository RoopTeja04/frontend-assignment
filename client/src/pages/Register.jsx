import React, { useState } from 'react'
import { signup } from '../Services/api'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const defaultValues = { name: "", email: "", password: "" }

    const [form, setForm] = useState(defaultValues);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form);
            alert("Registered successfully!");
            navigate("/");
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
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input className="border p-2 mb-2 w-full" name="name" placeholder="Name" onChange={handleChange} />
                <input className="border p-2 mb-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
                <input className="border p-2 mb-2 w-full" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="bg-blue-500 text-white px-4 py-2 w-full">Register</button>
            </form>
            <div>
                <p>Already Have an Account !</p>
                <span onClick={() => navigate("/")} className='cursor-pointer'>Login</span>
            </div>
        </div>
    )
}

export default Register