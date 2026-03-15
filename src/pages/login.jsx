import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if(username === "testuser" && password === "Test123"){

      localStorage.setItem("auth","true");

      navigate("/list");
    } else {
      alert("Invalid credentials");
    }

  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}
