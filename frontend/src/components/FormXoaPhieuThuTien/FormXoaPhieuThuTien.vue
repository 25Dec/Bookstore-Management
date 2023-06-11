<script>
	import { ref } from "vue";
	import { useThuTienStore } from "../../stores/ThuTienStore";

	export default {
		setup() {
			let thuTienStore = useThuTienStore();
			let DeletePayment = ref(null);

			let handleSubmit = () => {
				thuTienStore.displayDeleteForm = false;
			};

			let toggleDeletePaymentPopup = (e) => {
				if (e.target === e.currentTarget) {
					thuTienStore.displayDeleteForm = false;
				}
			};

			return { thuTienStore, DeletePayment, handleSubmit, toggleDeletePaymentPopup };
		},
	};
</script>

<template>
	<div
		id="DeletePayment"
		class="hide"
		ref="DeletePayment"
		@click="toggleDeletePaymentPopup($event)"
	>
		<form
			id="DeletePaymentForm"
			@submit.prevent="handleSubmit"
		>
			<div id="header">
				<h1>Xóa phiếu thu tiền?</h1>
			</div>
			<div id="body">
				<p>Bạn có chắc chắn muốn xóa phiếu thu tiền này không?</p>
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
					@click="thuTienStore.displayDeleteForm = false"
				>
					Không
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	#DeletePayment {
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
		z-index: 2;
	}

	#DeletePaymentForm {
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

	#DeletePaymentForm #header {
		text-align: center;
		padding: 1rem 1.5rem 0 1.5rem;
	}

	#DeletePaymentForm #header h1 {
		font-size: 2rem;
		color: #e26e70;
		text-transform: uppercase;
	}

	#DeletePaymentForm #body {
		text-align: center;
		padding: 2rem 1.5rem 2rem 1.5rem;
	}

	#DeletePaymentForm #body p {
		margin-bottom: 10px;
		font-size: 1.1rem;
	}

	#DeletePaymentForm #footer {
		padding: 0 1.5rem 1.5rem 1.5rem;
		text-align: center;
	}

	#DeletePaymentForm #footer button {
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

	#DeletePaymentForm #footer button:nth-child(1) {
		background-color: #e26e70;
	}

	#DeletePaymentForm #footer button:nth-child(2) {
		background-color: #6c757d;
		margin-left: 20px;
	}

	#DeletePaymentForm #footer button:hover {
		transform: scale(1.1);
	}
</style>
