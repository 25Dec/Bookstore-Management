<script>
	import { useRouter } from "vue-router";
	import { useBaoCaoCongNoStore } from "../../stores/BaoCaoCongNoStore";
	import Spinner from "../../components/Spinner/Spinner.vue";

	export default {
		components: { Spinner },
		setup() {
			let baoCaoCongNoStore = useBaoCaoCongNoStore();
			let router = useRouter();

			return { baoCaoCongNoStore, router };
		},
	};
</script>

<template>
	<Spinner
		v-if="baoCaoCongNoStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="ChiTietBaoCaoCongNo"
	>
		<h1 class="title">
			Chi tiết báo cáo công nợ: Tháng {{ baoCaoCongNoStore.bccnThang }} năm {{ baoCaoCongNoStore.bccnNam }}
		</h1>
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
		<table v-if="baoCaoCongNoStore.detailPerBCCN.length > 0">
			<thead>
				<tr>
					<th>No</th>
					<th>Khách hàng</th>
					<th>Nợ đầu</th>
					<th>Phát sinh</th>
					<th>Nợ cuối</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, index) in baoCaoCongNoStore.detailPerBCCN"
					:key="row.MaCTBCCN"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="hoTen">
						{{ row.HoTen }}
					</td>
					<td class="noDau">{{ row.NoDau }}</td>
					<td class="phatSinh">{{ row.PhatSinh }}</td>
					<td class="noCuoi">{{ row.NoCuoi }}</td>
				</tr>
			</tbody>
		</table>
		<p
			v-else
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Không có dữ liệu
		</p>
	</div>
</template>

<style scoped>
	#ChiTietBaoCaoCongNo {
		width: 100vw;
		height: max-content;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 5rem;
	}
	#ChiTietBaoCaoCongNo .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#ChiTietBaoCaoCongNo .title span {
		text-decoration: underline;
	}

	#ChiTietBaoCaoCongNo > table {
		width: 90%;
		border-collapse: collapse;
		box-shadow: 0 5px 10px #e1e5ee;
		background-color: white;
		text-align: center;
	}

	#ChiTietBaoCaoCongNo > table thead {
		box-shadow: 0 5px 10px #e1e5ee;
	}

	#ChiTietBaoCaoCongNo > table th {
		padding: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.7rem;
		font-weight: 900;
	}

	#ChiTietBaoCaoCongNo > table td {
		padding: 1rem 2rem;
	}

	#ChiTietBaoCaoCongNo table tbody tr:hover {
		background-color: #e1e5ee;
	}

	#ChiTietBaoCaoCongNo > table .tenSach {
		color: #bf8f60;
	}

	#ChiTietBaoCaoCongNo table tr:nth-child(even) {
		background-color: #f4f6fb;
	}

	#ChiTietBaoCaoCongNo #goBackIcon {
		width: 46px;
		height: 46px;
		color: #bf8f60;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 88px;
		left: 15px;
		cursor: pointer;
		transition: 0.5s;
	}

	#ChiTietBaoCaoCongNo #goBackIcon:hover {
		color: #a7a791;
		transform: scale(1.2);
	}
</style>
