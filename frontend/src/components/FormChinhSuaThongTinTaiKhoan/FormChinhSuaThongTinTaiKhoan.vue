<script>
	import { ref } from "vue";
	import { useAuthStore } from "../../stores/AuthStore";
	import { useCaiDatStore } from "../../stores/CaiDatStore";

	export default {
		setup() {
			let authStore = useAuthStore();
			let caiDatStore = useCaiDatStore();
			let EditProfile = ref(null);
			let firstName = ref(authStore.auth.firstName);
			let lastName = ref(authStore.auth.lastName);
			let email = ref(authStore.auth.email);

			let toggleEditProfilePopup = (e) => {
				if (e.target === e.currentTarget) {
					caiDatStore.displayEditForm = false;
				}
			};

			let handleSubmit = () => {
				let newValues = {
					firstName: firstName.value,
					lastName: lastName.value,
					email: email.value,
				};
				authStore.editProfile(newValues);
				caiDatStore.displayEditForm = false;
			};

			return { authStore, caiDatStore, EditProfile, firstName, lastName, email, toggleEditProfilePopup, handleSubmit };
		},
	};
</script>

<template>
	<div
		id="EditProfile"
		ref="EditProfile"
		@click="toggleEditProfilePopup($event)"
	>
		<form
			id="EditProfileForm"
			@submit.prevent="handleSubmit"
		>
			<table>
				<thead>
					<tr>
						<th colspan="2">
							<p>CHỈNH SỬA THÔNG TIN CÁ NHÂN</p>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="2">
							<input
								type="text"
								placeholder="Họ"
								required
								id="inputFirstname"
								v-model.trim="firstName"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<input
								type="text"
								placeholder="Tên"
								required
								id="inputLastname"
								v-model.trim="lastName"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<input
								type="text"
								placeholder="Email"
								required
								id="inputEmail"
								v-model.trim="email"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<button>Lưu thay đổi</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</template>

<style scoped>
	#EditProfile {
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

	#EditProfileForm {
		width: 25rem;
		height: 25rem;
		padding: 1rem;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255);
	}

	#EditProfileForm table thead th p {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: rgba(12, 12, 12, 0.5);
	}

	#EditProfileForm form,
	#EditProfileForm table {
		width: 100%;
		height: 100%;
	}

	#EditProfileForm table input {
		width: 100%;
		padding: 1rem 3.5rem 1rem 2.25rem;
		font-size: 0.9rem;
		border-radius: 0.5rem;
		border: 2px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}

	#EditProfileForm table input:focus {
		border: 2px solid #bf8f60;
	}

	#EditProfileForm ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}

	#EditProfileForm table tbody tr:nth-child(1),
	#EditProfileForm table tbody tr:nth-child(2) {
		position: relative;
	}

	#EditProfileForm table button {
		width: 100%;
		padding: 1rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		border: none;
		outline: none;
		cursor: pointer;
		background: #a7a791;
		color: rgba(255, 255, 255);
		font-size: 1.25rem;
	}

	#EditProfileForm table button:hover {
		background: #bf8f60;
	}
</style>
