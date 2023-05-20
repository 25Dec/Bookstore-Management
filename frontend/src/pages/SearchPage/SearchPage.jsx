import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/StoreContextProvider";
import Spinner from "../../components/Spinner/Spinner";
import DeleteBook from "../../components/DeleteBook/DeleteBook";
import "./SearchPage.css";

const Search = () => {
	let { booksSearchBook } = useContext(AuthContext);
	let [bookResults, setBookResults] = useState(booksSearchBook);
	let [nameOfBook, setNameOfBook] = useState("");
	let [author, setAuthor] = useState("");
	let [categories, setCategories] = useState([
		{
			name: "Văn học",
			value: "vanhoc",
			checked: false,
		},
		{
			name: "Khoa học",
			value: "khoahoc",
			checked: false,
		},
		{
			name: "Lịch sử",
			value: "lichsu",
			checked: false,
		},
		{
			name: "Tâm lý",
			value: "tamly",
			checked: false,
		},
		{
			name: "Thiếu nhi",
			value: "thieunhi",
			checked: false,
		},
		{
			name: "Kinh tế",
			value: "kinhte",
			checked: false,
		},
		{
			name: "Truyện tranh",
			value: "truyentranh",
			checked: false,
		},
		{
			name: "Tôn giáo",
			value: "tongiao",
			checked: false,
		},
		{
			name: "Tiểu thuyết",
			value: "tieuthuyet",
			checked: false,
		},
		{
			name: "Hài hước",
			value: "haihuoc",
			checked: false,
		},
		{
			name: "Hồi ký",
			value: "hoiky",
			checked: false,
		},
		{
			name: "Phiêu lưu",
			value: "phieuluu",
			checked: false,
		},
		{
			name: "Kỹ năng sống",
			value: "kynangsong",
			checked: false,
		},
		{
			name: "Sách giáo trình",
			value: "sachgiaotrinh",
			checked: false,
		},
		{
			name: "Trinh thám",
			value: "trinhtham",
			checked: false,
		},
		{
			name: "Tiểu sử",
			value: "tieusu",
			checked: false,
		},
		{
			name: "Du lịch",
			value: "dulich",
			checked: false,
		},
		{
			name: "Y học",
			value: "yhoc",
			checked: false,
		},
		{
			name: "Tâm linh",
			value: "tamlinh",
			checked: false,
		},
		{
			name: "Học đường",
			value: "hocduong",
			checked: false,
		},
	]);

	useEffect(() => {
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
	});

	useEffect(() => {
		let options = categories.filter((category) => {
			return category.checked === true;
		});

		// 0-0-0
		if (nameOfBook.trim() === "" && author.trim() === "" && options.length === 0) setBookResults(booksSearchBook);
		// 0-0-1
		else if (nameOfBook.trim() === "" && author.trim() === "" && options.length !== 0) {
			let arr = [];

			for (let book of booksSearchBook) {
				for (let option of options) {
					if (book.TenTL === option.name) arr.push(book);
				}
			}

			setBookResults(arr);
		}
		// 0-1-0 && 1-0-0 && 1-1-0
		else if (
			(nameOfBook.trim() === "" && author.trim() !== "" && options.length === 0) ||
			(nameOfBook.trim() !== "" && author.trim() === "" && options.length === 0) ||
			(nameOfBook.trim() !== "" && author.trim() !== "" && options.length === 0)
		) {
			let search1 = booksSearchBook.filter((book) => {
				if (book.bookName.toLowerCase().includes(nameOfBook.toLowerCase().trim())) return book;
			});

			let search2 = search1.filter((book) => {
				if (book.authorName.toLowerCase().includes(author.toLowerCase().trim())) return book;
			});

			setBookResults(search2);
		}
		// 0-1-1 && 1-0-1 && 1-1-1
		else if (
			(nameOfBook.trim() === "" && author.trim() !== "" && options.length !== 0) ||
			(nameOfBook.trim() !== "" && author.trim() === "" && options.length !== 0) ||
			(nameOfBook.trim() !== "" && author.trim() !== "" && options.length !== 0)
		) {
			let arr = [];

			for (let book of booksSearchBook) {
				for (let option of options) {
					if (book.TenTL === option.name) arr.push(book);
				}
			}

			let search1 = arr.filter((book) => {
				if (book.TenSach.toLowerCase().includes(nameOfBook.toLowerCase().trim())) return book;
			});

			let search2 = search1.filter((book) => {
				if (book.TenTG.toLowerCase().includes(author.toLowerCase().trim())) return book;
			});

			setBookResults(search2);
		}
	}, [nameOfBook, author, categories]);

	return (
		<div id="SearchPage">
			<h1 className="title">TRA CỨU</h1>
			<div className="options">
				<div className="inputs">
					<div>
						<label htmlFor="inputNameOfBook">Tên sách</label>
						<input
							id="inputNameOfBook"
							type="text"
							placeholder="Nhập tên sách"
							value={nameOfBook}
							onChange={(e) => {
								setNameOfBook(e.target.value);
							}}
						/>
					</div>

					<div>
						<label htmlFor="inputAuthor">Tên tác giả</label>
						<input
							id="inputAuthor"
							type="text"
							placeholder="Nhập tên tác giả"
							value={author}
							onChange={(e) => {
								setAuthor(e.target.value);
							}}
						/>
					</div>
				</div>
				<label htmlFor="categories">Thể loại</label>
				<div id="categories">
					{categories.map((category, index) => {
						return (
							<div className="category" key={index}>
								<input
									id={index}
									type="checkbox"
									value={category.value}
									checked={category.checked}
									onChange={(e) => {
										setCategories(
											categories.map((category, index) => {
												if (index == e.target.id) category.checked = !category.checked;
												return category;
											})
										);
									}}
								/>
								<label htmlFor={index}>{category.name}</label>
							</div>
						);
					})}
				</div>
			</div>
			{booksSearchBook ? (
				<>
					<div className="results">
						{bookResults.map((book, index) => {
							return (
								<div
									key={book.MaSach}
									className={index % 2 === 0 ? "row show-on-scroll left-to-right" : "row show-on-scroll right-to-left"}
								>
									<div>
										<a>{book.TenSach}</a>
										<span
											className={
												categories.find((category) => {
													if (category.name === book.TenTL) return category;
												}).value
											}
										>
											{book.TenTL}
										</span>
									</div>
									<p>Tác giả: {book.TenTG}</p>
									<p>Số lượng: {book.SoLuong}</p>
								</div>
							);
						})}
					</div>
					<DeleteBook />
				</>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default Search;
