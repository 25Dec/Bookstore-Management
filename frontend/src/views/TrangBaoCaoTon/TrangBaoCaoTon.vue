<script>
	import { onMounted } from "vue";
	import { useBaoCaoTonStore } from "../../stores/BaoCaoTonStore";
	import FormTaoBaoCaoTon from "../../components/FormTaoBaoCaoTon/FormTaoBaoCaoTon.vue";
	import FormXoaBaoCaoTon from "../../components/FormXoaBaoCaoTon/FormXoaBaoCaoTon.vue";
	import Spinner from "../../components/Spinner/Spinner.vue";

	export default {
		components: { Spinner, FormTaoBaoCaoTon, FormXoaBaoCaoTon },
		setup() {
			let baoCaoTonStore = useBaoCaoTonStore();

			onMounted(() => {
				baoCaoTonStore.getListOfBaoCaoTon();
			});

			return { baoCaoTonStore };
		},
	};
</script>

<template>
	<Spinner
		v-if="baoCaoTonStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangBaoCaoTon"
	>
		<h1 class="title">Trang báo cáo tồn</h1>
		<div
			id="taoBaoCaoTonIcon"
			class="add"
		>
			<span
				class="material-icons"
				@click="
					() => {
						baoCaoTonStore.displayAddForm = true;
					}
				"
			>
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
					v-for="(bct, index) in baoCaoTonStore.listOfBaoCaoTon"
					:key="bct.MaBCT"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="tenBCT">
						<RouterLink
							:to="{ name: 'TrangChiTietBaoCaoTon', params: { id: bct.MaBCT } }"
							@click="
								() => {
									baoCaoTonStore.bctID = bct.MaBCT;
									baoCaoTonStore.bctThang = bct.Thang;
									baoCaoTonStore.bctNam = bct.Nam;
									baoCaoTonStore.getBaoCaoTonDetail();
								}
							"
						>
							{{ bct.TenBCT }}
						</RouterLink>
					</td>
					<td class="month">{{ bct.Thang }}</td>
					<td class="year">{{ bct.Nam }}</td>
					<td class="modify">
						<span
							class="delete material-icons"
							@click="
								() => {
									baoCaoTonStore.bctID = bct.MaBCT;
									baoCaoTonStore.displayDeleteForm = true;
								}
							"
						>
							delete
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<p
			v-if="baoCaoTonStore.listOfBaoCaoTon == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Chưa có dữ liệu
		</p>
		<FormTaoBaoCaoTon v-if="baoCaoTonStore.displayAddForm" />
		<FormXoaBaoCaoTon v-if="baoCaoTonStore.displayDeleteForm" />
	</div>
</template>

<style scoped>
	#TrangBaoCaoTon {
		width: 100vw;
		height: max-content;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 5rem;
	}

	#TrangBaoCaoTon .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#TrangBaoCaoTon > table {
		width: 90%;
		border-collapse: collapse;
		box-shadow: 0 5px 10px #e1e5ee;
		background-color: white;
		text-align: center;
	}

	#TrangBaoCaoTon > table thead {
		box-shadow: 0 5px 10px #e1e5ee;
	}

	#TrangBaoCaoTon > table th {
		padding: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.7rem;
		font-weight: 900;
	}

	#TrangBaoCaoTon > table td {
		padding: 1rem 2rem;
	}

	#TrangBaoCaoTon table tbody tr:hover {
		background-color: #e1e5ee;
	}

	#TrangBaoCaoTon > table .tenBCT a {
		color: #bf8f60;
		text-decoration: none;
	}

	#TrangBaoCaoTon > table .tenBCT a:hover {
		text-decoration: underline;
	}

	#TrangBaoCaoTon > table .delete {
		color: black;
	}

	#TrangBaoCaoTon > table .modify .material-icons {
		color: rgba(85, 85, 85);
		font-size: 16px;
		cursor: pointer;
	}

	#TrangBaoCaoTon > table .modify .material-icons:hover {
		color: #e26e70;
	}

	#TrangBaoCaoTon table tr:nth-child(even) {
		background-color: #f4f6fb;
	}

	#TrangBaoCaoTon #taoBaoCaoTonIcon {
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

	#TrangBaoCaoTon #taoBaoCaoTonIcon:hover {
		background-color: #a7a791;
	}
</style>
