import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../../assets/register.png";
import "./styles.auth.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const signupUser = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Password do not match!");
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				toast.success("Registration Successful...");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			<div className='container auth'>
				<div className='form'>
					<h2>Sign Up</h2>
					<form onSubmit={signupUser}>
						<input
							type='text'
							placeholder='Email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Password'
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Confirm Password'
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button
							type='submit'
							className='--btn --btn-primary --btn-block'
							onClick={signupUser}
						>
							Sign Up
						</button>

						<span className='register'>
							<p>Already have an account?</p>
							<Link to='/login'>Login</Link>
						</span>
					</form>
				</div>
				<div className='img'>
					<img src={SignUpImg} alt='Login' width={"400px"} />
				</div>
			</div>
		</>
	);
};

export default Signup;
