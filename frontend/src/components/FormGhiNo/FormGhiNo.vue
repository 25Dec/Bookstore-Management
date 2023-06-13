<script>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useHoaDonStore } from "../../stores/HoaDonStore";

	export default {
		setup() {
			let getCurrentDateTime = () => {
				const date = new Date();
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			};
			let hoaDonStore = useHoaDonStore();
			let GhiNo = ref(null);
			let ngayLapHoaDon = ref(getCurrentDateTime());
			let router = useRouter();

			let toggleGhiNoPopup = (e) => {
				if (e.target === e.currentTarget) {
					hoaDonStore.getListOfSachHienCo();
					hoaDonStore.displayFormGhiNo = false;
				}
			};

			let handleSubmit = () => {
				hoaDonStore.listOfSachDaChon = hoaDonStore.listOfSachDaChon.map((sach) => {
					sach.MaCTHD = Math.floor(Math.random() * 99999) + 1;
					return sach;
				});

				let newHoaDon = {
					MaHD: Math.floor(Math.random() * 99999) + 1,
					HoTen: hoaDonStore.hoTenKhachHang,
					DiaChi: hoaDonStore.diaChi,
					DienThoai: hoaDonStore.sdt,
					Email: hoaDonStore.email,
					NgayLap: new Date(),
					TongTien: hoaDonStore.tongTien,
					SoTienTra: 0,
					SoTienNo: hoaDonStore.tongTien,
					ConLai: hoaDonStore.tongTien,
					listOfSachDaChon: hoaDonStore.listOfSachDaChon,
				};

				hoaDonStore.addHoaDonGhiNo(newHoaDon);
				hoaDonStore.displayFormGhiNo = false;
				router.push({ name: "TrangHoaDon", replace: true });
			};

			return {
				hoaDonStore,
				GhiNo,
				ngayLapHoaDon,
				router,
				toggleGhiNoPopup,
				handleSubmit,
			};
		},
	};
</script>

<template>
	<div
		id="GhiNo"
		ref="GhiNo"
		@click="toggleGhiNoPopup($event)"
	>
		<form
			id="GhiNoForm"
			@submit.prevent="handleSubmit"
		>
			<div id="header">
				<h1>Ghi nợ</h1>
				<h2>Vui lòng kiểm tra thông tin trước khi ghi nợ!</h2>
			</div>

			<div id="body">
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
					<label for="inputHoTenKhachHang">Họ tên khách hàng</label>
					<input
						id="inputHoTenKhachHang"
						type="text"
						name="inputHoTenKhachHang"
						:value="hoaDonStore.hoTenKhachHang"
						readonly
					/>
				</div>
				<div>
					<label for="inputDiaChi">Địa chỉ</label>
					<input
						id="inputDiaChi"
						type="text"
						name="inputDiaChi"
						:value="hoaDonStore.diaChi"
						readonly
					/>
				</div>
				<div>
					<label for="inputSDT">Số diện thoại</label>
					<input
						id="inputSDT"
						type="text"
						name="inputSDT"
						:value="hoaDonStore.sdt"
						readonly
					/>
				</div>
				<div>
					<label for="inputEmail">Email</label>
					<input
						id="inputEmail"
						type="text"
						name="inputEmail"
						:value="hoaDonStore.email"
						readonly
					/>
				</div>
				<div>
					<label for="inputTongSoLuongCuaCacSachDaChon">Tổng số lượng của các sách đã chọn</label>
					<input
						id="inputTongSoLuongCuaCacSachDaChon"
						type="number"
						name="inputTongSoLuongCuaCacSachDaChon"
						:value="hoaDonStore.tongSoLuongCuaCacSachDaChon"
						readonly
					/>
				</div>
				<div>
					<label><p style="color: #ff4069; font-weight: bold">Tổng tiền = 105% * Đơn giá mỗi quyển sách</p></label>
				</div>
			</div>

			<div id="footer">
				<div>
					<h3>TỔNG TIỀN: {{ hoaDonStore.tongTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}</h3>
				</div>
				<div>
					<button
						type="submit"
						@click.prevent="handleSubmit"
					>
						Xác nhận
					</button>
					<button
						type="button"
						@click="
							() => {
								hoaDonStore.getListOfSachHienCo();
								hoaDonStore.displayFormGhiNo = false;
							}
						"
					>
						Đóng
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<style scoped>
	#GhiNo {
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

	#GhiNoForm {
		width: 30rem;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;
	}

	#GhiNoForm #header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 1rem 1.5rem 0 1.5rem;
	}

	#GhiNoForm #header h1 {
		font-size: 2rem;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#GhiNoForm #header h2 {
		margin-top: 0.25rem;
		font-size: 1.05rem;
	}

	#GhiNoForm #body {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 0.5rem 0 1rem 0;
	}

	#GhiNoForm #body div {
		display: flex;
		flex-direction: column;
		margin-top: 0.5rem;
	}

	#GhiNoForm #body input {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#GhiNoForm div {
		width: 85%;
	}

	#GhiNoForm #footer {
		width: 100%;
		padding: 0 1rem 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	#GhiNoForm #footer div:nth-child(1) {
		width: 100%;
		padding-right: 1.25rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	#GhiNoForm #footer div:nth-child(2) {
		width: 100%;
		padding-right: 1.25rem;
		display: flex;
		justify-content: flex-end;
	}

	#GhiNoForm #footer button {
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

	#GhiNoForm #footer button:nth-child(1) {
		background-color: #bf8f60;
	}

	#GhiNoForm #footer button:nth-child(2) {
		background-color: #6c757d;
		margin-left: 20px;
	}

	#GhiNoForm #footer button:hover {
		transform: scale(1.1);
	}
</style>
