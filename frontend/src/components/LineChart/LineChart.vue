<script>
	import { onMounted } from "vue";
	import Chart from "chart.js/auto";
	import { useTrangChuStore } from "../../stores/TrangChuStore";

	export default {
		setup() {
			let trangChuStore = useTrangChuStore();

			let convertDateTime = (str) => {
				const date = new Date(str);
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			};

			let ngayLap = trangChuStore.tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap.map((hoaDon) => {
				return convertDateTime(hoaDon.NgayLap);
			});

			let tongTien = trangChuStore.tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap.map((hoaDon) => {
				return hoaDon.TongTien;
			});

			let soTienTra = trangChuStore.tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap.map((hoaDon) => {
				return hoaDon.SoTienTra;
			});

			let labels = ngayLap;

			let data = {
				labels: labels,
				datasets: [
					{
						label: "Tổng tiền của các hóa đơn theo ngày lập",
						data: tongTien,
						borderColor: "rgba(255, 99, 132, 0.5)",
						fill: false,
					},
					{
						label: "Số tiền trả của các hóa đơn theo ngày lập",
						data: soTienTra,
						borderColor: "rgba(255, 159, 64, 0.5)",
						fill: false,
					},
				],
			};

			let config = {
				type: "line",
				data,
				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			};

			onMounted(() => {
				let lineChart = new Chart(document.querySelector("#LineChart .MyChart"), config);
			});
		},
	};
</script>

<template>
	<div
		id="LineChart"
		style="height: 400px"
	>
		<canvas class="MyChart"></canvas>
	</div>
</template>
