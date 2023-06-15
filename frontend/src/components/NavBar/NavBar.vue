<script>
	import { useAuthStore } from "../../stores/AuthStore";
	import { useThongBaoStore } from "../../stores/ThongBaoStore";

	export default {
		setup() {
			let authStore = useAuthStore();
			let thongBaoStore = useThongBaoStore();

			return { authStore, thongBaoStore };
		},
	};
</script>

<template>
	<nav id="NavBar">
		<RouterLink
			:to="{ name: 'TrangChu' }"
			v-if="authStore.auth.userRight == 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> home </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangSach' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> auto_stories </span>
		</RouterLink>

		<RouterLink :to="{ name: 'TrangTraCuu' }">
			<span class="material-icons"> search </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangHoaDon' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> receipt_long </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangThuTien' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> paid </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangBaoCaoTon' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> assessment </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangBaoCaoCongNo' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> request_page </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangCaiDat' }"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
		>
			<span class="material-icons"> settings </span>
		</RouterLink>

		<RouterLink
			:to="{ name: 'TrangDangNhap' }"
			@click="
				() => {
					authStore.handleLogout();
				}
			"
		>
			<span
				class="material-icons"
				v-if="authStore.auth.userRight === 'SUPER_ADMIN' || authStore.auth.userRight == 'STAFF'"
			>
				logout
			</span>
			<span
				class="material-icons"
				v-else
			>
				login
			</span>
		</RouterLink>
	</nav>
</template>

<style scoped>
	#NavBar {
		position: fixed;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);

		width: max-content;
		height: 4.25rem;
		padding: 1rem 2rem;
		gap: 5rem;

		display: flex;
		justify-content: space-evenly;
		background: rgba(85, 85, 85, 0.5);
		border-radius: 3rem;

		z-index: 3;
		backdrop-filter: blur(15px);
	}
	#NavBar a {
		padding: 0.5rem;
		border-radius: 50%;
		color: rgba(255, 255, 255, 0.5);
		background: transparent;
	}
	#NavBar a span {
		font-size: 1.25rem;
	}
	#NavBar a:hover {
		background: rgba(85, 85, 85, 0.5);
	}
	#NavBar a.router-link-active {
		background: rgba(85, 85, 85, 0.5);
		color: rgba(255, 255, 255);
	}

	@media only screen and (max-width: 739px) {
		#NavBar {
			width: 100%;
			bottom: 0;
			border-radius: 0;
			gap: 2rem;
		}
	}
</style>
