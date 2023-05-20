import { useState, useRef, useContext, useEffect } from "react";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./DeletePayment.css";

const DeletePayment = () => {
	let { setStatus, setMsg } = useContext(StoreContext);
	let [paymentID, setPaymentID] = useState("");
	let DeletePayment = useRef();

	let toggleDeletePaymentPopup = (e) => {
		if (e.target === e.currentTarget) DeletePayment.current.classList.toggle("hide");
	};

	// setInterval(() => {
	// 	const newValue = JSON.parse(localStorage.getItem("bookId"));
	// 	setPaymentID(newValue);
	// }, 1000);

	let handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// await axios.delete(`http://localhost:4000/addbook/books/${bookID}`);

			setStatus("success");
			setMsg("Edit successed!");
		} catch (err) {
			setStatus("error");
			setMsg("Edit failed!");
		}

		DeletePayment.current.classList.add("hide");
	};

	return (
		<div id="DeletePayment" className="hide" ref={DeletePayment} onClick={toggleDeletePaymentPopup}>
			<form id="DeletePaymentForm" onSubmit={handleSubmit}>
				<div id="header">
					<h1>Xóa phiếu thu tiền?</h1>
				</div>
				<div id="body">
					<p>Bạn có chắc chắn muốn xóa phiếu thu tiền này không?</p>
					<p>Hành động này không thể hoàn tác và bạn sẽ không thể khôi phục bất kỳ dữ liệu nào.</p>
				</div>
				<div id="footer">
					<button type="submit">Có</button>
					<button type="button" onClick={toggleDeletePaymentPopup}>
						Không
					</button>
				</div>
			</form>
		</div>
	);
};

export default DeletePayment;
