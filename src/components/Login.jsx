import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle SignUp
  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password || !gender) {
      const errMsg = "All fields are required!";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
  
    const signupPromise = axios.post(
      `${BASE_URL}/signup`,
      { firstName, lastName, emailId, password, gender },
      { withCredentials: true }
    );
  
    toast.promise(signupPromise, {
      loading: "Signing up... ⏳",
      success: "Signup successful! Redirecting to login... 🔄",
      error: "Signup failed. Please try again.",
    });
  
    try {
      const res = await signupPromise;
  
      if (res.status === 201) {
        console.log("✅ Signup successful, switching to login...");
        toast.success("Signup successful! Redirecting to login... 🔄", { duration: 4000 });
  
        // ✅ Clear form fields
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");
        setGender("");
        setError("");
  
        // ✅ Switch to Login mode
        setTimeout(() => {
          setIsLogin(true);
          console.log("✅ Switched to Login mode!");
        }, 500);
      }
    } catch (err) {
      const errorMessage = err.response?.data || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("❌ Signup error:", err);
    }
  };
  
  // Function to handle Login
  const handleLogin = async () => {
    if (!emailId || !password) {
      const errMsg = "Please enter both email and password.";
      setError(errMsg);
      toast.error(errMsg); // ✅ Show toast on missing credentials
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(addUser(res.data));
        toast.success("Login successful! Welcome back 🚀"); // ✅ Show success toast
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
        toast.error("Login failed. Please try again."); // ✅ Show error toast
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
      toast.error(errorMessage); // ✅ Show error toast
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center -my-3">
      <div className="card bg-base-300 w-96 shadow-xl" style={{ transform: "scale(0.9)" }}>
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login" : "Sign Up"}</h2>

          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <span className="label-text">Gender</span>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs my-2">
            <span className="label-text">Email ID</span>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs my-2">
            <span className="label-text">Password</span>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-[#de8735]">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary cursor-pointer"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="underline cursor-pointer text-center"
            onClick={() => {
              setError("");
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "New user? Sign Up" : "Already registered? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
