<script>
	import { onMounted, ref } from "vue";
	import { useRouter } from "vue-router";
	import { useHoaDonStore } from "../../stores/HoaDonStore";
	import Spinner from "../../components/Spinner/Spinner.vue";

	export default {
		components: { Spinner },
		setup() {
			let hoaDonStore = useHoaDonStore();
			let router = useRouter();
			let tongTien = ref(0);

			onMounted(async () => {
				await hoaDonStore.getHoaDonDetail();
				hoaDonStore.detailPerHoaDon.forEach((hd) => {
					tongTien.value += hd.SoLuong * hd.DonGiaBan * (105 / 100);
				});
			});

			return {
				hoaDonStore,
				router,
				tongTien,
			};
		},
	};
</script>

<template>
	<Spinner
		v-if="hoaDonStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangChiTietHoaDon"
	>
		<h1 class="title">Chi tiết hóa đơn</h1>
		<div
			id="goBackIcon"
			class="goBack"
		>
			<span
				class="material-icons"
				@click="
					() => {
						router.go(-1);
					}
				"
			>
				arrow_back_ios_new
			</span>
		</div>

		<h2 id="h2ThongTinKhachhang">Thông tin khách hàng</h2>
		<form class="ThongTinKhachHang">
			<div>
				<label for="hoTenKhachHang">Họ và tên khách hàng</label>
				<input
					id="hoTenKhachHang"
					type="text"
					name="hoTenKhachHang"
					:value="hoaDonStore.detailPerHoaDon[0].HoTen"
					readonly
				/>
			</div>
			<div>
				<label for="diaChi">Địa chỉ</label>
				<input
					id="diaChi"
					type="text"
					name="diaChi"
					:value="hoaDonStore.detailPerHoaDon[0].DiaChi"
					readonly
				/>
			</div>
			<div>
				<label for="sdt">Số điện thoại</label>
				<input
					id="sdt"
					type="tel"
					name="sdt"
					:value="hoaDonStore.detailPerHoaDon[0].DienThoai"
					readonly
				/>
			</div>
			<div>
				<label for="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					:value="hoaDonStore.detailPerHoaDon[0].Email"
					readonly
				/>
			</div>
		</form>
		<div>
			<h2
				id="h2CacSachDaChon"
				@click="
					() => {
						hoaDonStore.displayListOfSachDaChon = !hoaDonStore.displayListOfSachDaChon;
					}
				"
			>
				Các sách đã chọn
			</h2>
			<h2>TỔNG TIỀN: {{ tongTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}</h2>
		</div>
		<table class="cacSachDaChon">
			<thead>
				<tr>
					<th>No</th>
					<th>Tên sách</th>
					<th>Thể loại</th>
					<th>Tác giả</th>
					<th>Đơn giá</th>
					<th>Số lượng</th>
					<th>Tổng (phụ thu 5% mỗi quyển sách)</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(cthd, index) in hoaDonStore.detailPerHoaDon"
					:key="cthd.MaCTHD"
					class="row"
				>
					<td class="stt">{{ index + 1 }}</td>
					<td class="tenSach">{{ cthd.TenSach }}</td>
					<td class="tenTheLoai">{{ cthd.TenTL }}</td>
					<td class="tenTacGia">{{ cthd.TenTG }}</td>
					<td class="donGiaBan">
						{{ cthd.DonGiaBan.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}
					</td>
					<td class="soLuong">
						{{ cthd.SoLuong }}
					</td>
					<td class="tong">
						{{
							(
								Number.parseFloat(cthd.DonGiaBan) * Number.parseInt(cthd.SoLuong) +
								Number.parseFloat(cthd.DonGiaBan) * Number.parseInt(cthd.SoLuong) * 0.05
							).toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
	#TrangChiTietHoaDon {
		width: 100vw;
		height: max-content;
		padding-bottom: 5rem;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangChiTietHoaDon .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#TrangChiTietHoaDon > h2 {
		margin: 1.5rem 0 0.5rem 0;
		color: #a7a791;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	#TrangChiTietHoaDon > h2#h2ThongTinKhachhang {
		left: -575px;
	}

	#TrangChiTietHoaDon > h2#h2CacSachDaChon {
		left: -600px;
	}

	#TrangChiTietHoaDon #goBackIcon {
		width: 46px;
		height: 46px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		cursor: pointer;
		transition: 0.5s;
	}

	#TrangChiTietHoaDon #goBackIcon {
		color: #bf8f60;
		top: 105px;
		left: 15px;
	}
	#TrangChiTietHoaDon #goBackIcon:hover {
		color: #a7a791;
		transform: scale(1.2);
	}
	#TrangChiTietHoaDon .ThongTinKhachHang {
		width: 90%;
		padding: 2rem 1rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0 5px 10px #e1e5ee;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang div {
		display: flex;
		flex-direction: column;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang div input {
		width: 320px;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang div input:focus {
		border: 2px solid #bf8f60;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang div:nth-child(5) {
		width: 100%;
		margin-top: 10px;
		margin-bottom: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang + div {
		width: 90%;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#TrangChiTietHoaDon .ThongTinKhachHang + div h2 {
		margin: 1.5rem 0 0.5rem 0;
		color: #a7a791;
	}
	#TrangChiTietHoaDon > table {
		width: 90%;
		border-collapse: collapse;
		box-shadow: 0 5px 10px #e1e5ee;
		background-color: white;
		text-align: center;
	}
	#TrangChiTietHoaDon > table thead {
		box-shadow: 0 5px 10px #e1e5ee;
	}
	#TrangChiTietHoaDon > table th {
		padding: 1rem 2rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.7rem;
		font-weight: 900;
	}
	#TrangChiTietHoaDon > table td {
		padding: 1rem 2rem;
	}
	#TrangChiTietHoaDon > table tbody tr:hover {
		background-color: #e1e5ee;
	}
	#TrangChiTietHoaDon > table .bookName {
		color: #bf8f60;
	}
	#TrangChiTietHoaDon > table tr:nth-child(even) {
		background-color: #f4f6fb;
	}
	#TrangChiTietHoaDon > table .quantityBought input {
		padding: 0.5rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangChiTietHoaDon > table .quantityBought input:focus {
		border: 2px solid #bf8f60;
	}
</style>
