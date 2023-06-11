<script>
	import { onMounted, ref, computed } from "vue";
	import { useTraCuuStore } from "../../stores/TraCuuStore";
	import Spinner from "../../components/Spinner/Spinner.vue";
	import FormXoaSach from "../../components/FormXoaSach/FormXoaSach.vue";

	export default {
		components: { Spinner, FormXoaSach },
		setup() {
			let traCuuStore = useTraCuuStore();
			let nameOfBook = ref("");
			let author = ref("");
			let selectedCategories = ref([]);
			let categories = ref([
				{
					name: "Văn học",
					value: "vanhoc",
					checked: false,
				},
				{
					name: "Khoa học",
					value: "khoahoc",
					checked: false,
				},
				{
					name: "Lịch sử",
					value: "lichsu",
					checked: false,
				},
				{
					name: "Tâm lý",
					value: "tamly",
					checked: false,
				},
				{
					name: "Thiếu nhi",
					value: "thieunhi",
					checked: false,
				},
				{
					name: "Kinh tế",
					value: "kinhte",
					checked: false,
				},
				{
					name: "Truyện tranh",
					value: "truyentranh",
					checked: false,
				},
				{
					name: "Tôn giáo",
					value: "tongiao",
					checked: false,
				},
				{
					name: "Tiểu thuyết",
					value: "tieuthuyet",
					checked: false,
				},
				{
					name: "Hài hước",
					value: "haihuoc",
					checked: false,
				},
				{
					name: "Hồi ký",
					value: "hoiky",
					checked: false,
				},
				{
					name: "Phiêu lưu",
					value: "phieuluu",
					checked: false,
				},
				{
					name: "Kỹ năng sống",
					value: "kynangsong",
					checked: false,
				},
				{
					name: "Sách giáo trình",
					value: "sachgiaotrinh",
					checked: false,
				},
				{
					name: "Trinh thám",
					value: "trinhtham",
					checked: false,
				},
				{
					name: "Tiểu sử",
					value: "tieusu",
					checked: false,
				},
				{
					name: "Du lịch",
					value: "dulich",
					checked: false,
				},
				{
					name: "Y học",
					value: "yhoc",
					checked: false,
				},
				{
					name: "Tâm linh",
					value: "tamlinh",
					checked: false,
				},
				{
					name: "Học đường",
					value: "hocduong",
					checked: false,
				},
			]);

			onMounted(() => {
				traCuuStore.getListOfBooks();
			});

			let handleChangeInputCategories = (event) => {
				selectedCategories.value = categories.value.map((category, index) => {
					if (index == event.target.id) {
						category.checked = !category.checked;
					}
					return category;
				});
			};

			let filteredBooks = computed(function () {
				let options = categories.value.filter((category) => {
					return category.checked === true;
				});

				// 0-0-0
				if (nameOfBook.value === "" && author.value === "" && options.length === 0) {
					return traCuuStore.listOfBooks;
				}
				// 0-0-1
				else if (nameOfBook.value === "" && author.value === "" && options.length !== 0) {
					let arr = [];

					for (let book of traCuuStore.listOfBooks) {
						for (let option of options) {
							if (book.TenTL === option.name) arr.push(book);
						}
					}

					return arr;
				}
				// 0-1-0 && 1-0-0 && 1-1-0
				else if (
					(nameOfBook.value === "" && author.value !== "" && options.length === 0) ||
					(nameOfBook.value !== "" && author.value === "" && options.length === 0) ||
					(nameOfBook.value !== "" && author.value !== "" && options.length === 0)
				) {
					let search1 = traCuuStore.listOfBooks.filter((book) => {
						if (book.TenSach.toLowerCase().includes(nameOfBook.value.toLowerCase())) return book;
					});

					let search2 = search1.filter((book) => {
						if (book.TenTG.toLowerCase().includes(author.value.toLowerCase())) return book;
					});

					return search2;
				}
				// 0-1-1 && 1-0-1 && 1-1-1
				else if (
					(nameOfBook.value === "" && author.value !== "" && options.length !== 0) ||
					(nameOfBook.value !== "" && author.value === "" && options.length !== 0) ||
					(nameOfBook.value !== "" && author.value !== "" && options.length !== 0)
				) {
					let arr = [];

					for (let book of traCuuStore.listOfBooks) {
						for (let option of options) {
							if (book.TenTL === option.name) arr.push(book);
						}
					}

					let search1 = arr.filter((book) => {
						if (book.TenSach.toLowerCase().includes(nameOfBook.value.toLowerCase())) return book;
					});

					let search2 = search1.filter((book) => {
						if (book.TenTG.toLowerCase().includes(author.value.toLowerCase())) return book;
					});

					return search2;
				}
			});

			return {
				traCuuStore,
				nameOfBook,
				author,
				selectedCategories,
				categories,
				filteredBooks,
				handleChangeInputCategories,
			};
		},
	};
