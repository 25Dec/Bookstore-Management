import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useCaiDatStore = defineStore("CaiDatStore", {
	state: () => ({
		luongTonToiThieuSauKhiBan: 0,
		luongTonToiThieuTruocKhiNhap: 0,
		soLuongNhapToiThieu: 0,
		suDungQuiDinh: false,
		tienNoToiDa: 0,
		loading: false,
		displayEditForm: false,
	}),
	actions: {
		async getThamSo() {
			this.loading = true;
			try {
				let res = await axios.get("http://localhost:4000/trangCaiDat/thamSo");

				this.luongTonToiThieuSauKhiBan = res.data[0].LuongTonToiThieuSauKhiBan;
				this.luongTonToiThieuTruocKhiNhap = res.data[0].LuongTonToiThieuTruocKhiNhap;
				this.soLuongNhapToiThieu = res.data[0].SoLuongNhapToiThieu;
				this.suDungQuiDinh = res.data[0].SuDungQuiDinh;
				this.tienNoToiDa = res.data[0].TienNoToiDa;
			} catch (err) {
				console.log("Lỗi ở TrangCaiDat");
			}
			this.loading = false;
		},
		async updateThamSo(data) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			try {
				this.luongTonToiThieuSauKhiBan = data.luongTonToiThieuSauKhiBan;
				this.luongTonToiThieuTruocKhiNhap = data.luongTonToiThieuTruocKhiNhap;
				this.soLuongNhapToiThieu = data.soLuongNhapToiThieu;
				this.suDungQuiDinh = data.suDungQuiDinh;
				this.tienNoToiDa = data.tienNoToiDa;

				axios.put(`http://localhost:4000/trangCaiDat/thamSo`, data);

				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Cập nhật các tham số thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Cập nhật các tham số thất bại!";
				console.log("Lỗi ở TrangCaiDat");
			}
			this.loading = false;
		},
	},
});
