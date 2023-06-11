<script>
	import { onMounted, ref } from "vue";
	import { useAuthStore } from "../../stores/AuthStore";
	import { useCaiDatStore } from "../../stores/CaiDatStore";
	import Spinner from "../../components/Spinner/Spinner.vue";
	import FormChinhSuaThongTinTaiKhoan from "../../components/FormChinhSuaThongTinTaiKhoan/FormChinhSuaThongTinTaiKhoan.vue";

	export default {
		components: { FormChinhSuaThongTinTaiKhoan, Spinner },
		setup() {
			let authStore = useAuthStore();
			let caiDatStore = useCaiDatStore();
			let luongTonToiThieuSauKhiBan = ref("");
			let luongTonToiThieuTruocKhiNhap = ref("");
			let soLuongNhapToiThieu = ref("");
			let suDungQuiDinh = ref("");
			let tienNoToiDa = ref("");

			onMounted(async () => {
				await caiDatStore.getThamSo();

				luongTonToiThieuSauKhiBan.value = caiDatStore.luongTonToiThieuSauKhiBan;
				luongTonToiThieuTruocKhiNhap.value = caiDatStore.luongTonToiThieuTruocKhiNhap;
				soLuongNhapToiThieu.value = caiDatStore.soLuongNhapToiThieu;
				suDungQuiDinh.value = caiDatStore.suDungQuiDinh;
				tienNoToiDa.value = caiDatStore.tienNoToiDa;
			});

			let handleSubmitForm = async () => {
				let newValues = {
					soLuongNhapToiThieu: soLuongNhapToiThieu.value,
					luongTonToiThieuTruocKhiNhap: luongTonToiThieuTruocKhiNhap.value,
					tienNoToiDa: tienNoToiDa.value,
					luongTonToiThieuSauKhiBan: luongTonToiThieuSauKhiBan.value,
					suDungQuiDinh: suDungQuiDinh.value,
				};

				caiDatStore.updateThamSo(newValues);
			};

			return {
				authStore,
				caiDatStore,
				luongTonToiThieuSauKhiBan,
				luongTonToiThieuTruocKhiNhap,
				soLuongNhapToiThieu,
				suDungQuiDinh,
				tienNoToiDa,
				handleSubmitForm,
			};
		},
	};
</script>

<template>
	<Spinner
		v-if="caiDatStore.loading"
		message="Đang thực thi. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangCaiDat"
	>
		<h1 class="title">Trang cài đặt</h1>
		<div class="ProfileCard">
			<div>
				<p>
					<span>Họ:</span> <span>{{ authStore.auth.lastName }}</span>
				</p>
				<p>
					<span>Tên:</span> <span>{{ authStore.auth.firstName }}</span>
				</p>
				<p>
					<span>Email: </span>
					<span>{{ authStore.auth.email }}</span>
				</p>
			</div>
			<button
				@click="
					() => {
						caiDatStore.displayEditForm = true;
					}
				"
			>
				Chỉnh sửa
			</button>
		</div>
		<form
			class="SettingCard"
			v-if="authStore.auth.userRight === 'SUPER_ADMIN'"
			@submit.prevent="handleSubmitForm"
		>
			<div>
				<div>
					<label for="soLuongNhapToiThieu">Số lượng nhập tối thiểu</label>
					<input
						id="soLuongNhapToiThieu"
						type="number"
						name="soLuongNhapToiThieu"
						min="1"
						v-model.number="soLuongNhapToiThieu"
					/>
				</div>
				<div>
					<label for="luongTonToiThieuTruocKhiNhap">Lượng tồn tối thiểu trước khi nhập</label>
					<input
						id="luongTonToiThieuTruocKhiNhap"
						type="number"
						name="luongTonToiThieuTruocKhiNhap"
						min="1"
						v-model.number="luongTonToiThieuTruocKhiNhap"
					/>
				</div>
				<div>
					<label for="tienNoToiDa">Tiền nợ tối đa</label>
					<input
						id="tienNoToiDa"
						type="number"
						name="tienNoToiDa"
						min="1"
						v-model.number="tienNoToiDa"
					/>
				</div>
				<div>
					<label for="luongTonToiThieuSauKhiBan">Lượng tồn tối thiểu sau khi bán</label>
					<input
						id="luongTonToiThieuSauKhiBan"
						type="number"
						name="luongTonToiThieuSauKhiBan"
						min="1"
						v-model.number="luongTonToiThieuSauKhiBan"
					/>
				</div>
				<div>
					<label for="suDungQuiDinh">Sử dụng qui định</label>
					<input
						type="radio"
						name="suDungQuiDinh"
						id="option-1"
						:checked="suDungQuiDinh === 1 ? true : false"
						@change="suDungQuiDinh = 1"
					/>
					<input
						type="radio"
						name="suDungQuiDinh"
						id="option-2"
						:checked="suDungQuiDinh !== 0 ? false : true"
						@change="suDungQuiDinh = 0"
					/>
					<label
						for="option-1"
						class="option option-1"
					>
						<div class="dot"></div>
						<span>Có</span>
					</label>
					<label
						for="option-2"
						class="option option-2"
					>
						<div class="dot"></div>
						<span>Không</span>
					</label>
				</div>
			</div>
			<button>Lưu thay đổi</button>
		</form>
		<FormChinhSuaThongTinTaiKhoan v-if="caiDatStore.displayEditForm" />
	</div>
