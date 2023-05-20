import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import Spinner from "../../components/Spinner/Spinner";
import EditBook from "../../components/EditBook/EditBook";
import StoreContext from "../../context/StoreContextProvider";
import axios from "axios";
import "./DetailOfBookPage.css";

const DetailOfBookPage = () => {
	let { id } = useParams();
	let [book, setBook] = useState();
	let { auth } = useContext(StoreContext);

	useEffect(() => {
		let elToShow = document.querySelectorAll("#DetailOfBook .show-on-scroll");

		let isElInViewPort = (el) => {
			let rect = el.getBoundingClientRect();
			let viewHeight = window.innerHeight || document.documentElement.clientHeight;

			return (
				(rect.left <= 0 && rect.right >= 0) ||
				(rect.right >= viewHeight && rect.left <= viewHeight) ||
				(rect.left >= 0 && rect.right <= viewHeight)
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
	});

	let fetchData = async () => {
		let response = await axios.get(`http://localhost:4000/books/${id}`);
		setBook(response.data);
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div id="DetailOfBookPage">
			<h1>Chi tiết sách</h1>
			{book ? (
				<>
					<div className="book show-on-scroll top-to-bottom">
						<div className="header">
							<h1>{book.TenSach}</h1>
						</div>
						<div className="body">
							<p>
								<span>Tác giả:</span> <span>{book.TenTG}</span>
							</p>
							<p>
								<span>Thể loại: </span> <span>{book.TenTL}</span>
							</p>
							<p>
								<span>Số lượng:</span> <span>{book.SoLuong}</span>
							</p>
							<p>
								<span>Đơn giá:</span> <span>{book.DonGia}</span>
							</p>
						</div>
					</div>
				</>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default DetailOfBookPage;
