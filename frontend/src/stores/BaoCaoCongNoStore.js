import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useBaoCaoCongNoStore = defineStore("BaoCaoCongNoStore", {
	state: () => ({
		listOfBaoCaoCongNo: [],
		bccnID: "",
		bccnThang: "",
		bccnNam: "",
		detailPerBCCN: [],
		loading: false,
		displayAddForm: false,
		displayDeleteForm: false,
	}),
	actions: {
		async getListOfBaoCaoCongNo() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangBaoCaoCongNo/danhSachBaoCaoCongNo");
				this.listOfBaoCaoCongNo = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangBaoCaoCongNo");
			}
			this.loading = false;
		},
		async getBaoCaoCongNoDetail() {
			this.loading = true;
			try {
				let res = await axios.get(`http://localhost:4000/trangBaoCaoCongNo/chiTietBaoCaoCongNo/${this.bctID}`, {
					params: {
						thang: this.bccnThang,
						nam: this.bccnNam,
					},
				});
				this.detailPerBCCN = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangBaoCaoCongNo");
			}
			this.loading = false;
		},
		async addBaoCaoCongNo(bccn) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBaoCaoCongNo.push(bccn);
			try {
				axios.post(`http://localhost:4000/trangBaoCaoCongNo/danhSachBaoCaoCongNo`, bccn);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Tạo báo cáo công nợ thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Tạo báo cáo công nợ thất bại!";
				console.log("Lỗi ở TrangBaoCaoCongNo");
			}
			this.loading = false;
		},
		async deleteBaoCaoCongNo() {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfBaoCaoCongNo = this.listOfBaoCaoCongNo.filter((bccn) => {
				return bccn.MaBCCN !== this.bccnID;
			});
			try {
				axios.delete(`http://localhost:4000/trangBaoCaoCongNo/danhSachBaoCaoCongNo/${this.bccnID}`);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Xóa báo cáo công nợ thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Xóa báo cáo công nợ thất bại!";
				console.log("Lỗi ở TrangBaoCaoCongNo");
			}
			this.loading = false;
		},
	},
});
