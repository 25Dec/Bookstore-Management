<script>
import { onMounted } from "vue";
import { useHoaDonStore } from "../../stores/HoaDonStore";
import { useAuthStore } from "../../stores/AuthStore";
import Spinner from "../../components/Spinner/Spinner.vue";
import FormXoaHoaDon from "../../components/FormXoaHoaDon/FormXoaHoaDon.vue";

export default {
	components: { Spinner, FormXoaHoaDon },
	setup() {
		let hoaDonStore = useHoaDonStore();
		let authStore = useAuthStore();

		onMounted(() => {
			hoaDonStore.getListOfHoaDon();
		});

		let convertDateTime = (str) => {
			const date = new Date(str);
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		};

		return { hoaDonStore, authStore, convertDateTime };
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
		id="TrangHoaDon"
	>
		<h1 class="title">Trang hóa đơn</h1>
		<div
			id="addHoaDonIcon"
			class="add"
		>
			<RouterLink :to="{ name: 'TrangLapHoaDon' }">
				<span
					class="material-icons"
					@click="
						() => {
							hoaDonStore.displayAddForm = true;
						}
					"
				>
					add
				</span>
			</RouterLink>
		</div>
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Họ tên khách hàng</th>
					<th>Tổng tiền</th>
					<th>Số tiền đã thu</th>
					<th>Còn lại</th>
					<th>Ngày lập</th>
					<!-- <th v-if="authStore.auth.userRight == 'SUPER_ADMIN'">Thao tác</th> -->
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(hoaDon, index) in hoaDonStore.listOfHoaDon"
					:key="hoaDon.MaHD"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="hoTenKhachHang">
						<RouterLink
							:to="{ name: 'TrangChiTietHoaDon', params: { id: hoaDon.MaHD } }"
							@click="
								() => {
									hoaDonStore.hoaDonID = hoaDon.MaHD;
									hoaDonStore.getHoaDonDetail();
								}
							"
						>
							{{ hoaDon.HoTen }}
						</RouterLink>
					</td>
					<td class="tongTien">
						{{
							hoaDon.TongTien.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="soTienTra">
						{{
							hoaDon.SoTienTra.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="conLai">
						{{
							hoaDon.ConLai.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="ngayLap">{{ convertDateTime(hoaDon.NgayLap) }}</td>
					<!-- <td
						class="modify"
						v-if="authStore.auth.userRight == 'SUPER_ADMIN'"
					>
						<span
							class="delete material-icons"
							@click="
								() => {
									hoaDonStore.hoaDonID = hoaDon.MaHD;
									hoaDonStore.displayDeleteForm = true;
								}
							"
						>
							delete
						</span>
					</td> -->
				</tr>
			</tbody>
		</table>
		<p
			v-if="hoaDonStore.listOfHoaDon == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Chưa có dữ liệu
		</p>
		<!-- <FormXoaHoaDon v-if="hoaDonStore.displayDeleteForm" /> -->
	</div>
</template>

<style scoped>
#TrangHoaDon {
	width: 100vw;
	height: max-content;
	background: #f9fbff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 5rem;
}
#TrangHoaDon .title {
	margin: 1.5rem 0;
	color: #bf8f60;
	text-transform: uppercase;
}

#TrangHoaDon > table {
	width: 90%;
	border-collapse: collapse;
	box-shadow: 0 5px 10px #e1e5ee;
	background-color: white;
	text-align: center;
}

#TrangHoaDon > table thead {
	box-shadow: 0 5px 10px #e1e5ee;
}

#TrangHoaDon > table th {
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-size: 0.7rem;
	font-weight: 900;
}

#TrangHoaDon > table td {
	padding: 1rem 2rem;
	position: relative;
}
#TrangHoaDon > table td.hetNo::after {
	content: "";
	position: absolute;
	bottom: 50%;
	left: 0;
	right: 0;
	height: 1px;
	background-color: grey;
}

#TrangHoaDon table tbody tr:hover {
	background-color: #e1e5ee;
}

#TrangHoaDon > table .hoTenKhachHang a {
	text-decoration: none;
	color: #bf8f60;
}

#TrangHoaDon > table .hoTenKhachHang a:hover {
	text-decoration: underline;
}

#TrangHoaDon > table .modify .material-icons {
	color: rgba(85, 85, 85);
	font-size: 16px;
	cursor: pointer;
}
#TrangHoaDon > table .modify .material-icons:hover {
	color: #e26e70;
}

#TrangHoaDon table tr:nth-child(even) {
	background-color: #f4f6fb;
}

#TrangHoaDon #addHoaDonIcon {
	width: 46px;
	height: 46px;
	background-color: #bf8f60;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 88px;
	right: 0;
	border-top-left-radius: 100px;
	border-bottom-left-radius: 100px;
	cursor: pointer;
}

#TrangHoaDon #addHoaDonIcon a {
	width: 46px;
	height: 46px;
	color: white;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
}

#TrangHoaDon #addHoaDonIcon:hover {
	background-color: #a7a791;
}
</style>
