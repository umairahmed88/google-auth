import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResetImg from "../../assets/forgot.png";
import "./styles.auth.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const Reset = () => {
	const [email, setEmail] = useState("");

	const resetPassword = (e) => {
		e.preventDefault();

		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success("Password send to your email");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			<div className='container auth'>
				<div className='img'>
					<img src={ResetImg} alt='Login' width={"400"} />
				</div>
				<div className='form'>
					<h2>Login</h2>
					<form onSubmit={resetPassword}>
						<input
							type='text'
							placeholder='Email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button type='submit' className='--btn --btn-primary --btn-block'>
							Reset
						</button>
						<div className='links'>
							<Link to='/login'>Login</Link>
							<Link to='/signup'>Sign Up</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Reset;
