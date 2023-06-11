<script>
	import { ref, computed } from "vue";
	import { useSachStore } from "../../stores/SachStore";
	import { useCaiDatStore } from "../../stores/CaiDatStore";

	export default {
		setup() {
			let sachStore = useSachStore();
			let caiDatStore = useCaiDatStore();
			let EditBook = ref(null);
			let maSach = ref(sachStore.detailPerBook.MaSach);
			let tenSach = ref(sachStore.detailPerBook.TenSach);
			let tenTacGia = ref(sachStore.detailPerBook.TenTG);
			let theLoai = ref(sachStore.detailPerBook.TenTL);

			let toggleEditBookPopup = (e) => {
				if (e.target === e.currentTarget) {
					sachStore.displayEditForm = false;
				}
			};

			let handleSubmit = () => {
				let bookDetail = {
					MaSach: maSach.value,
					TenSach: tenSach.value,
					TenTG: tenTacGia.value,
					TenTL: theLoai.value,
				};
				sachStore.editBook(bookDetail);
				sachStore.displayEditForm = false;
			};

			return {
				sachStore,
				caiDatStore,
				EditBook,
				tenSach,
				tenTacGia,
				theLoai,
				handleSubmit,
				toggleEditBookPopup,
			};
		},
	};
</script>

<template>
	<div
		id="EditBook"
		ref="EditBook"
		@click="toggleEditBookPopup($event)"
	>
		<form
			id="EditBookForm"
			@submit.prevent="handleSubmit"
		>
			<h1>Chỉnh sửa thông tin sách</h1>

			<div>
				<label for="inputTenSach">Tên sách</label>
				<input
					id="inputTenSach"
					required
					type="text"
					name="inputTenSach"
					placeholder="Nhập tên sách"
					v-model.trim="tenSach"
				/>
			</div>
			<div>
				<label for="inputTenTacGia">Tên tác giả</label>
				<input
					id="inputTenTacGia"
					required
					type="text"
					name="inputTenTacGia"
					placeholder="Nhập tên tác giả"
					v-model.trim="tenTacGia"
				/>
			</div>
			<div>
				<label for="selectTheLoai">Thể loại</label>
				<select
					name="selectTheLoai"
					id="selectTheLoai"
					required
					v-model.trim="theLoai"
				>
					<option
						disabled
						value=""
					>
						Chọn thể loại
					</option>
					<option
						v-for="category in sachStore.listOfCategories"
						:key="category.MaTL"
					>
						{{ category.TenTL }}
					</option>
				</select>
			</div>
			<button>Lưu thay đổi</button>
		</form>
	</div>
</template>

<style scoped>
	#EditBook {
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

	#EditBookForm {
		width: 30rem;
		height: 25rem;
		padding: 1rem 0;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	#EditProfileForm ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}

	#EditBookForm > h1 {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: #bf8f60;
		text-transform: uppercase;
	}

	#EditBookForm input,
	#EditBookForm select {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#EditBookForm div {
		width: 80%;
	}

	#EditBookForm input:focus {
		border: 2px solid #bf8f60;
	}

	#EditBookForm button {
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

	#EditBookForm button:hover {
		background: #bf8f60;
	}
</style>
