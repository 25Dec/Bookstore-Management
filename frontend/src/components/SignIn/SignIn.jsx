import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./SignIn.css";

const SignIn = () => {
	let {
		setAuth,
		setIsAuthorized,
		setBooksHome,
		setBooksAddBook,
		setBooksSearchBook,
		setThamSo,
		setStatus,
		setMsg,
		setDanhSachTheLoai,
	} = useContext(StoreContext);
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);
	let SignIn = useRef();
	let navigate = useNavigate();

	let handleShowIconShowPassword = (e) => {
		let iconShowPassword = e.target.nextElementSibling;
		if (e.target.value === "") iconShowPassword.style.display = "none";
		else iconShowPassword.style.display = "block";
		setPassword(e.target.value);
	};

	let handleClickShowPassword = () => {
		setIsShowPassword(!isShowPassword);
	};

	let toggleSignInPopup = (e) => {
		if (e.target === e.currentTarget) SignIn.current.classList.toggle("hide");
	};

	let handleSignIn = async (e) => {
		e.preventDefault();

		try {
			let accountResponse = await axios.post(
				"https://userbookbackendapi.herokuapp.com/v1/login",
				JSON.stringify({ loginName: username, password }),
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			setAuth(accountResponse.data);
			setIsAuthorized(true);
			localStorage.setItem("account", JSON.stringify({ ...accountResponse.data }));

			let danhSSHomeResponse = await axios.get("http://localhost:4000/home/danhsachsach");
			setBooksHome(danhSSHomeResponse.data);
			localStorage.setItem("danhSSHome", JSON.stringify({ ...danhSSHomeResponse.data }));

			let danhSSAddBookResponse = await axios.get("http://localhost:4000/addbook/danhsachsach");
			localStorage.setItem("danhSSAddBook", JSON.stringify({ ...danhSSAddBookResponse.data }));
			setBooksAddBook(danhSSAddBookResponse.data);

			let danhSSSearchBookResponse = await axios.get("http://localhost:4000/search/danhsachsach");
			localStorage.setItem("danhSSSearchBook", JSON.stringify({ ...danhSSSearchBookResponse.data }));
			setBooksSearchBook(danhSSAddBookResponse.data);

			let danhSachThamSoResponse = await axios.get("http://localhost:4000/thamso");
			localStorage.setItem("danhSachThamSo", JSON.stringify(danhSachThamSoResponse.data[0]));
			setThamSo(danhSachThamSoResponse.data[0]);

			let danhSachTheLoaiResponse = await axios.get("http://localhost:4000/theloai");
			localStorage.setItem("danhSachTheLoai", JSON.stringify(danhSachTheLoaiResponse.data));
			setDanhSachTheLoai(danhSachTheLoaiResponse.data);

			setUsername("");
			setPassword("");
			setStatus("signIn");
			localStorage.setItem("status", JSON.stringify("success"));
			localStorage.setItem("msg", JSON.stringify("Đăng nhập thành công!"));
			SignIn.current.classList.add("hide");
			navigate("/", { replace: true });
		} catch (err) {
			setStatus("error");
			setMsg("Login failed!");
			localStorage.setItem("status", JSON.stringify("error"));
			localStorage.setItem("msg", JSON.stringify("Đăng nhập không thành công!"));
		}
	};

	return (
		<div id="SignIn" className="hide" ref={SignIn} onClick={toggleSignInPopup}>
			<div id="SignInForm">
				<form onSubmit={handleSignIn}>
					<table>
						<thead>
							<tr>
								<th colSpan={2}>
									<p>ĐĂNG NHẬP</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan={2}>
									<span className="icon username">
										<AiOutlineUser />
									</span>
									<input
										type="text"
										placeholder="Username"
										required
										id="inputUserName"
										value={username}
										onChange={(e) => {
											setUsername(e.target.value);
										}}
									/>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<span className="icon password">
										<AiOutlineLock />
									</span>
									<input
										type={isShowPassword ? "text" : "password"}
										placeholder="Password"
										required
										id="inputPassword"
										value={password}
										onChange={handleShowIconShowPassword}
									/>
									<span className="icon showPassword" onClick={handleClickShowPassword}>
										{isShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
									</span>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<button>Đăng nhập</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
