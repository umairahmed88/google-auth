import React, { useEffect, useState } from "react";
import "./styles.header.scss";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
	REMOVE_ACTIVE_USER,
	SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogOut } from "../HiddenLinks/HiddenLink";

const Header = () => {
	const [displayName, setdisplayName] = useState("");
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const signoutUser = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logout successfully.");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == null) {
					const userOne = user.email.substring(0, user.email.indexOf("@"));
					const newUserName =
						userOne.charAt(0).toUpperCase() + userOne.slice(1);
					setdisplayName(newUserName);
				}
				setdisplayName(user.displayName);

				dispatch(
					SET_ACTIVE_USER({
						email: user.email,
						userName: user.displayName ? user.displayName : displayName,
						userID: user.uid,
					})
				);
			} else {
				setdisplayName("");
				dispatch(REMOVE_ACTIVE_USER());
			}
		});
	}, [dispatch]);

	return (
		<div className='main-header'>
			<h1>Google Auth</h1>
			<div className='options'>
				<a href='/'>Home</a>
				<a href='/contact'>Contact</a>
				<ShowOnLogOut>
					<a href='/login'>Login</a>
				</ShowOnLogOut>

				<a href='/signup'>SignUp</a>
				<ShowOnLogin>
					<a href='#home'>
						Hi
						<FaUserCircle size={16} />
						{displayName}
					</a>
					<a href='/signout' onClick={signoutUser}>
						Logout
					</a>
				</ShowOnLogin>
			</div>
		</div>
	);
};

export default Header;
