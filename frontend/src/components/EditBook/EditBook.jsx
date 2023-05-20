import { useState, useRef, useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./EditBook.css";

const EditBook = () => {
	let { setStatus, setMsg } = useContext(StoreContext);
	let [tenSach, setTenSach] = useState("");
	let [tenTacGia, setTenTacGia] = useState("");
	let [theLoai, setTheLoai] = useState("");
	let [soLuong, setSoLuong] = useState("");
	let [giaTien, setGiaTien] = useState("");
	let [bookID, setBookID] = useState("");
	let EditBook = useRef();

	let toggleEditBookPopup = (e) => {
		if (e.target === e.currentTarget) EditBook.current.classList.toggle("hide");
	};

	let fetchData = async () => {
		let bookResponse = await axios.get(`http://localhost:4000/addbook/books/${bookID}`);
		localStorage.setItem("ChinhSuaSach", JSON.stringify({ ...bookResponse.data }));
		setTenSach(JSON.parse(localStorage.getItem("ChinhSuaSach")).TenSach);
		setTenTacGia(JSON.parse(localStorage.getItem("ChinhSuaSach")).TenTG);
		setTheLoai(JSON.parse(localStorage.getItem("ChinhSuaSach")).TenTL);
		setSoLuong(JSON.parse(localStorage.getItem("ChinhSuaSach")).SoLuong);
		setGiaTien(JSON.parse(localStorage.getItem("ChinhSuaSach")).DonGia);
	};

	useEffect(() => {
		if (bookID !== "") fetchData();
	}, [bookID]);

	let handleSubmit = async (e) => {
		e.preventDefault();

		let newValues = { tenSach, tenTacGia, theLoai, soLuong, giaTien };

		try {
			let response = await axios.put(`http://localhost:4000/addbook/books/${bookID}`, newValues);
			setStatus("success");
			setMsg("Edit successed!");
		} catch (err) {
			setStatus("error");
			setMsg("Edit failed!");
		}

		EditBook.current.classList.add("hide");
	};

	setInterval(() => {
		const newValue = JSON.parse(localStorage.getItem("bookId"));
		setBookID(newValue);
	}, 1500);

	return (
		<div id="EditBook" className="hide" ref={EditBook} onClick={toggleEditBookPopup}>
			<form id="EditBookForm" onSubmit={handleSubmit}>
				<h1>Chỉnh sửa thông tin sách</h1>

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
					<input
						id="inputTheLoai"
						type="text"
						name="inputTheLoai"
						value={theLoai}
						onChange={(e) => {
							setTheLoai(e.target.value);
						}}
					/>
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
				<button>Lưu thay đổi</button>
			</form>
		</div>
	);
};

export default EditBook;
