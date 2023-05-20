import { useState, useEffect, useContext } from "react";
import EditProfile from "../../components/EditProfile/EditProfile";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./SettingPage.css";

const SettingPage = () => {
	let { auth, setStatus, setMsg, thamSo, setThamSo } = useContext(StoreContext);
	let [soLuongNhapToiThieu, setSoLuongNhapToiThieu] = useState(
		JSON.parse(localStorage.getItem("danhSachThamSo")).SoLuongNhapToiThieu
	);
	let [luongTonToiThieuTruocKhiNhap, setLuongTonToiThieuTruocKhiNhap] = useState(
		JSON.parse(localStorage.getItem("danhSachThamSo")).LuongTonToiThieuTruocKhiNhap
	);
	let [tienNoToiDa, setTienNoToiDa] = useState(JSON.parse(localStorage.getItem("danhSachThamSo")).TienNoToiDa);
	let [luongTonToiThieuSauKhiBan, setLuongTonToiThieuSauKhiBan] = useState(
		JSON.parse(localStorage.getItem("danhSachThamSo")).LuongTonToiThieuSauKhiBan
	);
	let [suDungQuiDinh, setSuDingQuiDinh] = useState(JSON.parse(localStorage.getItem("danhSachThamSo")).SuDungQuiDinh);
	let [isSubmited, setIsSubmited] = useState(false);

	useEffect(() => {
		let elToShow = document.querySelectorAll("#SettingPage .show-on-scroll");

		let isElInViewPort = (el) => {
			let rect = el.getBoundingClientRect();
			let viewHeight = window.innerHeight || document.documentElement.clientHeight;

			return (
				(rect.top <= 0 && rect.bottom >= 0) ||
				(rect.bottom >= viewHeight && rect.top <= viewHeight) ||
				(rect.top >= 0 && rect.bottom <= viewHeight)
			);
		};

		function loop() {
			elToShow.forEach((item) => {
				if (isElInViewPort(item)) {
					item.classList.add("start");
				} else {
					item.classList.remove("start");
				}
			});
		}

		window.onscroll = loop;

		loop();
	}, []);

	let toggleEditProfile = () => {
		let editProfileSection = document.getElementById("EditProfile");
		editProfileSection.classList.toggle("hide");
	};

	let fetchData = async () => {
		try {
			let danhSachThamSoResponse = await axios.get("http://localhost:4000/thamso");
			localStorage.setItem("danhSachThamSo", JSON.stringify(danhSachThamSoResponse.data[0]));
			setThamSo(danhSachThamSoResponse.data[0]);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
		setSoLuongNhapToiThieu(JSON.parse(localStorage.getItem("danhSachThamSo")).SoLuongNhapToiThieu);
		setLuongTonToiThieuTruocKhiNhap(JSON.parse(localStorage.getItem("danhSachThamSo")).LuongTonToiThieuTruocKhiNhap);
		setTienNoToiDa(JSON.parse(localStorage.getItem("danhSachThamSo")).TienNoToiDa);
		setLuongTonToiThieuSauKhiBan(JSON.parse(localStorage.getItem("danhSachThamSo")).LuongTonToiThieuSauKhiBan);
		setSuDingQuiDinh(JSON.parse(localStorage.getItem("danhSachThamSo")).SuDungQuiDinh);
	}, []);

	useEffect(() => {
		fetchData();
		setSoLuongNhapToiThieu(thamSo.SoLuongNhapToiThieu);
		setLuongTonToiThieuTruocKhiNhap(thamSo.LuongTonToiThieuTruocKhiNhap);
		setTienNoToiDa(thamSo.TienNoToiDa);
		setLuongTonToiThieuSauKhiBan(thamSo.LuongTonToiThieuSauKhiBan);
		setSuDingQuiDinh(thamSo.SuDungQuiDinh);
	}, [isSubmited]);

	let handleSubmitForm = async (e) => {
		e.preventDefault();
		let newValues = {
			soLuongNhapToiThieu: parseInt(soLuongNhapToiThieu),
			luongTonToiThieuTruocKhiNhap: parseInt(luongTonToiThieuTruocKhiNhap),
			tienNoToiDa: parseInt(tienNoToiDa),
			luongTonToiThieuSauKhiBan: parseInt(luongTonToiThieuSauKhiBan),
			suDungQuiDinh: parseInt(suDungQuiDinh),
		};
		console.log(newValues);

		try {
			await axios.put(`http://localhost:4000/thamso`, newValues);
			localStorage.setItem(
				"danhSachThamSo",
				JSON.stringify(
					soLuongNhapToiThieu,
					luongTonToiThieuTruocKhiNhap,
					tienNoToiDa,
					luongTonToiThieuSauKhiBan,
					suDungQuiDinh
				)
			);
			setIsSubmited(true);
			setStatus("success");
		} catch (e) {
			setStatus("error");
			setMsg("Chỉnh sửa thất bại!");
		}
	};

	window.addEventListener("storage", function (event) {
		if (event.key === "danhSachThamSo") {
			setSoLuongNhapToiThieu(thamSo.SoLuongNhapToiThieu);
			setLuongTonToiThieuTruocKhiNhap(thamSo.LuongTonToiThieuTruocKhiNhap);
			setTienNoToiDa(thamSo.TienNoToiDa);
			setLuongTonToiThieuSauKhiBan(thamSo.LuongTonToiThieuSauKhiBan);
			setSuDingQuiDinh(thamSo.SuDungQuiDinh);
		}
	});

	return (
		<div id="SettingPage">
			<h1>Cài đặt</h1>
			<div className="ProfileCard show-on-scroll left-to-right">
				<div>
					<p>
						<span>Họ:</span> <span>{auth.lastName}</span>
					</p>
					<p>
						<span>Tên:</span> <span>{auth.firstName}</span>
					</p>
					<p>
						<span>Email: </span>
						<span>{auth.email}</span>
					</p>
				</div>
				<button onClick={toggleEditProfile}>Chỉnh sửa</button>
			</div>
			{auth.userRight === "SUPER_ADMIN" ? (
				<form className="SettingCard show-on-scroll right-to-left" onSubmit={handleSubmitForm}>
					<div>
						<div>
							<label htmlFor="soLuongNhapToiThieu">Số lượng nhập tối thiểu</label>
							<input
								id="soLuongNhapToiThieu"
								type="number"
								name="soLuongNhapToiThieu"
								value={soLuongNhapToiThieu}
								min={1}
								onChange={(e) => {
									setSoLuongNhapToiThieu(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="luongTonToiThieuTruocKhiNhap">Lượng tồn tối thiểu trước khi nhập</label>
							<input
								id="luongTonToiThieuTruocKhiNhap"
								type="number"
								name="luongTonToiThieuTruocKhiNhap"
								value={luongTonToiThieuTruocKhiNhap}
								min={1}
								onChange={(e) => {
									setLuongTonToiThieuTruocKhiNhap(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="tienNoToiDa">Tiền nợ tối đa</label>
							<input
								id="tienNoToiDa"
								type="number"
								name="tienNoToiDa"
								value={tienNoToiDa}
								min={1}
								onChange={(e) => {
									setTienNoToiDa(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="luongTonToiThieuSauKhiBan">Lượng tồn tối thiểu sau khi bán</label>
							<input
								id="luongTonToiThieuSauKhiBan"
								type="number"
								name="luongTonToiThieuSauKhiBan"
								value={luongTonToiThieuSauKhiBan}
								min={1}
								onChange={(e) => {
									setLuongTonToiThieuSauKhiBan(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="suDungQuiDinh">Sử dụng qui định</label>
							<input
								type="radio"
								name="suDungQuiDinh"
								id="option-1"
								checked={suDungQuiDinh === 1 ? true : false}
								onChange={() => {
									console.log("Co");
									setSuDingQuiDinh(1);
								}}
							/>
							<input
								type="radio"
								name="suDungQuiDinh"
								id="option-2"
								checked={suDungQuiDinh !== 0 ? false : true}
								onChange={() => {
									console.log("Khong");
									setSuDingQuiDinh(0);
								}}
							/>
							<label htmlFor="option-1" className="option option-1">
								<div className="dot"></div>
								<span>Có</span>
							</label>
							<label htmlFor="option-2" className="option option-2">
								<div className="dot"></div>
								<span>Không</span>
							</label>
						</div>
					</div>
					<button
						onClick={() => {
							localStorage.setItem(
								"danhSachThamSo",
								JSON.stringify({
									soLuongNhapToiThieu,
									luongTonToiThieuTruocKhiNhap,
									tienNoToiDa,
									luongTonToiThieuSauKhiBan,
									suDungQuiDinh,
								})
							);
						}}
					>
						Lưu thay đổi
					</button>
				</form>
			) : (
				""
			)}
			<EditProfile />
		</div>
	);
};

export default SettingPage;
