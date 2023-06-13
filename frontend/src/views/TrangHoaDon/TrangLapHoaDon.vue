<script>
	import { onMounted, ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { useHoaDonStore } from "../../stores/HoaDonStore";
	import { useThongBaoStore } from "../../stores/ThongBaoStore";
	import { useCaiDatStore } from "../../stores/CaiDatStore";
	import { useThuTienStore } from "../../stores/ThuTienStore";
	import Spinner from "../../components/Spinner/Spinner.vue";
	import FormThanhToan from "../../components/FormThanhToan/FormThanhToan.vue";
	import FormGhiNo from "../../components/FormGhiNo/FormGhiNo.vue";

	export default {
		components: { Spinner, FormThanhToan, FormGhiNo },
		setup() {
			let hoaDonStore = useHoaDonStore();
			let thongBaoStore = useThongBaoStore();
			let caiDatStore = useCaiDatStore();
			let thuTienStore = useThuTienStore();
			let router = useRouter();
			let cacSachHienCo = ref([]);
			let hoTenKhachHang = ref("");
			let diaChi = ref("");
			let sdt = ref("");
			let email = ref("");

			onMounted(() => {
				hoaDonStore.getListOfSachHienCo();
				hoaDonStore.listOfSachDaChon = [];
				hoaDonStore.hoTenKhachHang = "";
				hoaDonStore.diaChi = "";
				hoaDonStore.sdt = "";
				hoaDonStore.email = "";
				hoaDonStore.tongSoLuongCuaCacSachDaChon = 0;
				hoaDonStore.tongTien = 0;
			});

			let handleSoLuongMuaTrongCacSachHienCo = (event, idSachHienCo) => {
				hoaDonStore.listOfSachHienCo = hoaDonStore.listOfSachHienCo.map((sachHienCo) => {
					if (sachHienCo.MaSach == idSachHienCo) {
						sachHienCo.soLuongMua = Number.parseInt(event.target.value);
					}
					return sachHienCo;
				});

				hoaDonStore.listOfSachDaChon = hoaDonStore.listOfSachHienCo.filter((sachHienCo) => {
					return sachHienCo.soLuongMua > 0;
				});
			};

			let checkRegexSDT = computed(() => {
				let phoneNumberRegex = new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/g);

				if (sdt.value == "") return { status: false, msg: "" };
				else if (sdt.value != "" && phoneNumberRegex.test(sdt.value) == false)
					return { status: false, msg: "Số điện thoại không hợp lệ!" };
				else if (sdt.value != "" && phoneNumberRegex.test(sdt.value) == false) return { status: true, msg: "" };
				return { status: true, msg: "" };
			});

			let checkRegexEmail = computed(() => {
				let emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

				if (email.value == "") return { status: false, msg: "" };
				else if (email.value != "" && emailRegex.test(email.value) == false)
					return { status: false, msg: "Email không hợp lệ!" };
				else if (email.value != "" && emailRegex.test(email.value) == true) return { status: true, msg: "" };
				return { status: true, msg: "" };
			});

			let checkBeforeThanhToan = () => {
				if (
					hoaDonStore.hoTenKhachHang == "" ||
					hoaDonStore.diaChi == "" ||
					hoaDonStore.sdt == "" ||
					hoaDonStore.email == ""
				) {
					thongBaoStore.display = true;
					thongBaoStore.status = "warning";
					thongBaoStore.message = "Vui lòng nhập đầy đủ thông tin khách hàng!";
				} else if (
					hoaDonStore.hoTenKhachHang != "" &&
					hoaDonStore.diaChi != "" &&
					hoaDonStore.sdt != "" &&
					hoaDonStore.email != ""
				) {
					if (checkRegexSDT.value.status == false) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng nhập số điện thoại hợp lệ!";
					} else if (checkRegexEmail.value.status == false) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng nhập email hợp lệ!";
					} else if (hoaDonStore.listOfSachDaChon.length == 0) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng chọn ít nhất 1 cuốn sách!";
					} else {
						let khachNo = thuTienStore.listOfPhieuThuTien.find((ptt) => {
							if (
								hoTenKhachHang.value == ptt.HoTen &&
								diaChi.value == ptt.DiaChi &&
								sdt.value == ptt.DienThoai &&
								email.value == ptt.Email
							)
								if (ptt.SoTienNo > caiDatStore.tienNoToiDa) return ptt;
						});

						if (khachNo != undefined) {
							thongBaoStore.display = true;
							thongBaoStore.status = "warning";
							thongBaoStore.message = `Khách này có số tiền nợ vượt quá ${caiDatStore.tienNoToiDa}`;
						} else {
							let book = hoaDonStore.listOfSachDaChon.find((book) => {
								if (book.soLuongMua > book.SoLuong) return book;
							});

							if (book != undefined) {
								thongBaoStore.display = true;
								thongBaoStore.status = "warning";
								thongBaoStore.message = `Số lượng mua (${book.soLuongMua}) phải nhỏ hơn số lượng tồn (${book.SoLuong})`;
							} else {
								hoaDonStore.tongSoLuongCuaCacSachDaChon = 0;
								hoaDonStore.tongTien = 0;

								hoaDonStore.listOfSachDaChon = hoaDonStore.listOfSachDaChon.map((sachDaChon) => {
									sachDaChon.SoLuong -= sachDaChon.soLuongMua;
									return sachDaChon;
								});

								hoaDonStore.listOfSachDaChon.forEach((sach) => {
									hoaDonStore.tongSoLuongCuaCacSachDaChon += sach.soLuongMua;
									hoaDonStore.tongTien += sach.soLuongMua * sach.DonGia * (105 / 100);
								});

								hoaDonStore.displayFormThanhToan = true;
							}
						}
					}
				}
			};

			let checkBeforeGhiNo = () => {
				if (
					hoaDonStore.hoTenKhachHang == "" ||
					hoaDonStore.diaChi == "" ||
					hoaDonStore.sdt == "" ||
					hoaDonStore.email == ""
				) {
					thongBaoStore.display = true;
					thongBaoStore.status = "warning";
					thongBaoStore.message = "Vui lòng nhập đầy đủ thông tin khách hàng!";
				} else if (
					hoaDonStore.hoTenKhachHang != "" &&
					hoaDonStore.diaChi != "" &&
					hoaDonStore.sdt != "" &&
					hoaDonStore.email != ""
				) {
					if (checkRegexSDT.value.status == false) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng nhập số điện thoại hợp lệ!";
					} else if (checkRegexEmail.value.status == false) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng nhập email hợp lệ!";
					} else if (hoaDonStore.listOfSachDaChon.length == 0) {
						thongBaoStore.display = true;
						thongBaoStore.status = "warning";
						thongBaoStore.message = "Vui lòng chọn ít nhất 1 cuốn sách!";
					} else {
						let khachNo = thuTienStore.listOfPhieuThuTien.find((ptt) => {
							if (
								hoTenKhachHang.value == ptt.HoTen &&
								diaChi.value == ptt.DiaChi &&
								sdt.value == ptt.DienThoai &&
								email.value == ptt.Email
							)
								if (ptt.SoTienNo > caiDatStore.tienNoToiDa) return ptt;
						});

						if (khachNo != undefined) {
							thongBaoStore.display = true;
							thongBaoStore.status = "warning";
							thongBaoStore.message = `Khách này có số tiền nợ vượt quá ${caiDatStore.tienNoToiDa}`;
						} else {
							let book = hoaDonStore.listOfSachDaChon.find((book) => {
								if (book.soLuongMua > book.SoLuong) return book;
							});

							if (book != undefined) {
								thongBaoStore.display = true;
								thongBaoStore.status = "warning";
								thongBaoStore.message = `Số lượng mua (${book.soLuongMua}) phải nhỏ hơn số lượng tồn (${book.SoLuong})`;
							} else {
								hoaDonStore.tongSoLuongCuaCacSachDaChon = 0;
								hoaDonStore.tongTien = 0;

								hoaDonStore.listOfSachDaChon = hoaDonStore.listOfSachDaChon.map((sachDaChon) => {
									sachDaChon.SoLuong -= sachDaChon.soLuongMua;
									return sachDaChon;
								});

								hoaDonStore.listOfSachDaChon.forEach((sach) => {
									hoaDonStore.tongSoLuongCuaCacSachDaChon += sach.soLuongMua;
									hoaDonStore.tongTien += sach.soLuongMua * sach.DonGia * (105 / 100);
								});

								hoaDonStore.displayFormGhiNo = true;
							}
						}
					}
				}
			};

			return {
				hoaDonStore,
				thongBaoStore,
				caiDatStore,
				router,
				cacSachHienCo,
				hoTenKhachHang,
				diaChi,
				sdt,
				email,
				checkRegexSDT,
				checkRegexEmail,
				handleSoLuongMuaTrongCacSachHienCo,
				checkBeforeThanhToan,
				checkBeforeGhiNo,
			};
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
		id="TrangLapHoaDon"
	>
		<h1 class="title">Trang lập hóa đơn</h1>
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
		<div
			id="thanhToanIcon"
			class="thanhToan"
		>
			<span
				class="material-icons"
				@click="checkBeforeThanhToan"
			>
				price_check
			</span>
		</div>
		<div
			id="ghiNoIcon"
			class="ghiNo"
		>
			<span
				class="material-icons"
				@click="checkBeforeGhiNo"
			>
				edit_document
			</span>
		</div>
		<h2 id="h2ThongTinKhachhang">Thông tin khách hàng</h2>
		<form
			class="ThongTinKhachHang"
			@submit.prevent="handleSubmitForm"
		>
			<div>
				<label for="hoTenKhachHang">Họ và tên khách hàng</label>
				<input
					id="hoTenKhachHang"
					type="text"
					name="hoTenKhachHang"
					required
					v-model.trim="hoTenKhachHang"
					@change="
						(event) => {
							hoaDonStore.hoTenKhachHang = event.target.value;
						}
					"
				/>
			</div>
			<div>
				<label for="diaChi">Địa chỉ</label>
				<input
					id="diaChi"
					type="text"
					name="diaChi"
					required
					v-model.trim="diaChi"
					@change="
						(event) => {
							hoaDonStore.diaChi = event.target.value;
						}
					"
				/>
			</div>
			<div>
				<label for="sdt">Số điện thoại</label>
				<input
					id="sdt"
					type="tel"
					name="sdt"
					required
					v-model.trim="sdt"
					@change="
						(event) => {
							hoaDonStore.sdt = event.target.value;
						}
					"
				/>
				<p>{{ checkRegexSDT.msg }}</p>
			</div>
			<div>
				<label for="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					required
					v-model.trim="email"
					@change="
						(event) => {
							hoaDonStore.email = event.target.value;
						}
					"
				/>
				<p>{{ checkRegexEmail.msg }}</p>
			</div>
		</form>
		<h2
			id="h2CacSachDaChon"
			@click="
				() => {
					hoaDonStore.displayListOfSachDaChon = !hoaDonStore.displayListOfSachDaChon;
				}
			"
		>
			<span
				v-if="hoaDonStore.displayListOfSachDaChon"
				class="material-icons"
			>
				arrow_drop_down
			</span>
			<span
				v-else
				class="material-icons"
			>
				arrow_right
			</span>
			Các sách đã chọn
		</h2>
		<table
			class="cacSachDaChon"
			v-if="hoaDonStore.displayListOfSachDaChon"
		>
			<thead>
				<tr>
					<th>No</th>
					<th>Tên sách</th>
					<th>Thể loại</th>
					<th>Tác giả</th>
					<th>Đơn giá</th>
					<th>Số lượng</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(book, index) in hoaDonStore.listOfSachDaChon"
					:key="book.MaSach"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="bookName">{{ book.TenSach }}</td>
					<td class="category">{{ book.TenTL }}</td>
					<td class="authorName">{{ book.TenTG }}</td>
					<td class="price">{{ book.DonGia.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}</td>
					<td class="quantityBought">
						{{ book.soLuongMua }}
					</td>
				</tr>
			</tbody>
		</table>
		<h2
			id="h2CacSachHienCo"
			@click="
				() => {
					hoaDonStore.displayListOfSachHienCo = !hoaDonStore.displayListOfSachHienCo;
				}
			"
		>
			<span
				v-if="hoaDonStore.displayListOfSachHienCo"
				class="material-icons"
			>
				arrow_drop_down
			</span>
			<span
				v-else
				class="material-icons"
			>
				arrow_right </span
			>Các sách hiện có
		</h2>
		<table
			class="cacSachHienCo"
			v-if="hoaDonStore.displayListOfSachHienCo"
		>
			<thead>
				<tr>
					<th>No</th>
					<th>Tên sách</th>
					<th>Thể loại</th>
					<th>Tác giả</th>
					<th>Lượng tồn</th>
					<th>Đơn giá</th>
					<th>Số lượng</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(book, index) in hoaDonStore.listOfSachHienCo"
					:key="book.MaSach"
					class="row"
				>
					<td class="no">{{ index + 1 }}</td>
					<td class="bookName">{{ book.TenSach }}</td>
					<td class="category">{{ book.TenTL }}</td>
					<td class="authorName">{{ book.TenTG }}</td>
					<td class="stock">{{ book.SoLuong }}</td>
					<td class="price">{{ book.DonGia.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}</td>
					<td class="quantityBought">
						<input
							v-if="book.SoLuong > 0"
							type="number"
							min="0"
							:max="book.SoLuong"
							@change="handleSoLuongMuaTrongCacSachHienCo($event, book.MaSach)"
						/>
					</td>
				</tr>
			</tbody>
		</table>
		<p
			v-if="hoaDonStore.listOfSachHienCo == 0"
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Chưa có dữ liệu
		</p>
		<FormThanhToan v-if="hoaDonStore.displayFormThanhToan" />
		<FormGhiNo v-if="hoaDonStore.displayFormGhiNo" />
	</div>
</template>

<style scoped>
	#TrangLapHoaDon {
		width: 100vw;
		height: max-content;
		padding-bottom: 5rem;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangLapHoaDon .title {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#TrangLapHoaDon > h2 {
		margin: 1.5rem 0 0.5rem 0;
		color: #a7a791;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	#TrangLapHoaDon > h2#h2ThongTinKhachhang {
		left: -575px;
	}

	#TrangLapHoaDon > h2#h2CacSachDaChon {
		left: -600px;
	}

	#TrangLapHoaDon > h2#h2CacSachHienCo {
		left: -600px;
	}

	#TrangLapHoaDon #goBackIcon,
	#TrangLapHoaDon #thanhToanIcon,
	#TrangLapHoaDon #ghiNoIcon {
		width: 46px;
		height: 46px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		cursor: pointer;
		transition: 0.5s;
	}

	#TrangLapHoaDon #goBackIcon {
		color: #bf8f60;
		top: 105px;
		left: 15px;
	}
	#TrangLapHoaDon #goBackIcon:hover {
		color: #a7a791;
		transform: scale(1.2);
	}

	#TrangLapHoaDon #thanhToanIcon,
	#TrangLapHoaDon #ghiNoIcon {
		color: white;
		background-color: #bf8f60;
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
	}

	#TrangLapHoaDon #thanhToanIcon {
		top: 150px;
		right: 0px;
	}

	#TrangLapHoaDon #ghiNoIcon {
		top: 228px;
		right: 0px;
	}

	#TrangLapHoaDon #thanhToanIcon:hover,
	#TrangLapHoaDon #ghiNoIcon:hover {
		background-color: #a7a791;
	}
	#TrangLapHoaDon .ThongTinKhachHang {
		width: 90%;
		height: 120px;
		padding: 1rem 1.5rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-radius: 10px;
		box-shadow: 0 5px 10px #e1e5ee;
	}
	#TrangLapHoaDon .ThongTinKhachHang div {
		display: flex;
		flex-direction: column;
	}
	#TrangLapHoaDon .ThongTinKhachHang div input {
		width: 320px;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangLapHoaDon .ThongTinKhachHang div input:focus {
		border: 2px solid #bf8f60;
	}
	#TrangLapHoaDon .ThongTinKhachHang div:nth-child(5) {
		width: 100%;
		margin-top: 10px;
		margin-bottom: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	#TrangLapHoaDon > table {
		width: 90%;
		border-collapse: collapse;
		box-shadow: 0 5px 10px #e1e5ee;
		background-color: white;
		text-align: center;
	}
	#TrangLapHoaDon > table thead {
		box-shadow: 0 5px 10px #e1e5ee;
	}
	#TrangLapHoaDon > table th {
		padding: 1rem 2rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.7rem;
		font-weight: 900;
	}
	#TrangLapHoaDon > table td {
		padding: 1rem 2rem;
	}
	#TrangLapHoaDon > table tbody tr:hover {
		background-color: #e1e5ee;
	}
	#TrangLapHoaDon > table .bookName {
		color: #bf8f60;
	}
	#TrangLapHoaDon > table tr:nth-child(even) {
		background-color: #f4f6fb;
	}
	#TrangLapHoaDon > table .quantityBought input {
		padding: 0.5rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangLapHoaDon > table .quantityBought input:focus {
		border: 2px solid #bf8f60;
	}

	#TrangLapHoaDon .ThongTinKhachHang div p {
		font-size: 14px;
		color: red;
		font-style: italic;
	}
</style>
