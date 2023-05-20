import { useEffect, useContext, useState } from "react";
import { RiEditBoxLine, RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import StoreContext from "../../context/StoreContextProvider";
import AddBook from "../../components/AddBook/AddBook";
import EditBook from "../../components/EditBook/EditBook";
import DeleteBook from "../../components/DeleteBook/DeleteBook";
import axios from "axios";
import "./AddBookPage.css";

const AddBookPage = () => {
	let { auth, booksAddBook, setBookId } = useContext(StoreContext);
	let [books, setBooks] = useState(booksAddBook);

	let fetchData = async () => {
		let booksResponse = await axios.get("http://localhost:4000/addbook/danhsachsach");
		localStorage.setItem("danhSSAddBook", JSON.stringify({ ...booksResponse.data }));
		setBooks(booksResponse.data);
	};

	useEffect(() => {
		fetchData();

		let elToShow = document.querySelectorAll(".show-on-scroll");

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

	let toggleAddBook = () => {
		let addBookSection = document.getElementById("AddBook");
		addBookSection.classList.toggle("hide");
	};

	let toggleEditBook = () => {
		let editBookSection = document.getElementById("EditBook");
		editBookSection.classList.toggle("hide");
	};

	let toggleDeleteBook = () => {
		let deleteBookSection = document.getElementById("DeleteBook");
		deleteBookSection.classList.toggle("hide");
	};

	let convertDateTime = (str) => {
		const date = new Date(str);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<div id="AddBookPage">
			<h1>Nhập sách</h1>
			<div
				id="addBookIcon"
				className="add"
				onClick={() => {
					toggleAddBook();
				}}
			>
				<FaPlus />
			</div>

			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Tên sách</th>
						<th>Thể loại</th>
						<th>Tác giả</th>
						<th>Số lượng</th>
						<th>Đơn giá</th>
						<th>Ngày nhập</th>
						{auth.userRight === "SUPER_ADMIN" ? <th>Chỉnh sửa / Xóa</th> : ""}
					</tr>
				</thead>
				<tbody>
					{books ? (
						<>
							{books.map((book, index) => {
								return (
									<tr
										key={book.MaSach}
										className={
											index % 2 === 0 ? "row show-on-scroll left-to-right" : "row show-on-scroll right-to-left"
										}
									>
										<td className="no">{index + 1}</td>
										<td className="bookName">{book.TenSach}</td>
										<td className="category">{book.TenTL}</td>
										<td className="authorName">{book.TenTG}</td>
										<td className="quantity">{book.SoLuong}</td>
										<td className="price">{book.DonGia}</td>
										<td className="date">{convertDateTime(book.NgayNhapSach)}</td>
										{auth.userRight === "SUPER_ADMIN" ? (
											<td className="modify">
												<RiEditBoxLine
													className="edit"
													onClick={() => {
														toggleEditBook();
														setBookId(book.MaSach);
														localStorage.setItem("bookId", JSON.stringify(book.MaSach));
													}}
												/>{" "}
												/
												<RiDeleteBinLine
													className="delete"
													onClick={() => {
														toggleDeleteBook();
														setBookId(book.MaSach);
														localStorage.setItem("bookId", JSON.stringify(book.MaSach));
													}}
												/>
											</td>
										) : (
											""
										)}
									</tr>
								);
							})}
						</>
					) : (
						""
					)}
				</tbody>
			</table>
			<AddBook />
			<EditBook />
			<DeleteBook />
			<div></div>
		</div>
	);
};

export default AddBookPage;
