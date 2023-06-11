<script>
	import { onMounted } from "vue";
	import { useTrangChuStore } from "../../stores/TrangChuStore";
	import { useCaiDatStore } from "../../stores/CaiDatStore";
	import Spinner from "../../components/Spinner/Spinner.vue";
	import BarChart from "../../components/BarChart/BarChart.vue";
	import LineChart from "../../components/LineChart/LineChart.vue";

	export default {
		components: { Spinner, BarChart, LineChart },
		setup() {
			let trangChuStore = useTrangChuStore();
			let caiDatStore = useCaiDatStore();

			onMounted(() => {
				trangChuStore.getData();
				caiDatStore.getThamSo();
			});

			return { trangChuStore };
		},
	};
</script>

<template>
	<Spinner
		v-if="trangChuStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangChu"
	>
		<h1 class="title">TRANG CHỦ</h1>
		<div id="StatBoxes">
			<div>
				<p>Tổng tiền hóa đơn đã lập</p>
				<h2>
					{{
						trangChuStore.tongTienHoaDonDaLap != null
							? trangChuStore.tongTienHoaDonDaLap.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
							: 0
					}}
				</h2>
			</div>
			<div>
				<p>Tổng tiền thu được thực tế</p>
				<h2>
					{{
						trangChuStore.tongTienThuDuocThucTe != null
							? trangChuStore.tongTienThuDuocThucTe.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
							: 0
					}}
				</h2>
			</div>
			<div>
				<p>Số lượng khách hàng</p>
				<h2>
					{{ trangChuStore.soLuongKhachHang || 0 }}
				</h2>
			</div>
		</div>
		<div id="Charts">
			<LineChart />
			<BarChart />
		</div>
	</div>
</template>

<style scoped>
	#TrangChu {
		width: 100%;
		height: max-content;
		margin: 0 auto;
		padding-bottom: 6rem;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangChu .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#TrangChu #StatBoxes {
		width: 80%;
		height: max-content;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 100px;
	}

	#TrangChu #StatBoxes > div {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		width: 20rem;
		padding: 1.25rem 0.25rem;
		margin-bottom: 2rem;
		border-radius: 1.2rem;
		text-align: center;
		border: 2px solid rgba(85, 85, 85, 0.5);
		color: rgba(85, 85, 85, 0.9);
		transition: 0.5s;
	}

	#TrangChu #StatBoxes > div:hover {
		transform: scale(1.1);
		border: 2px solid #a7a791;
		color: #a7a791;
	}

	#TrangChu #Charts {
		margin-top: 20px;
		width: 80%;
		height: max-content;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		gap: 40px;
	}

	@media only screen and (max-width: 739px) {
		#TrangChu #StatBoxes {
			width: 80%;
			height: max-content;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 10px;
		}
	}
</style>
