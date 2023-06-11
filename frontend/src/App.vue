<script>
	import { useThongBaoStore } from "./stores/ThongBaoStore";
	import NavBar from "./components/NavBar/NavBar.vue";
	import ToastNotification from "./components/ToastNotification/ToastNotification.vue";

	export default {
		components: { NavBar, ToastNotification },
		setup() {
			let thongBaoStore = useThongBaoStore();
			return { thongBaoStore };
		},
	};
</script>

<template>
	<NavBar />
	<ToastNotification v-if="thongBaoStore.display" />
	<RouterView />
</template>
