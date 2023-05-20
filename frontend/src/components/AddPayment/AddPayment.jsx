import { useState, useRef, useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./AddPayment.css";

const AddPayment = () => {
	let { setStatus, setMsg } = useContext(StoreContext);
	let getDateTime = () => {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};
	let ngayLapHoaDon = getDateTime();
	let [idKhachHang, setIdKhachHang] = useState("");
	let [hoTenKhachHang, setHoTenKhachHang] = useState("");
	let [diaChi, setDiaChi] = useState("");
	let [email, setEmail] = useState("");
	let [sdt, setSdt] = useState("");
	let [soTienThu, setSoTienThu] = useState("");
	let AddPayment = useRef();

	let toggleAddPaymentPopup = (e) => {
		if (e.target === e.currentTarget) AddPayment.current.classList.toggle("hide");
	};

	let handleSubmit = async (e) => {
		e.preventDefault();

		let newValues = { ngayLapHoaDon, idKhachHang, hoTenKhachHang, diaChi, email, sdt };

		try {
			let response = await axios.post(`http://localhost:4000/phieunhapsach`, newValues);

			setStatus("success");
			setMsg("Edit successed!");
		} catch (err) {
			setStatus("error");
			setMsg("Edit failed!");
		}

		AddPayment.current.classList.add("hide");
	};

	return (
		<div id="AddPayment" className="hide" ref={AddPayment} onClick={toggleAddPaymentPopup}>
			<form id="AddPaymentForm" onSubmit={handleSubmit}>
				<h1>Tạo phiếu thu tiền</h1>

				<div>
					<label htmlFor="inputNgayLapHoaDon">Ngày lập hóa đơn</label>
					<input id="inputNgayLapHoaDon" type="text" name="inputNgayLapHoaDon" value={ngayLapHoaDon} readOnly />
				</div>
				<div>
					<label htmlFor="inputIdKhachHang">ID Khách hàng</label>
					<input
						required
						id="inputIdKhachHang"
						type="text"
						name="inputIdKhachHang"
						value={idKhachHang}
						onChange={(e) => {
							setIdKhachHang(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="inputHoVaTenKhachHang">Họ và tên khách hàng</label>
					<input
						required
						id="inputHoVaTenKhachHang"
						type="text"
						name="inputHoVaTenKhachHang"
						value={hoTenKhachHang}
						onChange={(e) => {
							setHoTenKhachHang(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="inputDiaChi">Địa chỉ</label>
					<input
						required
						id="inputDiaChi"
						type="text"
						name="inputDiaChi"
						value={diaChi}
						onChange={(e) => {
							setDiaChi(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="inputEmail">Email</label>
					<input
						required
						id="inputEmail"
						type="text"
						name="inputEmail"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="inputSdt">Số điện thoại</label>
					<input
						required
						id="inputSdt"
						type="text"
						name="inputSdt"
						value={sdt}
						onChange={(e) => {
							setSdt(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="inputSoTienThu">Số tiền thu</label>
					<input
						required
						placeholder="VND"
						id="inputSoTienThu"
						type="text"
						name="inputSoTienThu"
						value={soTienThu}
						onChange={(e) => {
							setSoTienThu(e.target.value);
						}}
					/>
				</div>
				<button>Lưu</button>
			</form>
		</div>
	);
};

export default AddPayment;
