import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useThuTienStore = defineStore("ThuTienStore", {
	state: () => ({
		listOfPhieuThuTien: [],
		detailPerPhieuThuTien: {},
		maPhieuThuTien: "",
		loading: false,
		displayAddForm: false,
		displayDeleteForm: false,
	}),
	actions: {
		async getListOfPhieuThuTien() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangThuTien/danhSachPhieuThuTien");
				this.listOfPhieuThuTien = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangThuTien");
			}
			this.loading = false;
		},
		async getPhieuThuTienDetail() {
			this.loading = true;
			try {
				let res = await axios.get(`http://localhost:4000/trangThuTien/danhSachPhieuThuTien/${this.maPhieuThuTien}`);
				this.detailPerPhieuThuTien = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangThuTien");
			}
			this.loading = false;
		},
		async addPhieuThuTien(ptt) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfPhieuThuTien = this.listOfPhieuThuTien.map((phieuThuTien) => {
				if (phieuThuTien.MaPhieuThuTien == ptt.MaPhieuThuTien) {
					console.log(phieuThuTien);
					phieuThuTien.SoTienDaThu = ptt.SoTienDaThu;
					phieuThuTien.ConLai = ptt.ConLai;
				}
				return phieuThuTien;
			});
			try {
				axios.put(`http://localhost:4000/trangThuTien/danhSachPhieuThuTien/${this.maPhieuThuTien}`, ptt);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Thu nợ thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Thu nợ thất bại!";
				console.log("Lỗi ở TrangThuTien");
			}
			this.loading = false;
		},
		async deletePhieuThuTien() {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			try {
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Xóa phiếu thu tiền thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Xóa phiếu thu tiền thất bại!";
				console.log("Lỗi ở TrangThuTien");
			}
			this.loading = false;
		},
	},
});
