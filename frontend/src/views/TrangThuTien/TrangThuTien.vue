<script>
import { onMounted } from "vue";
import Spinner from "../../components/Spinner/Spinner.vue";
import FormLapPhieuThuTien from "../../components/FormLapPhieuThuTien/FormLapPhieuThuTien.vue";
import FormXoaPhieuThuTien from "../../components/FormXoaPhieuThuTien/FormXoaPhieuThuTien.vue";
import { useThuTienStore } from "../../stores/ThuTienStore";
import { useThongBaoStore } from "../../stores/ThongBaoStore";

export default {
	components: { Spinner, FormLapPhieuThuTien, FormXoaPhieuThuTien },
	setup() {
		let thuTienStore = useThuTienStore();
		let thongBaoStore = useThongBaoStore();

		onMounted(() => {
			thuTienStore.getListOfPhieuThuTien();
		});

		let shortenEmail = (email) => {
			if (email.length > 28) {
				let atIndex = email.indexOf("@");

				if (atIndex > 0) {
					let username = email.substring(0, atIndex);
					let domain = email.substring(atIndex);

					if (username.length > 5) {
						username = username.substring(0, 5) + "...";
					}

					return username + domain;
				}
				return email;
			}
			return email;
		};

		return { thuTienStore, thongBaoStore, shortenEmail };
	},
};
</script>

<template>
	<Spinner
		v-if="thuTienStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangThuTien"
	>
		<h1 class="title">Trang thu tiền nợ</h1>
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Họ tên khách hàng</th>
					<th>Địa chỉ</th>
					<th>Email</th>
					<th>Số điện thoại</th>
					<th>Tổng nợ</th>
					<th>Số tiền đã thu</th>
					<th>Còn lại</th>
					<th>Tình trạng</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(phieuThuTien, index) in thuTienStore.listOfPhieuThuTien"
					:key="phieuThuTien.MaPhieuThuTien"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="hoTenKhachHang">{{ phieuThuTien.HoTen }}</td>
					<td class="diaChi">{{ phieuThuTien.DiaChi }}</td>
					<td class="email">{{ shortenEmail(phieuThuTien.Email) }}</td>
					<td class="sdt">{{ phieuThuTien.DienThoai }}</td>
					<td class="tongNo">
						{{
							phieuThuTien.TongTien.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="soTienDaThu">
						{{
							phieuThuTien.SoTienDaThu.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="conLai">
						{{
							phieuThuTien.ConLai.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="status">
						<span
							v-if="phieuThuTien.ConLai > 0"
							class="conNo"
							>Còn nợ</span
						>
						<span
							v-else
							class="hetNo"
							>Đã thanh toán hết</span
						>
					</td>
					<td class="modify">
						<span
							v-if="phieuThuTien.ConLai > 0"
							class="edit material-icons"
							@click="
								() => {
									thuTienStore.maPhieuThuTien = phieuThuTien.MaPhieuThuTien;
									thuTienStore.getPhieuThuTienDetail();
									thuTienStore.displayAddForm = true;
								}
							"
						>
							request_quote
						</span>
						<!-- /
						<span
							class="delete material-icons"
							@click="
								() => {
									thuTienStore.maPhieuThuTien = phieuThuTien.MaPhieuThuTien;
									thuTienStore.displayDeleteForm = true;
								}
							"
						>
							delete
						</span> -->
					</td>
				</tr>
			</tbody>
		</table>
		<p
			v-if="thuTienStore.listOfPhieuThuTien == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Chưa có dữ liệu
		</p>
		<FormLapPhieuThuTien v-if="thuTienStore.displayAddForm" />
		<!-- <FormXoaPhieuThuTien v-if="thuTienStore.displayDeleteForm" /> -->
	</div>
</template>

<style scoped>
#TrangThuTien {
	width: 100vw;
	height: max-content;
	background: #f9fbff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 5rem;
}
#TrangThuTien .title {
	margin: 1.5rem 0;
	color: #bf8f60;
	text-transform: uppercase;
}

#TrangThuTien > table {
	width: 90%;
	border-collapse: collapse;
	box-shadow: 0 5px 10px #e1e5ee;
	background-color: white;
	text-align: center;
}

#TrangThuTien > table thead {
	box-shadow: 0 5px 10px #e1e5ee;
}

#TrangThuTien > table th {
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-size: 0.7rem;
	font-weight: 900;
}

#TrangThuTien > table td {
	padding: 1rem 2rem;
}

#TrangThuTien table tbody tr:hover {
	background-color: #e1e5ee;
}

#TrangThuTien > table .hoTenKhachHang {
	color: #bf8f60;
}

#TrangThuTien > table a:hover {
	text-decoration: underline;
}

#TrangThuTien > table .modify .material-icons {
	color: rgba(85, 85, 85);
	font-size: 16px;
	cursor: pointer;
}

#TrangThuTien > table .modify .material-icons:hover {
	color: #e26e70;
}

#TrangThuTien > table tr:nth-child(even) {
	background-color: #f4f6fb;
}

#TrangThuTien > table .status .conNo {
	padding: 0.15rem 0.25rem;
	background-color: #f8d7da;
	color: #58151c;
	border-radius: 5px;
}
#TrangThuTien > table .status .hetNo {
	padding: 0.25rem 0.5rem;
	background-color: #d1e7dd;
	color: #0a3622;
	border-radius: 5px;
}
</style>
