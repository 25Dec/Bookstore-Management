<script>
import { useTaiKhoanStore } from "../../stores/TaiKhoanStore";
import FormThemTaiKhoan from "../../components/FormThemTaiKhoan/FormThemTaiKhoan.vue";
import FormXoaTaiKhoan from "../../components/FormXoaTaiKhoan/FormXoaTaiKhoan.vue";
import Spinner from "../../components/Spinner/Spinner.vue";
export default {
	components: { Spinner, FormThemTaiKhoan, FormXoaTaiKhoan },
	setup() {
		let sachStore = useSachStore();
		let authStore = useAuthStore();

		onMounted(() => {
			sachStore.getListOfBooks();
			sachStore.getListOfCategories();
		});

		let convertDateTime = (str) => {
			const date = new Date(str);
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		};

		return { sachStore, authStore, convertDateTime };
	},
};
</script>

<template>
	<Spinner
		v-if="sachStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!" />
</template>

<style></style>
