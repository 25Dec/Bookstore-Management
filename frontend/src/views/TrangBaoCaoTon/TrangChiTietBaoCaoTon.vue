<script>
	import { useRouter } from "vue-router";
	import { useBaoCaoTonStore } from "../../stores/BaoCaoTonStore";
	import Spinner from "../../components/Spinner/Spinner.vue";

	export default {
		components: { Spinner },
		setup() {
			let baoCaoTonStore = useBaoCaoTonStore();
			let router = useRouter();

			return { baoCaoTonStore, router };
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
		id="ChiTietBaoCaoTon"
	>
		<h1 class="title">Chi tiết báo cáo tồn: Tháng {{ baoCaoTonStore.bctThang }} năm {{ baoCaoTonStore.bctNam }}</h1>
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
		<table v-if="baoCaoTonStore.detailPerBCT.length > 0">
			<thead>
				<tr>
					<th>No</th>
					<th>Tên sách</th>
					<th>Tồn đầu</th>
					<th>Phát sinh</th>
					<th>Đã bán</th>
					<th>Tồn cuối</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, index) in baoCaoTonStore.detailPerBCT"
					:key="row.MaCTBCT"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="tenSach">
						{{ row.TenSach }}
					</td>
					<td class="tonDau">{{ row.TonDau }}</td>
					<td class="phatSinh">{{ row.PhatSinh }}</td>
					<td class="daBan">{{ row.DaBan }}</td>
					<td class="tonCuoi">{{ row.TonCuoi }}</td>
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
	#ChiTietBaoCaoTon {
		width: 100vw;
		height: max-content;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 5rem;
	}
	#ChiTietBaoCaoTon .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#ChiTietBaoCaoTon .title span {
		text-decoration: underline;
	}

	#ChiTietBaoCaoTon > table {
		width: 90%;
		border-collapse: collapse;
		box-shadow: 0 5px 10px #e1e5ee;
		background-color: white;
		text-align: center;
	}

	#ChiTietBaoCaoTon > table thead {
		box-shadow: 0 5px 10px #e1e5ee;
	}

	#ChiTietBaoCaoTon > table th {
		padding: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.7rem;
		font-weight: 900;
	}

	#ChiTietBaoCaoTon > table td {
		padding: 1rem 2rem;
	}

	#ChiTietBaoCaoTon table tbody tr:hover {
		background-color: #e1e5ee;
	}

	#ChiTietBaoCaoTon > table .tenSach {
		color: #bf8f60;
	}

	#ChiTietBaoCaoTon table tr:nth-child(even) {
		background-color: #f4f6fb;
	}

	#ChiTietBaoCaoTon #goBackIcon {
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

	#ChiTietBaoCaoTon #goBackIcon:hover {
		color: #a7a791;
		transform: scale(1.2);
	}
</style>
