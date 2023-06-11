<script>
	import FormDangNhap from "../../components/FormDangNhap/FormDangNhap.vue";

	export default {
		components: { FormDangNhap },
	};
</script>

<template>
	<div
		id="TrangDangNhap"
		class="hide"
		ref="TrangDangNhap"
		@click="toggleFormDangNhap"
	>
		<FormDangNhap />
	</div>
</template>

<style scoped>
	#TrangDangNhap {
		width: 100vw;
		height: 100vh;
		background: url(../../assets/loginbg-1.png) top center;
		background-size: cover;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}
</style>
