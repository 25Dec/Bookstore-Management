import { useState, useRef, useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./DeleteBook.css";

const DeleteBook = () => {
	let { setStatus, setMsg } = useContext(StoreContext);
	let [tenSach, setTenSach] = useState("");
	let [bookID, setBookID] = useState("");
	let DeleteBook = useRef();

	let toggleDeleteBookPopup = (e) => {
		if (e.target === e.currentTarget) DeleteBook.current.classList.toggle("hide");
	};

	let fetchData = async () => {
		let bookResponse = await axios.get(`http://localhost:4000/addbook/books/${bookID}`);
		localStorage.setItem("ChinhSuaSach", JSON.stringify({ ...bookResponse.data }));
		setTenSach(JSON.parse(localStorage.getItem("ChinhSuaSach")).TenSach);
	};

	useEffect(() => {
		if (bookID !== "") fetchData();
	}, [bookID]);

	setInterval(() => {
		const newValue = JSON.parse(localStorage.getItem("bookId"));
		setBookID(newValue);
	}, 1000);

	let handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.delete(`http://localhost:4000/addbook/books/${bookID}`);

			setStatus("success");
			setMsg("Edit successed!");
		} catch (err) {
			setStatus("error");
			setMsg("Edit failed!");
		}

		DeleteBook.current.classList.add("hide");
	};

	return (
		<div id="DeleteBook" className="hide" ref={DeleteBook} onClick={toggleDeleteBookPopup}>
			<form id="DeleteBookForm" onSubmit={handleSubmit}>
				<div id="header">
					<h1>Xóa sách?</h1>
				</div>
				<div id="body">
					<p>
						Bạn có chắc chắn muốn xóa &quot;<b>{tenSach}</b>&quot; không?
					</p>
					<p>Hành động này không thể hoàn tác và bạn sẽ không thể khôi phục bất kỳ dữ liệu nào.</p>
				</div>
				<div id="footer">
					<button type="submit">Có</button>
					<button type="button" onClick={toggleDeleteBookPopup}>
						Không
					</button>
				</div>
			</form>
		</div>
	);
};

export default DeleteBook;
