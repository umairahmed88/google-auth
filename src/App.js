import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Contact, Home, Login, Reset, Signup } from "./pages/pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Header />
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/reset' element={<Reset />} />
			</Routes>
		</>
	);
}

export default App;