</script>

<template>
	<Spinner
		v-if="traCuuStore.loading"
		message="Đang tải dữ liệu. Vui lòng đợi!"
	/>
	<div
		v-else
		id="TrangTraCuu"
	>
		<h1 class="title">Trang tra cứu</h1>
		<div class="options">
			<div class="inputsText">
				<div>
					<label for="inputNameOfBook">Tên sách</label>
					<input
						id="inputNameOfBook"
						type="text"
						placeholder="Nhập tên sách"
						name="inputNameOfBook"
						v-model.trim="nameOfBook"
					/>
				</div>

				<div>
					<label for="inputAuthor">Tên tác giả</label>
					<input
						id="inputAuthor"
						name="inputAuthor"
						type="text"
						placeholder="Nhập tên tác giả"
						v-model.trim="author"
					/>
				</div>
			</div>

			<label for="inputCategories">Thể loại</label>
			<div id="inputCategories">
				<div
					v-for="(category, index) in categories"
					:key="index"
					class="category"
				>
					<input
						:id="index"
						type="checkbox"
						:value="category.value"
						:checked="category.checked"
						@change="handleChangeInputCategories($event)"
					/>
					<label :for="index">{{ category.name }}</label>
				</div>
			</div>
		</div>

		<div
			class="results"
			v-if="filteredBooks.length > 0"
		>
			<div
				v-for="book in filteredBooks"
				:key="book.MaSach"
				class="row"
			>
				<div>
					<a>{{ book.TenSach }}</a>
					<span>
						{{ book.TenTL }}
					</span>
				</div>
				<p>Tác giả: {{ book.TenTG }}</p>
				<p>Số lượng: {{ book.SoLuong }}</p>
				<p>Đơn giá: {{ book.DonGia.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) }}</p>
			</div>
		</div>

		<p
			v-else
			style="margin-top: 1rem; color: #ff4069; font-weight: bold"
		>
			Chưa có dữ liệu
		</p>
	</div>
</template>

<style scoped>
	#TrangTraCuu {
		width: 80%;
		height: max-content;
		margin: 0 auto;
		padding-bottom: 10rem;
		background: #f9fbff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	#TrangTraCuu h1 {
		margin: 1.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}
	#TrangTraCuu .options {
		width: 100%;
	}
	#TrangTraCuu .options .inputsText {
		margin-bottom: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	#TrangTraCuu .options .inputsText ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}
	#TrangTraCuu .options .inputsText input {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 1px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#TrangTraCuu .options .inputsText div {
		display: flex;
		flex-direction: column;
	}
	#TrangTraCuu .options #inputCategories {
		margin: 0.25rem 0 1.5rem 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: 0.5rem;
	}
	#TrangTraCuu .options #inputCategories .category {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
	}
	#TrangTraCuu .results {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 1rem;
	}
	#TrangTraCuu .results .row {
		width: 100%;
		padding: 1rem;
		border: 1px solid rgba(85, 85, 85, 0.3);
	}
	#TrangTraCuu .results .row div {
		display: flex;
		align-items: center;
	}
	#TrangTraCuu .results .row div a:nth-child(1) {
		color: #bf8f60;
		margin-right: 0.5rem;
		font-weight: bold;
		text-decoration: none;
	}
	#TrangTraCuu .results .row div a:not(#TrangTraCuu .results .row div a:nth-child(1)) {
		color: black;
		margin-right: 0.5rem;
	}

	#TrangTraCuu .results .row div a:nth-child(3) {
		line-height: 0px;
	}
	#TrangTraCuu .results .row div span {
		font-size: 11px;
		padding: 3px 7px;
		margin-right: 0.5rem;
		font-weight: bold;
		border-radius: 50px;
	}
	#TrangTraCuu .results .row p {
		margin-top: 1rem;
	}
</style>
