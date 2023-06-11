import { defineStore } from "pinia";
import axios from "axios";

export const useTraCuuStore = defineStore("TraCuuStore", {
	state: () => ({
		listOfBooks: [],
		loading: false,
	}),
	actions: {
		async getListOfBooks() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangTraCuu/danhSachSach");
				this.listOfBooks = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangTraCuu");
			}
			this.loading = false;
		},
		async updateListOfBooks(data) {
			this.listOfBooks = data;
		},
	},
});
