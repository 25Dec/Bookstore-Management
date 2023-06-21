<script>
import { ref, computed, onMounted } from "vue";
import { useSachStore } from "../../stores/SachStore";
import { useCaiDatStore } from "../../stores/CaiDatStore";
import { useThongBaoStore } from "../../stores/ThongBaoStore";

export default {
	setup() {
		let sachStore = useSachStore();
		let caiDatStore = useCaiDatStore();
		let thongBaoStore = useThongBaoStore();
		let AddBook = ref(null);
		let tenSachFromInputTag = ref("");
		let tenSachFromSelectTag = ref("");
		let tenTacGia = ref("");
		let theLoaiFromInputTag = ref("");
		let theLoaiFromSelectTag = ref("");
		let soLuong = ref("");
		let donGia = ref("");

		onMounted(() => {
			sachStore.detailPerBook = {};
		});

		let toggleAddBookPopup = (e) => {
			if (e.target === e.currentTarget) {
				sachStore.displayAddForm = false;
			}
		};

		let errOfSoLuongNhap = computed(() => {
			if (caiDatStore.suDungQuiDinh == 1) {
				if (
					soLuong.value < caiDatStore.soLuongNhapToiThieu &&
					soLuong.value != ""
				)
					return `Số lượng phải lớn hơn ${caiDatStore.soLuongNhapToiThieu}`;
			}
			return "";
		});

		let errOfDonGia = computed(() => {
			if (donGia.value < 1000 && donGia.value != "")
				return `Giá tiền phải lớn hơn 1000`;
		});

		let getMinSoLuongNhapToiThieu = computed(() => {
			if (caiDatStore.suDungQuiDinh == 1) {
				return caiDatStore.soLuongNhapToiThieu;
			}
			return 1;
		});

		let booksFilteredBySoLuongTonToiThieu = computed(() => {
			return sachStore.listOfBooks.filter((sach) => {
				if (sach.SoLuong < caiDatStore.luongTonToiThieuTruocKhiNhap)
					return sach;
			});
		});

		let afterSubmitForm = () => {
			sachStore.displayAddForm = false;

			tenSachFromInputTag.value = "";
			tenSachFromSelectTag.value = "";
			tenTacGia.value = "";
			theLoaiFromInputTag.value = "";
			theLoaiFromSelectTag.value = "";
			soLuong.value = "";
			donGia.value = "";
		};

		let handleSubmit = () => {
			let isDuplicated = false;
			let book = {};

			if (tenSachFromSelectTag.value == "") {
				if (theLoaiFromSelectTag.value == "") {
					book = {
						MaSach: Math.floor(Math.random() * 99999) + 1,
						TenSach: tenSachFromInputTag.value,
						TenTG: tenTacGia.value,
						TenTL: theLoaiFromInputTag.value,
						SoLuong: soLuong.value,
						DonGia: donGia.value,
						NgayNhapSach: new Date(),
					};
				} else {
					book = {
						MaSach: Math.floor(Math.random() * 99999) + 1,
						TenSach: tenSachFromInputTag.value,
						TenTG: tenTacGia.value,
						TenTL: theLoaiFromSelectTag.value,
						SoLuong: soLuong.value,
						DonGia: donGia.value,
						NgayNhapSach: new Date(),
					};
				}

				sachStore.listOfBooks.forEach((sach) => {
					if (book.TenSach == sach.TenSach && book.TenTG == sach.TenTG)
						isDuplicated = true;
				});

				if (isDuplicated) {
					thongBaoStore.display = true;
					thongBaoStore.status = "warning";
					thongBaoStore.message = "Sách này đã có trong hệ thống";
				} else {
					sachStore.addBook(book);
					afterSubmitForm();
				}
			} else {
				book = {
					MaSach: Math.floor(Math.random() * 99999) + 1,
					TenSach: sachStore.detailPerBook.TenSach,
					TenTG: sachStore.detailPerBook.TenTG,
					TenTL: sachStore.detailPerBook.TenTL,
					SoLuong: soLuong.value,
					DonGia: donGia.value,
					NgayNhapSach: new Date(),
				};
				sachStore.addBook(book);
				afterSubmitForm();
			}
		};

		return {
			sachStore,
			caiDatStore,
			thongBaoStore,
			AddBook,
			tenSachFromInputTag,
			tenSachFromSelectTag,
			tenTacGia,
			theLoaiFromInputTag,
			theLoaiFromSelectTag,
			soLuong,
			donGia,
			errOfSoLuongNhap,
			errOfDonGia,
			getMinSoLuongNhapToiThieu,
			booksFilteredBySoLuongTonToiThieu,
			handleSubmit,
			toggleAddBookPopup,
		};
	},
};
</script>

