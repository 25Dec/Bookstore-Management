<script>
	import { ref, computed, onMounted } from "vue";
	import { useThuTienStore } from "../../stores/ThuTienStore";

	export default {
		setup() {
			let getCurrentDateTime = () => {
				const date = new Date();
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			};

			let thuTienStore = useThuTienStore();
			let AddPayment = ref(null);
			let ngayLapHoaDon = ref(getCurrentDateTime());
			let soTienThu = ref("");

			let toggleAddPaymentPopup = (e) => {
				if (e.target === e.currentTarget) {
					thuTienStore.displayAddForm = false;
				}
			};

			let checkSoTienThu = computed(() => {
				if (soTienThu.value < 1000 && soTienThu.value != "") return "Số tiền thu phải lớn hơn 1000";
				else if (soTienThu.value > thuTienStore.detailPerPhieuThuTien.SoTienNo)
					return "Số tiền thu không được lớn hơn số tiền nợ";
			});

			let handleSubmit = () => {
				let ptt = {
					MaPhieuThuTien: thuTienStore.detailPerPhieuThuTien.MaPhieuThuTien,
					MaKH: thuTienStore.detailPerPhieuThuTien.MaKH,
					SoTienDaThu: thuTienStore.detailPerPhieuThuTien.SoTienDaThu + soTienThu.value,
					ConLai: thuTienStore.detailPerPhieuThuTien.ConLai - soTienThu.value,
				};

				thuTienStore.addPhieuThuTien(ptt);
				thuTienStore.displayAddForm = false;
			};

			return {
				thuTienStore,
				AddPayment,
				ngayLapHoaDon,
				soTienThu,
				checkSoTienThu,
				handleSubmit,
				getCurrentDateTime,
				toggleAddPaymentPopup,
			};
		},
	};
</script>

<template>
	<div
		id="AddPayment"
		ref="AddPayment"
		@click="toggleAddPaymentPopup($event)"
	>
		<form
			id="AddPaymentForm"
			@submit.prevent="handleSubmit"
		>
			<h1 class="title">Phiếu thu tiền</h1>

			<div>
				<label for="inputNgayLapHoaDon">Ngày lập hóa đơn</label>
				<input
					id="inputNgayLapHoaDon"
					type="text"
					name="inputNgayLapHoaDon"
					readOnly
					:value="ngayLapHoaDon"
				/>
			</div>
			<div>
				<label for="inputHoVaTenKhachHang">Họ và tên khách hàng</label>
				<input
					id="inputHoVaTenKhachHang"
					type="text"
					name="inputHoVaTenKhachHang"
					readonly
					:value="thuTienStore.detailPerPhieuThuTien.HoTen"
				/>
			</div>
			<div>
				<label for="inputDiaChi">Địa chỉ</label>
				<input
					id="inputDiaChi"
					type="text"
					name="inputDiaChi"
					readonly
					:value="thuTienStore.detailPerPhieuThuTien.DiaChi"
				/>
			</div>
			<div>
				<label for="inputEmail">Email</label>
				<input
					id="inputEmail"
					type="text"
					name="inputEmail"
					readonly
					:value="thuTienStore.detailPerPhieuThuTien.Email"
				/>
			</div>
			<div>
				<label for="inputSdt">Số điện thoại</label>
				<input
					id="inputSdt"
					type="text"
					name="inputSdt"
					readonly
					:value="thuTienStore.detailPerPhieuThuTien.DienThoai"
				/>
			</div>
			<div>
				<label for="inputSoTienNo">Số tiền nợ</label>
				<input
					id="inputSoTienNo"
					type="number"
					name="inputSoTienNo"
					readonly
					:value="thuTienStore.detailPerPhieuThuTien.ConLai"
				/>
			</div>
			<div>
				<label for="inputSoTienThu">Số tiền thu</label>
				<input
					required
					id="inputSoTienThu"
					type="number"
					min="1000"
					:max="thuTienStore.detailPerPhieuThuTien.ConLai"
					name="inputSoTienThu"
					v-model.number="soTienThu"
				/>
				<p>{{ checkSoTienThu }}</p>
			</div>
			<button>Lưu</button>
		</form>
	</div>
</template>

<style scoped>
	#AddPayment {
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

	#AddPaymentForm {
		width: 30rem;
		height: 38rem;
		padding: 1rem 0;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	#AddPaymentForm > h1 {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#AddPaymentForm input {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#AddPaymentForm div {
		width: 80%;
	}

	#AddPaymentForm input:focus {
		border: 2px solid #bf8f60;
	}

	#AddPaymentForm button {
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

	#AddPaymentForm button:hover {
		background: #bf8f60;
	}

	#AddPaymentForm div:nth-child(8) p {
		font-size: 14px;
		color: red;
		font-style: italic;
	}
</style>
