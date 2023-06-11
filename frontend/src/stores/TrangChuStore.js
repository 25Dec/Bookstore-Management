import { defineStore } from "pinia";
import axios from "axios";

export const useTrangChuStore = defineStore("TrangChuStore", {
	state: () => ({
		tongTienHoaDonDaLap: 0,
		tongTienThuDuocThucTe: 0,
		soLuongKhachHang: 0,
		tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap: [],
		soLuongSach: 0,
		soLuongTheLoai: 0,
		soLuongKhachDangNo: 0,
		loading: false,
	}),
	actions: {
		async getData() {
			this.loading = true;
			try {
				let res1 = await axios.get("http://localhost:4000/trangChu/tongTienHoaDonDaLap");
				this.tongTienHoaDonDaLap = res1.data[0].TongTienHoaDonDaLap;

				let res2 = await axios.get("http://localhost:4000/trangChu/tongTienThuDuocThucTeTuHoaDon");
				let res3 = await axios.get("http://localhost:4000/trangChu/tongTienThuDuocThucTeTuPhieuThuTien");
				this.tongTienThuDuocThucTe =
					res2.data[0].TongTienThuDuocThucTeTuHoaDon + res3.data[0].TongTienThuDuocThucTeTuPhieuThuTien;

				let res4 = await axios.get("http://localhost:4000/trangChu/soLuongKhachHang");
				this.soLuongKhachHang = res4.data[0].SoLuongKhachHang;

				let res5 = await axios.get("http://localhost:4000/trangChu/tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap");
				this.tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap = res5.data;

				let res6 = await axios.get("http://localhost:4000/trangChu/soLuongSach");
				this.soLuongSach = res6.data[0].SoLuongSach;

				let res7 = await axios.get("http://localhost:4000/trangChu/soLuongTheLoai");
				this.soLuongTheLoai = res7.data[0].SoLuongTheLoai;

				let res8 = await axios.get("http://localhost:4000/trangChu/soLuongKhachDangNo");
				this.soLuongKhachDangNo = res8.data[0].SoLuongKhachDangNo;
			} catch (err) {
				console.log("Lỗi ở TrangChu");
			}
			this.loading = false;
		},
	},
});
