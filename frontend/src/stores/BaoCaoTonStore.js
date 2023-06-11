import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useBaoCaoTonStore = defineStore("BaoCaoTonStore", {
	state: () => ({
		listOfBaoCaoTon: [],
		bctID: "",
		bctThang: "",
		bctNam: "",
		detailPerBCT: [],
		loading: false,
		displayAddForm: false,
		displayDeleteForm: false,
	}),
	actions: {
		async getListOfBaoCaoTon() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangBaoCaoTon/danhSachBaoCaoTon");
				this.listOfBaoCaoTon = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangBaoCaoTon");
			}
			this.loading = false;
		},
		async getBaoCaoTonDetail() {
			this.loading = true;
			try {
				let res = await axios.get(`http://localhost:4000/trangBaoCaoTon/chiTietBaoCaoTon/${this.bctID}`, {
					params: {
						thang: this.bctThang,
						nam: this.bctNam,
					},
				});
				this.detailPerBCT = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangBaoCaoTon");
			}
			this.loading = false;
		},
		async addBaoCaoTon(bct) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBaoCaoTon.push(bct);
			try {
				axios.post(`http://localhost:4000/trangBaoCaoTon/danhSachBaoCaoTon`, bct);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Tạo báo cáo tồn thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Tạo báo cáo tồn thất bại!";
				console.log("Lỗi ở TrangBaoCaoTon");
			}
			this.loading = false;
		},
		async deleteBaoCaoTon() {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBaoCaoTon = this.listOfBaoCaoTon.filter((bct) => {
				return bct.MaBCT !== this.bctID;
			});
			try {
				axios.delete(`http://localhost:4000/trangBaoCaoTon/danhSachBaoCaoTon/${this.bctID}`);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Xóa báo cáo tồn thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Xóa báo cáo tồn thất bại!";
				console.log("Lỗi ở TrangBaoCaoTon");
			}
			this.loading = false;
		},
	},
});