</template>

<style scoped>
	#TrangCaiDat {
		width: 100vw;
		height: 100vh;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangCaiDat .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}
	#TrangCaiDat .ProfileCard,
	#TrangCaiDat .SettingCard {
		width: 55%;
		padding: 1rem;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0 5px 10px #e1e5ee;
	}
	#TrangCaiDat .ProfileCard > div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#TrangCaiDat .SettingCard > div {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	#TrangCaiDat .SettingCard > div div {
		display: flex;
		flex-direction: column;
	}
	#TrangCaiDat .SettingCard > div div input[type="number"] {
		width: 396px;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangCaiDat .SettingCard > div div input:focus {
		border: 2px solid #bf8f60;
	}
	#TrangCaiDat .ProfileCard button,
	#TrangCaiDat .SettingCard button {
		width: 100%;
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
	#TrangCaiDat .ProfileCard button:hover,
	#TrangCaiDat .SettingCard button:hover {
		background: #bf8f60;
	}
	#TrangCaiDat .SettingCard > div div:nth-child(5) {
		width: 100%;
		margin-top: 10px;
		margin-bottom: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangCaiDat .SettingCard > div div:nth-child(5) .option {
		width: 125px;
		height: 35px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
		border-radius: 5px;
		cursor: pointer;
		padding: 0 10px;
		border: 2px solid lightgrey;
		transition: all 0.3s ease;
	}
	#TrangCaiDat .SettingCard > div div:nth-child(5) .option .dot {
		width: 20px;
		height: 20px;
		background: #d9d9d9;
		border-radius: 50%;
		position: relative;
	}
	#TrangCaiDat .SettingCard > div div:nth-child(5) .option .dot::before {
		position: absolute;
		content: "";
		top: 4px;
		left: 4px;
		width: 12px;
		height: 12px;
		background-color: #a7a791;
		border-radius: 50%;
		opacity: 0;
		transform: scale(1.5);
		transition: all 0.3s ease;
	}
	input[type="radio"] {
		display: none;
	}
	#option-1:checked:checked ~ .option-1,
	#option-2:checked:checked ~ .option-2 {
		border-color: #a7a791;
		background-color: #a7a791;
	}
	#option-1:checked:checked ~ .option-1 .dot,
	#option-2:checked:checked ~ .option-2 .dot {
		background-color: white !important;
	}
	#option-1:checked:checked ~ .option-1 .dot::before,
	#option-2:checked:checked ~ .option-2 .dot::before {
		opacity: 1;
		transform: scale(1);
	}
	#SettingPage .SettingCard > div div:nth-child(5) .option span {
		font-size: 18px;
		color: #808080;
	}
	#option-1:checked:checked ~ .option-1 span,
	#option-2:checked:checked ~ .option-2 span {
		color: white !important;
	}
</style>
