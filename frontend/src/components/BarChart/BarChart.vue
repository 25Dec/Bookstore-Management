<script>
	import { onMounted } from "vue";
	import Chart from "chart.js/auto";
	import { useTrangChuStore } from "../../stores/TrangChuStore";

	export default {
		setup() {
			let trangChuStore = useTrangChuStore();
			let labels = ["Số lượng sách", "Số lượng thể loại", "Số lượng khách đang nợ"];
			let data = {
				labels: labels,
				datasets: [
					{
						axis: "y",
						label: "Số lượng sách, thể loại và lượng khách đang nợ",
						data: [trangChuStore.soLuongSach, trangChuStore.soLuongTheLoai, trangChuStore.soLuongKhachDangNo],
						fill: false,
						backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)"],
						borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)"],
						borderWidth: 1,
					},
				],
			};

			let config = {
				type: "bar",
				data,
				options: {
					indexAxis: "y",
					responsive: true,
					maintainAspectRatio: false,
				},
			};

			onMounted(() => {
				let barChart = new Chart(document.querySelector("#BarChart .MyChart"), config);
			});
		},
	};
</script>

<template>
	<div
		id="BarChart"
		style="height: 400px"
	>
		<canvas class="MyChart"></canvas>
	</div>
</template>
