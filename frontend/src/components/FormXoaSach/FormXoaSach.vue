<script>
	import { ref } from "vue";
	import { useSachStore } from "../../stores/SachStore";

	export default {
		setup() {
			let sachStore = useSachStore();
			let DeleteBook = ref(null);

			let handleSubmit = () => {
				sachStore.deleteBook();
				sachStore.displayDeleteForm = false;
			};

			let toggleDeleteBookPopup = (e) => {
				if (e.target === e.currentTarget) {
					sachStore.displayDeleteForm = false;
				}
			};

			return { sachStore, DeleteBook, handleSubmit, toggleDeleteBookPopup };
		},
	};
</script>

<template>
	<div
		id="DeleteBook"
		ref="DeleteBook"
		@click="toggleDeleteBookPopup($event)"
	>
		<form id="DeleteBookForm">
			<div id="header">
				<h1>Xóa sách?</h1>
			</div>
			<div id="body">
				<p>
					Bạn có chắc chắn muốn xóa &quot;<b>{{ sachStore.detailPerBook.TenSach }}</b
					>&quot; không?
				</p>
				<p>Hành động này không thể hoàn tác và bạn sẽ không thể khôi phục bất kỳ dữ liệu nào.</p>
			</div>
			<div id="footer">
				<button
					type="submit"
					@click.prevent="handleSubmit"
				>
					Có
				</button>
				<button
					type="button"
					@click="sachStore.displayDeleteForm = false"
				>
					Không
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	#DeleteBook {
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
	}

	#DeleteBookForm {
		width: 45rem;
		padding-bottom: 2rem;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
	}

	#DeleteBookForm #header {
		text-align: center;
		padding: 1rem 1.5rem 0 1.5rem;
	}

	#DeleteBookForm #header h1 {
		font-size: 2rem;
		color: #e26e70;
		text-transform: uppercase;
	}

	#DeleteBookForm #body {
		text-align: center;
		padding: 2rem 1.5rem 2rem 1.5rem;
	}

	#DeleteBookForm #body p {
		margin-bottom: 10px;
		font-size: 1.1rem;
	}

	#DeleteBookForm #footer {
		padding: 0 1.5rem 1.5rem 1.5rem;
		text-align: center;
	}

	#DeleteBookForm #footer button {
		width: 120px;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 1.1rem;
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.25s;
		color: rgba(255, 255, 255);
	}

	#DeleteBookForm #footer button:nth-child(1) {
		background-color: #e26e70;
	}

	#DeleteBookForm #footer button:nth-child(2) {
		background-color: #6c757d;
		margin-left: 20px;
	}

	#DeleteBookForm #footer button:hover {
		transform: scale(1.1);
	}
</style>
