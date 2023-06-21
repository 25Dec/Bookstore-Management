<script>
import { onMounted } from "vue";
import { useBaoCaoCongNoStore } from "../../stores/BaoCaoCongNoStore";
import FormTaoBaoCaoCongNo from "../../components/FormTaoBaoCaoCongNo/FormTaoBaoCaoCongNo.vue";
import FormXoaBaoCaocongNo from "../../components/FormXoaBaoCaoCongNo/FormXoaBaoCaoCongNo.vue";
import Spinner from "../../components/Spinner/Spinner.vue";

export default {
	components: { Spinner, FormTaoBaoCaoCongNo, FormXoaBaoCaocongNo },
	setup() {
		let baoCaoCongNoStore = useBaoCaoCongNoStore();

		onMounted(() => {
			baoCaoCongNoStore.getListOfBaoCaoCongNo();
		});

		return { baoCaoCongNoStore };
	},
};
</script>

<template>
	<Spinner
		v-if="baoCaoCongNoStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!" />
	<div
		v-else
		id="TrangBaoCaoCongNo">
		<h1 class="title">Trang báo cáo công nợ</h1>
		<div
			id="taoBaoCaoCongNoIcon"
			class="add">
			<span
				class="material-icons"
				@click="
					() => {
						baoCaoCongNoStore.displayAddForm = true;
					}
				">
				add
			</span>
		</div>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Tên báo cáo</th>
					<th>Tháng</th>
					<th>Năm</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(bccn, index) in baoCaoCongNoStore.listOfBaoCaoCongNo"
					:key="bccn.MaBCCN"
					class="row">
					<td class="no">{{ index + 1 }}</td>
					<td class="tenBCCN">
						<RouterLink
							:to="{
								name: 'TrangChiTietBaoCaoCongNo',
								params: { id: bccn.MaBCCN },
							}"
							@click="
								() => {
									baoCaoCongNoStore.bccnID = bccn.MaBCCN;
									baoCaoCongNoStore.bccnThang = bccn.Thang;
									baoCaoCongNoStore.bccnNam = bccn.Nam;
									baoCaoCongNoStore.getBaoCaoCongNoDetail();
								}
							">
							{{ bccn.TenBCCN }}
						</RouterLink>
					</td>
					<td class="month">{{ bccn.Thang }}</td>
					<td class="year">{{ bccn.Nam }}</td>
					<td class="modify">
						<span
							class="delete material-icons"
							@click="
								() => {
									baoCaoCongNoStore.bccnID = bccn.MaBCCN;
									baoCaoCongNoStore.displayDeleteForm = true;
								}
							">
							delete
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<p
			v-if="baoCaoCongNoStore.listOfBaoCaoCongNo == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold">
			Chưa có dữ liệu
		</p>
		<FormTaoBaoCaoCongNo v-if="baoCaoCongNoStore.displayAddForm" />
		<FormXoaBaoCaocongNo v-if="baoCaoCongNoStore.displayDeleteForm" />
	</div>
</template>

<style scoped>
#TrangBaoCaoCongNo {
	width: 100vw;
	height: max-content;
	background: #f9fbff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 5rem;
}

#TrangBaoCaoCongNo .title {
	margin: 1.5rem 0;
	color: #bf8f60;
	text-transform: uppercase;
}

#TrangBaoCaoCongNo > table {
	width: 90%;
	border-collapse: collapse;
	box-shadow: 0 5px 10px #e1e5ee;
	background-color: white;
	text-align: center;
}

#TrangBaoCaoCongNo > table thead {
	box-shadow: 0 5px 10px #e1e5ee;
}

#TrangBaoCaoCongNo > table th {
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-size: 0.7rem;
	font-weight: 900;
}

#TrangBaoCaoCongNo > table td {
	padding: 1rem 2rem;
}

#TrangBaoCaoCongNo table tbody tr:hover {
	background-color: #e1e5ee;
}

#TrangBaoCaoCongNo > table .tenBCCN a {
	color: #bf8f60;
	text-decoration: none;
}

#TrangBaoCaoCongNo > table .tenBCCN a:hover {
	text-decoration: underline;
}

#TrangBaoCaoCongNo > table .delete {
	color: black;
}

#TrangBaoCaoCongNo > table .modify .material-icons {
	color: rgba(85, 85, 85);
	font-size: 16px;
	cursor: pointer;
}

#TrangBaoCaoCongNo > table .modify .material-icons:hover {
	color: #e26e70;
}

#TrangBaoCaoCongNo table tr:nth-child(even) {
	background-color: #f4f6fb;
}

#TrangBaoCaoCongNo #taoBaoCaoCongNoIcon {
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

#TrangBaoCaoCongNo #taoBaoCaoCongNoIcon:hover {
	background-color: #a7a791;
}
</style>
