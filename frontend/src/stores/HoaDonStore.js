import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useHoaDonStore = defineStore("HoaDonStore", {
	state: () => ({
		listOfHoaDon: [],
		listOfSachHienCo: [],
		listOfSachDaChon: [],
		hoaDonID: "",
		detailPerHoaDon: {},
		displayListOfSachHienCo: true,
		displayListOfSachDaChon: false,
		displayDeleteForm: false,
		displayFormThanhToan: false,
		displayFormGhiNo: false,
		hoTenKhachHang: "",
		diaChi: "",
		sdt: "",
		email: "",
		tongTien: 0,
		tongSoLuongCuaCacSachDaChon: 0,
		loading: false,
	}),
	actions: {
		async getListOfHoaDon() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangHoaDon/danhSachHoaDon");
				this.listOfHoaDon = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
		async getHoaDonDetail() {
			this.loading = true;
			try {
				let res = await axios.get(`http://localhost:4000/trangHoaDon/danhSachHoaDon/${this.hoaDonID}`);
				this.detailPerHoaDon = res.data;
			} catch (err) {
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
		async addHoaDonThanhToan(hd) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfHoaDon.push(hd);
			try {
				axios.post("http://localhost:4000/trangHoaDon/danhSachHoaDon/addHoaDonThanhToan", hd);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Thêm hóa đơn thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Thêm hóa đơn thất bại!";
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
		async addHoaDonGhiNo(hd) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfHoaDon.push(hd);
			try {
				axios.post("http://localhost:4000/trangHoaDon/danhSachHoaDon/addHoaDonGhiNo", hd);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Thêm hóa đơn thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Thêm hóa đơn thất bại!";
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
		async deleteHoaDon() {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			this.listOfHoaDon = this.listOfHoaDon.filter((hoaDon) => {
				return hoaDon.MaHD !== this.hoaDonID;
			});
			try {
				axios.delete(`http://localhost:4000/trangHoaDon/danhSachHoaDon/${this.hoaDonID}`);
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Xóa hóa đơn thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Xóa hóa đơn thất bại!";
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
		async getListOfSachHienCo() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangSach/danhSachSach");
				this.listOfSachHienCo = res.data.map((sach) => {
					sach.soLuongMua = 0;
					return sach;
				});
			} catch (err) {
				console.log("Lỗi ở TrangHoaDon");
			}
			this.loading = false;
		},
	},
});
