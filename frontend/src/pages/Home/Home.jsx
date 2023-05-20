import { useState, useEffect, useContext, useMemo } from "react";
import StoreContext from "../../context/StoreContextProvider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { HOMECOLUMNS } from "../../../../frontend2/src/components/HomeColumns";
import logo from "../../assets/imgs/logo3.jpg";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import "./Home.css";

const Home = () => {
	let { auth } = useContext(StoreContext);
	let [tongTien, setTongTien] = useState(0);
	let [tongTienThangNay, setTongTienThangNay] = useState(0);
	let [tongTienTuanNay, setTongTienTuanNay] = useState(0);
	let [tongSach, setTongSach] = useState(0);
	let [tongKhachHang, setTongKhachHang] = useState(0);
	let [danhSachSach, setDanhSachSach] = useState(Object.values(JSON.parse(localStorage.getItem("danhSSHome"))));
	let columns = useMemo(() => HOMECOLUMNS, []);
	let data = useMemo(() => danhSachSach, []);

	let {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		pageOptions,
		state,
		setPageSize,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		usePagination
	);

	let { pageIndex, pageSize } = state;

	useEffect(() => {
		let elToShow = document.querySelectorAll("#Home .show-on-scroll");
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

	let fetchAPI = async () => {
		let tongTienResponse = await axios.get("http://localhost:4000/home/statbox/tongtien");
		setTongTien(tongTienResponse.data[0].TongTien);

		let tongTienThangNayResponse = await axios.get("http://localhost:4000/home/statbox/thangnay");
		setTongTienThangNay(tongTienThangNayResponse.data[0].SoLuongKhachHang);

		let tongTienTuanNayResponse = await axios.get("http://localhost:4000/home/statbox/tuannay");
		setTongTienTuanNay(tongTienTuanNayResponse.data[0].TongTienTuanNay);

		let tongSachResponse = await axios.get("http://localhost:4000/home/statbox/tongsach");
		setTongSach(tongSachResponse.data[0].SoLuongSach);

		let tongKhachHangResponse = await axios.get("http://localhost:4000/home/statbox/tongkhachhang");
		setTongKhachHang(tongKhachHangResponse.data[0].SoLuongKhachHang);

		let danhSachSachRespone = await axios.get("http://localhost:4000/home/danhsachsach");
		setDanhSachSach(danhSachSachRespone.data);

		localStorage.setItem("tongTien", JSON.stringify({ ...tongTienResponse.data[0] }));
		localStorage.setItem("tongTienThangNay", JSON.stringify({ ...tongTienThangNayResponse.data[0] }));
		localStorage.setItem("tongTienTuanNay", JSON.stringify({ ...tongTienTuanNayResponse.data[0] }));
		localStorage.setItem("tongSach", JSON.stringify({ ...tongSachResponse.data[0] }));
		localStorage.setItem("tongKhachHang", JSON.stringify({ ...tongKhachHangResponse.data[0] }));
		localStorage.setItem("danhSSHome", JSON.stringify({ ...danhSachSachRespone.data }));
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<>
			{auth.userRight === "ADMIN" || auth.userRight === undefined ? (
				<div id="Home" className="guest">
					<div className="show-on-scroll top-to-bottom">
						<h1>
							<img src={logo} alt="logo" />
						</h1>
						<h1>Reading Makes Perfect</h1>
					</div>
				</div>
			) : (
				<div id="Home" className="sadmin">
					<h1>Trang chủ</h1>
					<div id="StatBoxes">
						<div>
							<p>Tổng tiền</p>
							<h2>{tongTien ? tongTien : "No data found"}</h2>
							<AccountBalanceWalletIcon />
						</div>
						<div>
							<p>Tháng này</p>
							<h2>{tongTienThangNay ? tongTienThangNay : "No data found"}</h2>
							<CalendarMonthIcon />
						</div>
						<div>
							<p>Tuần này</p>
							<h2>{tongTienTuanNay ? tongTienTuanNay : "No data found"}</h2>
							<DateRangeIcon />
						</div>
						<div>
							<p>Sách</p>
							<h2>{tongSach ? tongSach : "No data found"}</h2>
							<BookIcon />
						</div>
						<div>
							<p>Khách hàng</p>
							<h2>{tongKhachHang ? tongKhachHang : "No data found"}</h2>
							<GroupIcon />
						</div>
					</div>
					<div id="ListOfBooks">
						<table {...getTableProps()}>
							<thead>
								{headerGroups.map((headerGroup, index) => (
									<tr {...headerGroup.getHeaderGroupProps()} key={index}>
										{headerGroup.headers.map((column, idx) => (
											<th {...column.getHeaderProps()} key={idx}>
												{column.render("Header")}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{page.map((row, index) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()} key={index}>
											{row.cells.map((cell, idx) => {
												return (
													<td {...cell.getCellProps()} className={idx === 1 ? "bookName" : ""} key={idx}>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<Box id="tablePagination" width="100%" display="flex" justifyContent="space-between" alignItems="center">
							<Box>
								<Box>
									Rows per page:{" "}
									<select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
										{[5, 10, 25].map((pageSize) => (
											<option key={pageSize} value={pageSize}>
												{pageSize}
											</option>
										))}
									</select>
								</Box>
								<Box>
									<span>
										Page{" "}
										<strong>
											{pageIndex + 1} of {pageOptions.length}
										</strong>{" "}
									</span>
								</Box>
								<Box>
									<button onClick={() => previousPage()} disabled={!canPreviousPage}>
										{"<"}
									</button>{" "}
									<button onClick={() => nextPage()} disabled={!canNextPage}>
										{">"}
									</button>{" "}
								</Box>
							</Box>
							<Link to="/addbook">
								<Button
									sx={{
										color: "black",
										fontSize: "14px",
										fontWeight: "bold",
										padding: "10px 20px",
										marginTop: "20px",
									}}
								>
									Xem thêm
								</Button>
							</Link>
						</Box>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
