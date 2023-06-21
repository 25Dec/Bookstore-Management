import { defineStore } from "pinia";
import { useThongBaoStore } from "./ThongBaoStore";
import axios from "axios";

export const useAuthStore = defineStore("AuthStore", {
	state: () => ({
		accounts: [
			{
				id: 1,
				loginName: "sadmin",
				password: "sadmin",
				displayName: "super admin",
				email: "sadmin@gmail.com",
				userRight: "SUPER_ADMIN",
				firstName: "Nhan",
				lastName: "Thien",
			},
			{
				id: 2,
				loginName: "staff",
				password: "staff",
				displayName: "staff",
				email: "staff@gmail.com",
				userRight: "STAFF",
				firstName: "Quoc",
				lastName: "Dat",
			},
		],
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
				this.auth = this.accounts.find((acc) => {
					if (username == acc.loginName && password == acc.password) {
						return acc;
					}
				});

				if (Object.values(this.auth).length > 0) {
					this.isAuthorized = true;
					thongBaoStore.display = true;
					thongBaoStore.status = "success";
					thongBaoStore.message = "Đăng nhập thành công!";
				} else {
					this.auth = {};
					this.isAuthorized = false;
					thongBaoStore.display = true;
					thongBaoStore.status = "error";
					thongBaoStore.message = "Đăng nhập thất bại!";
				}
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
		async editProfile({ firstName, lastName, email }) {
			let thongBaoStore = useThongBaoStore();
			this.loading = true;
			try {

				this.firstName = firstName;
				this.lastName = lastName;
				this.email = email;
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

			if (Object.values(this.auth).length == 0) {
				this.updateAuth({});
				this.updateAuthorized(false);
			} else {
				this.updateAuth({});
				this.updateAuthorized(false);
				thongBaoStore.display = true;
				thongBaoStore.status = "warning";
				thongBaoStore.message = "Bạn đã đăng xuất";
			}
		},
	},
});
