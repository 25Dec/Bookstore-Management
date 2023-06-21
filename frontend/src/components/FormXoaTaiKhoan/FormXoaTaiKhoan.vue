<script>
import { useTaiKhoanStore } from "../../stores/TaiKhoanStore";
import Spinner from "../../components/Spinner/Spinner.vue";
export default {
	components: { Spinner },
	setup() {
		let sachStore = useSachStore();
		let authStore = useAuthStore();

		onMounted(() => {
			sachStore.getListOfBooks();
			sachStore.getListOfCategories();
		});

		return {};
	},
};
</script>

<template>
	<Spinner
		v-if="sachStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!" />
</template>

<style></style>
