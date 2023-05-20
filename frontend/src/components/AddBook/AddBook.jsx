import { useState, useRef, useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./AddBook.css";

const AddBook = () => {
	let { setStatus, setMsg, danhSachTheLoai } = useContext(StoreContext);
	let [tenSach, setTenSach] = useState("");
	let [tenTacGia, setTenTacGia] = useState("");
	let [theLoai, setTheLoai] = useState("");
	let [soLuong, setSoLuong] = useState("");
	let [giaTien, setGiaTien] = useState("");
	let AddBook = useRef();

	let toggleAddBookPopup = (e) => {
		if (e.target === e.currentTarget) AddBook.current.classList.toggle("hide");
	};

	let handleSubmit = async (e) => {
		e.preventDefault();

		let newValues = { tenSach, tenTacGia, theLoai, soLuong, giaTien };
		console.log(newValues);

		try {
			let response = await axios.post(`http://localhost:4000/phieunhapsach`, newValues);

			setStatus("success");
			setMsg("Edit successed!");
		} catch (err) {
			setStatus("error");
			setMsg("Edit failed!");
		}

		AddBook.current.classList.add("hide");
	};

	return (
		<div id="AddBook" className="hide" ref={AddBook} onClick={toggleAddBookPopup}>
			<form id="AddBookForm" onSubmit={handleSubmit}>
				<h1>Tạo phiếu nhập sách</h1>

				<div>
					<label htmlFor="tenSach">Tên sách</label>
					<input
						id="inputTenSach"
						type="text"
						name="inputTenSach"
						value={tenSach}
						onChange={(e) => {
							setTenSach(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="tenTacGia">Tên tác giả</label>
					<input
						id="inputTenTacGia"
						type="text"
						name="inputTenTacGia"
						value={tenTacGia}
						onChange={(e) => {
							setTenTacGia(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="theLoai">Thể loại</label>
					<select
						name="selectTheLoai"
						id="selectTheLoai"
						onChange={(e) => {
							setTheLoai(e.target.value);
						}}
					>
						{JSON.parse(localStorage.getItem("danhSachTheLoai")).map((theLoai, index) => {
							return (
								<option key={index} value={theLoai.TenTL}>
									{theLoai.TenTL}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<label htmlFor="soLuong">Số lượng</label>
					<input
						id="inputSoLuong"
						type="number"
						name="inputSoLuong"
						value={soLuong}
						min={1}
						onChange={(e) => {
							setSoLuong(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor="giaTien">Giá tiền</label>
					<input
						id="inputGiaTien"
						type="number"
						name="inputGiaTien"
						value={giaTien}
						min={1}
						onChange={(e) => {
							setGiaTien(e.target.value);
						}}
					/>
				</div>
				<button>Lưu</button>
			</form>
		</div>
	);
};

export default AddBook;
