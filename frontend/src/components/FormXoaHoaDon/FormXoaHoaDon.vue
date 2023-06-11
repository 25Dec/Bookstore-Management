<script>
	import { ref } from "vue";
	import { useHoaDonStore } from "../../stores/HoaDonStore";

	export default {
		setup() {
			let hoaDonStore = useHoaDonStore();
			let DeleteHoaDon = ref(null);

			let handleSubmit = () => {
				hoaDonStore.deleteHoaDon();
				hoaDonStore.displayDeleteForm = false;
			};

			let toggleDeleteHoaDonPopup = (e) => {
				if (e.target === e.currentTarget) {
					hoaDonStore.displayDeleteForm = false;
				}
			};

			return { hoaDonStore, DeleteHoaDon, handleSubmit, toggleDeleteHoaDonPopup };
		},
	};
</script>

<template>
	<div
		id="DeleteHoaDon"
		ref="DeleteHoaDon"
		@click="toggleDeleteHoaDonPopup($event)"
	>
		<form id="DeleteHoaDonForm">
			<div id="header">
				<h1>Xóa hóa đơn?</h1>
			</div>
			<div id="body">
				<p>Bạn có chắc chắn muốn xóa hóa đơn này không?</p>
				<p>Hành động này không thể hoàn tác và bạn sẽ không thể khôi phục bất kỳ dữ liệu nào.</p>
			</div>
			<div id="footer">
				<button
					type="submit"
					@click.prevent="handleSubmit"
				>
					Có
				</button>
				<button
					type="button"
					@click="hoaDonStore.displayDeleteForm = false"
				>
					Không
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	#DeleteHoaDon {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	#DeleteHoaDonForm {
		width: 45rem;
		padding-bottom: 2rem;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
	}

	#DeleteHoaDonForm #header {
		text-align: center;
		padding: 1rem 1.5rem 0 1.5rem;
	}

	#DeleteHoaDonForm #header h1 {
		font-size: 2rem;
		color: #e26e70;
		text-transform: uppercase;
	}

	#DeleteHoaDonForm #body {
		text-align: center;
		padding: 2rem 1.5rem 2rem 1.5rem;
	}

	#DeleteHoaDonForm #body p {
		margin-bottom: 10px;
		font-size: 1.1rem;
	}

	#DeleteHoaDonForm #footer {
		padding: 0 1.5rem 1.5rem 1.5rem;
		text-align: center;
	}

	#DeleteHoaDonForm #footer button {
		width: 120px;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 1.1rem;
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.25s;
		color: rgba(255, 255, 255);
	}

	#DeleteHoaDonForm #footer button:nth-child(1) {
		background-color: #e26e70;
	}

	#DeleteHoaDonForm #footer button:nth-child(2) {
		background-color: #6c757d;
		margin-left: 20px;
	}

	#DeleteHoaDonForm #footer button:hover {
		transform: scale(1.1);
	}
</style>
