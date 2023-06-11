<script>
	import { ref } from "vue";
	import { useBaoCaoCongNoStore } from "../../stores/BaoCaoCongNoStore";

	export default {
		setup() {
			let baoCaoCongNoStore = useBaoCaoCongNoStore();
			let AddBCCN = ref(null);
			let tenBaoCao = ref("");
			let thangNam = ref("");

			let toggleAddBCCNPopup = (e) => {
				if (e.target === e.currentTarget) {
					baoCaoCongNoStore.displayAddForm = false;
				}
			};

			let getCurrentMonthYear = () => {
				let currentDate = new Date();
				let currentYear = currentDate.getFullYear();
				let currentMonth = currentDate.getMonth() + 1;
				let currentMonthYear = currentYear + "-" + (currentMonth < 10 ? "0" + currentMonth : currentMonth);
				return currentMonthYear;
			};

			let handleSubmit = () => {
				let newBCCN = {
					MaBCCN: Math.floor(Math.random() * 99999) + 1,
					TenBCCN: tenBaoCao.value,
					Thang: Number.parseInt(thangNam.value.substring(5, 8)),
					Nam: Number.parseInt(thangNam.value.substring(0, 4)),
				};

				baoCaoCongNoStore.addBaoCaoCongNo(newBCCN);
				baoCaoCongNoStore.displayAddForm = false;

				tenBaoCao.value = "";
				thangNam.value = "";
			};

			return { baoCaoCongNoStore, AddBCCN, tenBaoCao, thangNam, toggleAddBCCNPopup, getCurrentMonthYear, handleSubmit };
		},
	};
</script>

<template>
	<div
		id="AddBCCN"
		ref="AddBCCN"
		@click="toggleAddBCCNPopup($event)"
	>
		<form
			id="AddBCCNForm"
			@submit.prevent="handleSubmit"
		>
			<h1 class="title">Tạo báo cáo công nợ</h1>

			<div>
				<label for="inputTenBaoCao">Tên báo cáo</label>
				<input
					id="inputTenBaoCao"
					required
					type="text"
					name="inputTenBaoCao"
					placeholder="Nhập tên báo cáo"
					v-model.trim="tenBaoCao"
				/>
			</div>
			<div>
				<label for="inputThangNam">Tháng, năm</label>
				<input
					id="inputThangNam"
					type="month"
					required
					name="inputThangNam"
					placeholder="Chọn tháng và năm"
					v-model.trim="thangNam"
					:max="getCurrentMonthYear()"
				/>
			</div>
			<button>Lưu</button>
		</form>
	</div>
</template>

<style scoped>
	#AddBCCN {
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

	#AddBCCNForm {
		width: 30rem;
		height: 20rem;
		padding: 1rem 0;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	#AddBCCNForm ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}

	#AddBCCNForm > h1 {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#AddBCCNForm input {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#AddBCCNForm div {
		width: 80%;
	}

	#AddBCCNForm input:focus {
		border: 2px solid #bf8f60;
	}

	#AddBCCNForm button {
		width: 80%;
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		border-radius: 0.5rem;
		font-size: 1.25rem;
		border: none;
		outline: none;
		cursor: pointer;
		background: #a7a791;
		color: rgba(255, 255, 255);
	}

	#AddBCCNForm button:hover {
		background: #bf8f60;
	}
</style>