<template>
	<div
		id="AddBook"
		ref="AddBook"
		@click="toggleAddBookPopup($event)">
		<form
			id="AddBookForm"
			@submit.prevent="handleSubmit">
			<h1 class="title">Phiếu nhập sách</h1>

			<div>
				<label for="tenSach">Tên sách</label>
				<select
					name="tenSach"
					id="tenSach"
					required
					v-model="tenSachFromSelectTag"
					@change="
						(event) => {
							sachStore.bookID = event.target.value;
							if (event.target.value != '') sachStore.getBookDetail();
						}
					">
					<option disabled>Chọn tên sách</option>
					<option value="">Khác</option>
					<option
						v-for="sach in booksFilteredBySoLuongTonToiThieu"
						:value="sach.MaSach"
						:key="sach.MaSach">
						{{ sach.TenSach }}
					</option>
				</select>
				<input
					v-if="tenSachFromSelectTag == ''"
					id="tenSach"
					required
					type="text"
					name="tenSach"
					placeholder="Nhập tên sách"
					v-model.trim="tenSachFromInputTag" />
			</div>
			<div v-if="tenSachFromSelectTag == ''">
				<label for="inputTenTacGia">Tên tác giả</label>
				<input
					id="inputTenTacGia"
					type="text"
					required
					name="inputTenTacGia"
					placeholder="Nhập tên tác giả"
					v-model.trim="tenTacGia" />
			</div>
			<div v-if="tenSachFromSelectTag == ''">
				<label for="theLoai">Thể loại</label>
				<select
					name="theLoai"
					id="theLoai"
					required
					v-model.trim="theLoaiFromSelectTag">
					<option disabled>Chọn thể loại</option>
					<option value="">Khác</option>
					<option
						v-for="category in sachStore.listOfCategories"
						:key="category.MaTL">
						{{ category.TenTL }}
					</option>
				</select>
				<input
					v-if="
						theLoaiFromSelectTag == '' &&
						Object.values(sachStore.detailPerBook).length == 0
					"
					id="theLoai"
					required
					type="text"
					name="theLoai"
					placeholder="Nhập tên thể loại"
					v-model.trim="theLoaiFromInputTag" />
			</div>
			<div>
				<label for="inputSoLuong">Số lượng</label>
				<input
					id="inputSoLuong"
					type="number"
					required
					name="inputSoLuong"
					:min="getMinSoLuongNhapToiThieu"
					placeholder="Nhập số lượng"
					v-model.number="soLuong" />
				<p style="font-size: 14px; color: red; font-style: italic">
					{{ errOfSoLuongNhap }}
				</p>
			</div>
			<div>
				<label for="inputDonGia">Đơn giá</label>
				<input
					id="inputDonGia"
					type="number"
					required
					name="inputDonGia"
					min="1000"
					placeholder="Nhập đơn giá"
					v-model.number="donGia" />
				<p style="font-size: 14px; color: red; font-style: italic">
					{{ errOfDonGia }}
				</p>
			</div>
			<button>Lưu</button>
		</form>
	</div>
</template>

<style scoped>
#AddBook {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	z-index: 2;
}

#AddBookForm {
	width: 30rem;
	height: 35rem;
	padding: 1rem 0;
	margin-top: 1.5rem;
	border-radius: 0.5rem;
	background: white;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

#AddBookForm ::placeholder {
	color: rgba(85, 85, 85, 0.5);
}

#AddBookForm > h1 {
	font-size: 1.5rem;
	padding: 0.5rem 0;
	color: #bf8f60;
	text-transform: uppercase;
}

#AddBookForm input,
#AddBookForm select {
	width: 100%;
	margin-top: 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	border: 2px solid rgba(85, 85, 85, 0.5);
	outline: transparent;
	background: transparent;
}

#AddBookForm div {
	width: 80%;
}

#AddBookForm input:focus {
	border: 2px solid #bf8f60;
}

#AddBookForm button {
	width: 80%;
	padding: 0.5rem 1rem;
	margin-top: 1rem;
	border-radius: 0.5rem;
	font-size: 1.25rem;
	border: none;
	outline: none;
	cursor: pointer;
	background: #a7a791;
	color: rgba(255, 255, 255);
}

#AddBookForm button:hover {
	background: #bf8f60;
}

#AddBookForm div:nth-child(5) p,
#AddBookForm div:nth-child(6) p {
	font-size: 14px;
	color: red;
	font-style: italic;
}
</style>
