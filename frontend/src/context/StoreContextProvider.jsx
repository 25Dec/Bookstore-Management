import { createContext, useState } from "react";

const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
	let [auth, setAuth] = useState({});
	let [isAuthorized, setIsAuthorized] = useState(false);
	let [booksHome, setBooksHome] = useState([]);
	let [booksAddBook, setBooksAddBook] = useState([]);
	let [booksSearchBook, setBooksSearchBook] = useState([]);
	let [bookEditBook, setBookEditBook] = useState([]);
	let [status, setStatus] = useState("");
	let [msg, setMsg] = useState("");
	let [bookId, setBookId] = useState("");
	let [thamSo, setThamSo] = useState({});
	let [danhSachTheLoai, setDanhSachTheLoai] = useState([]);

	return (
		<StoreContext.Provider
			value={{
				auth,
				setAuth,
				isAuthorized,
				setIsAuthorized,
				booksHome,
				setBooksHome,
				booksAddBook,
				setBooksAddBook,
				booksSearchBook,
				setBooksSearchBook,
				bookEditBook,
				setBookEditBook,
				status,
				setStatus,
				msg,
				setMsg,
				bookId,
				setBookId,
				thamSo,
				setThamSo,
				danhSachTheLoai,
				setDanhSachTheLoai,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;
