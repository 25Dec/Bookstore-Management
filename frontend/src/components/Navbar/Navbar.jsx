import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDollar } from "react-icons/ai";
import { BiHome, BiSearch, BiLogIn, BiMessageSquareDots } from "react-icons/bi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { TbReportAnalytics, TbReportMoney } from "react-icons/tb";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import ToastNotification from "../ToastNotification/ToastNotification";
import StoreContext from "../../context/StoreContextProvider";
import "./Navbar.css";

const Navbar = () => {
	let { auth, setAuth, isAuthorized, setIsAuthorized, setStatus } = useContext(StoreContext);
	let navigate = useNavigate();

	let toggleSignIn = () => {
		let signInSection = document.getElementById("SignIn");
		signInSection.classList.toggle("hide");
	};

	return (
		<>
			<nav>
				<NavLink to="/" end>
					<BiHome />
				</NavLink>

				{auth.userRight === "ADMIN" || auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/addbook">
						<HiOutlineBookOpen />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "ADMIN" || auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/invoices">
						<RiBillLine />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "ADMIN" || auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/search" end>
						<BiSearch />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/payment" end>
						<AiOutlineDollar />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/reportRemaningStock" end>
						<TbReportAnalytics />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/reportAccountsReceivable" end>
						<TbReportMoney />
					</NavLink>
				) : (
					""
				)}

				{auth.userRight === "ADMIN" || auth.userRight === "SUPER_ADMIN" ? (
					<NavLink to="/setting" end>
						<FiSettings />
					</NavLink>
				) : (
					""
				)}

				<NavLink to="/contact" end>
					<BiMessageSquareDots />
				</NavLink>

				<a
					href="#"
					onClick={() => {
						if (isAuthorized) {
							setIsAuthorized(false);
							setAuth({});
							setStatus("signOut");
							localStorage.removeItem("account");
							navigate("/", { replace: true });
						} else toggleSignIn();
					}}
				>
					<BiLogIn />
				</a>

				{/* {isAuthorized ? (
					""
				) : (
					<a href="#" onClick={toggleSignUp}>
						<BiUserPlus />
					</a>
				)} */}
			</nav>
			<SignIn />
			<SignUp />
			<ToastNotification />
		</>
	);
};

export default Navbar;
