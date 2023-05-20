import { useEffect, useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import StoreContext from "../../context/StoreContextProvider";
import AddPayment from "../../components/AddPayment/AddPayment";
import DeletePayment from "../../components/DeletePayment/DeletePayment";
import axios from "axios";
import "./ReportRemaningStockPage.css";

const ReportRemaningStockPage = () => {
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

	let toggleAddPayment = () => {
		let addPaymentSection = document.getElementById("AddPayment");
		addPaymentSection.classList.toggle("hide");
	};

	let toggleDeletePayment = () => {
		let deletePaymentSection = document.getElementById("DeletePayment");
		deletePaymentSection.classList.toggle("hide");
	};

	return (
		<div id="ReportRemaningStockPage">
			<h1>Báo cáo tồn</h1>
			<div
				id="addReportRemaningStockIcon"
				className="add"
				onClick={() => {
					toggleAddPayment();
				}}
			>
				<FaPlus />
			</div>

			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Tên báo cáo</th>
						<th>Tháng</th>
						<th>Năm</th>
						{auth.userRight === "SUPER_ADMIN" ? <th>Xóa</th> : ""}
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
										<td className="fullName">{book.TenSach}</td>
										<td className="address">{book.TenTL}</td>
										<td className="email">{book.TenTG}</td>
										{auth.userRight === "SUPER_ADMIN" ? (
											<td className="modify">
												<RiDeleteBinLine
													className="delete"
													onClick={() => {
														toggleDeletePayment();
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
			<AddPayment />
			<DeletePayment />
			<div></div>
		</div>
	);
};

export default ReportRemaningStockPage;
