<script>
	import { ref } from "vue";
	import { useBaoCaoTonStore } from "../../stores/BaoCaoTonStore";

	export default {
		setup() {
			let baoCaoTonStore = useBaoCaoTonStore();
			let AddBCT = ref(null);
			let tenBaoCao = ref("");
			let thangNam = ref("");

			let toggleAddBCTPopup = (e) => {
				if (e.target === e.currentTarget) {
					baoCaoTonStore.displayAddForm = false;
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
				let newBCT = {
					MaBCT: Math.floor(Math.random() * 99999) + 1,
					TenBCT: tenBaoCao.value,
					Thang: Number.parseInt(thangNam.value.substring(5, 8)),
					Nam: Number.parseInt(thangNam.value.substring(0, 4)),
				};

				baoCaoTonStore.addBaoCaoTon(newBCT);
				baoCaoTonStore.displayAddForm = false;

				tenBaoCao.value = "";
				thangNam.value = "";
			};

			return { baoCaoTonStore, AddBCT, tenBaoCao, thangNam, toggleAddBCTPopup, getCurrentMonthYear, handleSubmit };
		},
	};
</script>

<template>
	<div
		id="AddBCT"
		class="hide"
		ref="AddBCT"
		@click="toggleAddBCTPopup($event)"
	>
		<form
			id="AddBCTForm"
			@submit.prevent="handleSubmit"
		>
			<h1 class="title">Tạo báo cáo tồn</h1>

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
					v-model="thangNam"
					:max="getCurrentMonthYear()"
				/>
			</div>
			<button>Lưu</button>
		</form>
	</div>
</template>

<style scoped>
	#AddBCT {
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

	#AddBCTForm {
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

	#AddBCTForm ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}

	#AddBCTForm > h1 {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#AddBCTForm input {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#AddBCTForm div {
		width: 80%;
	}

	#AddBCTForm input:focus {
		border: 2px solid #bf8f60;
	}

	#AddBCTForm button {
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

	#AddBCTForm button:hover {
		background: #bf8f60;
	}
</style>
