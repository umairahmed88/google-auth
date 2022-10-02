import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginImg from "../../assets/login.png";
import "./styles.auth.scss";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const loginUser = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				toast.success("Login Successful...");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	const provider = new GoogleAuthProvider();
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				toast.success("Login successful with google");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			<div className='container auth'>
				<div className='img'>
					<img src={LoginImg} alt='Login' width={"400px"} />
				</div>
				<div className='form'>
					<h2>Login</h2>
					<form onSubmit={loginUser}>
						<input
							type='text'
							placeholder='Email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							placeholder='password'
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='submit' className='--btn --btn-primary --btn-block'>
							Login
						</button>
						<div className='links'>
							<Link to='/reset'>Reset</Link>
						</div>
						<p>-- or --</p>
						<button
							className='--btn --btn-danger --btn-block'
							onClick={signInWithGoogle}
						>
							<FaGoogle color='#fff' /> Login With Google
						</button>
						<span className='register'>
							<p>Don't have an account?</p>
							<Link to='/signup'>Sign Up</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
