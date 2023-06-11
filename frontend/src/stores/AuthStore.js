import { defineStore } from "pinia";
import { useThongBaoStore } from "./ThongBaoStore";
import axios from "axios";

export const useAuthStore = defineStore("AuthStore", {
	state: () => ({
		auth: {},
		isAuthorized: false,
		loading: false,
		displaySignInForm: false,
	}),
	actions: {
		async getAuth(username, password) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			try {
				let res = await axios.post(
					"https://userbookbackendapi.herokuapp.com/v1/login",
					JSON.stringify({ loginName: username, password: password }),
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				this.auth = res.data;
				this.isAuthorized = true;
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Đăng nhập thành công!";
			} catch (err) {
				this.auth = {};
				this.isAuthorized = false;
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Đăng nhập thất bại!";
				console.log("Lỗi ở FormDangNhap");
			}
			this.loading = false;
		},
		updateAuth(data) {
			this.auth = data;
		},
		updateAuthorized(data) {
			this.isAuthorized = data;
		},
		async editProfile(newValues) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			try {
				await axios.put(`https://userbookbackendapi.herokuapp.com/v1/auth/users/${this.auth.id}`, newValues, {
					headers: {
						"Content-Type": "application/json",
						access_token: this.auth.token,
					},
				});
				thongBaoStore.display = true;
				thongBaoStore.status = "success";
				thongBaoStore.message = "Cập nhật thông tin thành công!";
			} catch (err) {
				thongBaoStore.display = true;
				thongBaoStore.status = "error";
				thongBaoStore.message = "Cập nhật thông tin thất bại!";
				console.log("Lỗi ở AuthStore");
			}
			this.loading = false;
		},
		handleLogout() {
			let thongBaoStore = useThongBaoStore();
			this.updateAuth({});
			this.updateAuthorized(false);
			thongBaoStore.display = true;
			thongBaoStore.status = "warning";
			thongBaoStore.message = "Bạn đã đăng xuất";
		},
	},
});
