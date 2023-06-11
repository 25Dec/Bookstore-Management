import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useSachStore = defineStore("SachStore", {
	state: () => ({
		listOfBooks: [],
		listOfCategories: [],
		bookID: "",
		detailPerBook: {},
		loading: false,
		displayAddForm: false,
		displayDeleteForm: false,
		displayEditForm: false,
	}),
	actions: {
		async getListOfBooks() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangSach/danhSachSach");
				this.listOfBooks = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangSach");
			}
			this.loading = false;
		},
		async getListOfCategories() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/theloai");
				this.listOfCategories = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangSach");
			}
			this.loading = false;
		},
		async getBookDetail() {
			try {
				if (this.bookID != "") {
					let res = await axios.get(`http://localhost:4000/trangSach/books/${this.bookID}`);
					this.detailPerBook = res.data;
				} else this.detailPerBook = {};
			} catch (err) {
				console.log("Lỗi ở TrangSach");
			}
		},
		async addBook(book) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBooks.push(book);
			try {
				await axios.post(`http://localhost:4000/trangSach/books/addPhieuNhapSach`, book);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Tạo phiếu nhập sách thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Tạo phiếu nhập sách thất bại!";
				console.log("Lỗi ở TrangSach");
			}
			this.loading = false;
		},
		async deleteBook() {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBooks = this.listOfBooks.filter((book) => {
				return book.MaSach !== this.bookID;
			});
			try {
				await axios.delete(`http://localhost:4000/trangSach/books/${this.bookID}`);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Xóa sách thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Xóa sách thất bại!";
				console.log("Lỗi ở TrangSach");
			}
			this.loading = false;
		},
		async editBook(bookDetail) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBooks = this.listOfBooks.map((sach) => {
				if (bookDetail.MaSach == sach.MaSach) {
					sach.TenSach = bookDetail.TenSach;
					sach.TenTG = bookDetail.TenTG;
					sach.TenTL = bookDetail.TenTL;
				}
				return sach;
			});

			try {
				axios.put(`http://localhost:4000/trangSach/books/${this.bookID}`, bookDetail);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Chỉnh sửa sách thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Chỉnh sửa sách thất bại!";
				console.log("Lỗi ở TrangSach");
			}
			this.loading = false;
		},
	},
});
