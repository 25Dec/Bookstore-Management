import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import TrangDangNhap from "../views/TrangDangNhap/TrangDangNhap.vue";
import TrangChu from "../views/TrangChu/TrangChu.vue";
import TrangSach from "../views/TrangSach/TrangSach.vue";
import TrangTraCuu from "../views/TrangTraCuu/TrangTraCuu.vue";
import TrangHoaDon from "../views/TrangHoaDon/TrangHoaDon.vue";
import TrangLapHoaDon from "../views/TrangHoaDon/TrangLapHoaDon.vue";
import TrangChiTietHoaDon from "../views/TrangHoaDon/TrangChiTietHoaDon.vue";
import TrangThuTien from "../views/TrangThuTien/TrangThuTien.vue";
import TrangBaoCaoTon from "../views/TrangBaoCaoTon/TrangBaoCaoTon.vue";
import TrangChiTietBaoCaoTon from "../views/TrangBaoCaoTon/TrangChiTietBaoCaoTon.vue";
import TrangBaoCaoCongNo from "../views/TrangBaoCaoCongNo/TrangBaoCaoCongNo.vue";
import TrangChiTietBaoCaoCongNo from "../views/TrangBaoCaoCongNo/TrangChiTietBaoCaoCongNo.vue";
import TrangCaiDat from "../views/TrangCaiDat/TrangCaiDat.vue";

const roles = ["SUPER_ADMIN", "STAFF"];

const requireAuth = (to, from, next) => {
	let authStore = useAuthStore();
	let userRight = authStore.auth.userRight;
	let condition = roles.some((role) => {
		return userRight == role;
	});

	if (!condition) {
		next({ name: "TrangDangNhap" });
	} else {
		next();
	}
};

const routes = [
	{
		path: "/",
		redirect: "/trangdangnhap",
	},
	{
		path: "/trangdangnhap",
		name: "TrangDangNhap",
		component: TrangDangNhap,
	},
	{
		path: "/trangchu",
		name: "TrangChu",
		component: TrangChu,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangsach",
		name: "TrangSach",
		component: TrangSach,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangtracuu",
		name: "TrangTraCuu",
		component: TrangTraCuu,
	},
	{
		path: "/tranghoadon",
		name: "TrangHoaDon",
		component: TrangHoaDon,
		beforeEnter: requireAuth,
	},
	{
		path: "/tranghoadon/detail/:id",
		name: "TrangChiTietHoaDon",
		component: TrangChiTietHoaDon,
		beforeEnter: requireAuth,
	},
	{
		path: "/tranglaphoadon",
		name: "TrangLapHoaDon",
		component: TrangLapHoaDon,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangthutien",
		name: "TrangThuTien",
		component: TrangThuTien,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangbaocaoton",
		name: "TrangBaoCaoTon",
		component: TrangBaoCaoTon,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangbaocaoton/detail/:id",
		name: "TrangChiTietBaoCaoTon",
		component: TrangChiTietBaoCaoTon,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangbaocaocongno",
		name: "TrangBaoCaoCongNo",
		component: TrangBaoCaoCongNo,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangbaocaocongno/detail/:id",
		name: "TrangChiTietBaoCaoCongNo",
		component: TrangChiTietBaoCaoCongNo,
		beforeEnter: requireAuth,
	},
	{
		path: "/trangcaidat",
		name: "TrangCaiDat",
		component: TrangCaiDat,
		beforeEnter: requireAuth,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
