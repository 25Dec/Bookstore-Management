import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import DetailOfBookPage from "./pages/DetailOfBookPage/DetailOfBookPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import ContactPage from "./pages/ContactPage/ContactPage";
import ReportRemaningStockPage from "./pages/ReportRemaningStockPage/ReportRemaningStockPage";
import ReportAccountReceivablePage from "./pages/ReportAccountsReceivablePage/ReportAccountsReceivablePage";
import NotFound from "./pages/NotFound/NotFound";
import SettingPage from "./pages/SettingPage/SettingPage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import InvoicesPage from "./pages/InvoicesPage/InvoicesPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./components/Layout/Layout";

const ROLES = {
	SUPER_ADMIN: "SUPER_ADMIN",
	ADMIN: "ADMIN",
};

const App = () => {
	window.onunload = () => {
		localStorage.removeItem("account");
	};

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />

					<Route path="/contact" element={<ContactPage />} />

					<Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />}>
						<Route path="/books/:id" element={<DetailOfBookPage />} />
						<Route path="/search" element={<SearchPage />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/setting" element={<SettingPage />} />
					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN]} />}>
						<Route path="/addbook" element={<AddBookPage />} />
						<Route path="/invoices" element={<InvoicesPage />} />
						<Route path="/payment" element={<PaymentPage />} />
						<Route path="/reportRemaningStock" element={<ReportRemaningStockPage />} />
						<Route path="/reportAccountsReceivable" element={<ReportAccountReceivablePage />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
