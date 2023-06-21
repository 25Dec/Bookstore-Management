<script>
import { onMounted } from "vue";
import { useSachStore } from "../../stores/SachStore";
import { useAuthStore } from "../../stores/AuthStore";
import Spinner from "../../components/Spinner/Spinner.vue";
import FormNhapSach from "../../components/FormNhapSach/FormNhapSach.vue";
import FormChinhSuaSach from "../../components/FormChinhSuaSach/FormChinhSuaSach.vue";
import FormXoaSach from "../../components/FormXoaSach/FormXoaSach.vue";

export default {
	components: { Spinner, FormNhapSach, FormChinhSuaSach, FormXoaSach },
	setup() {
		let sachStore = useSachStore();
		let authStore = useAuthStore();

		onMounted(() => {
			sachStore.getListOfBooks();
			sachStore.getListOfCategories();
		});

		let convertDateTime = (str) => {
			const date = new Date(str);
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		};

		return { sachStore, authStore, convertDateTime };
	},
};
</script>

<template>
	<Spinner
		v-if="sachStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!" />
	<div
		v-else
		id="TrangSach">
		<h1 class="title">Trang sách</h1>
		<div
			id="addBookIcon"
			class="add">
			<span
				class="material-icons"
				@click="
					() => {
						sachStore.displayAddForm = true;
					}
				">
				add
			</span>
		</div>
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Tên sách</th>
					<th>Thể loại</th>
					<th>Tác giả</th>
					<th>Số lượng</th>
					<th>Đơn giá</th>
					<th>Ngày nhập</th>
					<th v-if="authStore.auth.userRight == 'SUPER_ADMIN'">Thao tác</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(book, index) in sachStore.listOfBooks"
					:key="book.MaSach"
					class="row">
					<td class="no">{{ index + 1 }}</td>
					<td class="bookName">{{ book.TenSach }}</td>
					<td class="category">{{ book.TenTL }}</td>
					<td class="authorName">{{ book.TenTG }}</td>
					<td class="quantity">{{ book.SoLuong }}</td>
					<td class="price">
						{{
							book.DonGia.toLocaleString("vi-VN", {
								style: "currency",
								currency: "VND",
							})
						}}
					</td>
					<td class="date">{{ convertDateTime(book.NgayNhapSach) }}</td>
					<td class="modify">
						<span
							class="edit material-icons"
							@click="
								() => {
									sachStore.bookID = book.MaSach;
									sachStore.displayEditForm = true;
									sachStore.getBookDetail();
									sachStore.getListOfCategories();
								}
							">
							edit
						</span>
						/
						<span
							class="delete material-icons"
							@click="
								() => {
									sachStore.bookID = book.MaSach;
									sachStore.displayDeleteForm = true;
									sachStore.getBookDetail();
								}
							">
							delete
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<p
			v-if="sachStore.listOfBooks == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold">
			Chưa có dữ liệu
		</p>
		<FormNhapSach v-if="sachStore.displayAddForm" />
		<FormChinhSuaSach v-if="sachStore.displayEditForm" />
		<FormXoaSach v-if="sachStore.displayDeleteForm" />
	</div>
</template>

<style scoped>
#TrangSach {
	width: 100vw;
	height: max-content;
	background: #f9fbff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 5rem;
}

#TrangSach .title {
	margin: 1.5rem 0;
	color: #bf8f60;
	text-transform: uppercase;
}

#TrangSach > table {
	width: 90%;
	border-collapse: collapse;
	box-shadow: 0 5px 10px #e1e5ee;
	background-color: white;
	text-align: center;
}

#TrangSach > table thead {
	box-shadow: 0 5px 10px #e1e5ee;
}

#TrangSach > table th {
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-size: 0.7rem;
	font-weight: 900;
}

#TrangSach > table td {
	padding: 1rem 2rem;
}

#TrangSach table tbody tr:hover {
	background-color: #e1e5ee;
}

#TrangSach > table .bookName {
	color: #bf8f60;
}

#TrangSach > table .modify .material-icons {
	color: rgba(85, 85, 85);
	font-size: 16px;
	cursor: pointer;
}

#TrangSach > table .modify .material-icons:hover {
	color: #e26e70;
}

#TrangSach table tr:nth-child(even) {
	background-color: #f4f6fb;
}

#TrangSach #addBookIcon {
	width: 46px;
	height: 46px;
	background-color: #bf8f60;
	color: white;
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

#TrangSach #addBookIcon:hover {
	background-color: #a7a791;
}
</style>
