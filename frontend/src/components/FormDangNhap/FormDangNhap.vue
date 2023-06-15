<script>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useAuthStore } from "../../stores/AuthStore";

	export default {
		setup() {
			let authStore = useAuthStore();
			let router = useRouter();
			let SignIn = ref(null);
			let username = ref("");
			let password = ref("");

			let handleSubmit = async () => {
				await authStore.getAuth(username.value, password.value);

				if (Object.values(authStore.auth).length >= 0) {
					router.push({ name: "TrangChu" });
				} else {
					router.push({ name: "TrangDangNhap" });
				}

				username.value = "";
				password.value = "";
			};

			return { SignIn, username, password, handleSubmit };
		},
	};
</script>

<template>
	<div
		id="SignIn"
		ref="SignIn"
	>
		<form
			id="SignInForm"
			@submit.prevent="handleSubmit"
		>
			<table>
				<thead>
					<tr>
						<th colspan="2">
							<p>ĐĂNG NHẬP</p>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="2">
							<input
								id="inputUserName"
								type="text"
								placeholder="Username"
								required
								v-model="username"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<input
								id="inputPassword"
								type="password"
								placeholder="Password"
								required
								v-model="password"
							/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<button>Đăng nhập</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</template>

<style scoped>
	#SignIn {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}
	#SignInForm {
		width: 25rem;
		height: 20rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255);
	}
	#SignInForm table thead th p {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		color: rgba(12, 12, 12, 0.5);
	}
	#SignInForm form,
	#SignInForm table {
		width: 100%;
		height: 100%;
	}
	#SignInForm table input {
		width: 100%;
		padding: 1rem 3.5rem 1rem 2.25rem;
		font-size: 1rem;
		border: transparent;
		border-radius: 0.5rem;
		border-bottom: 1px solid rgba(85, 85, 85, 0.5);
		outline: transparent;
		background: transparent;
	}
	#SignInForm ::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}
	#SignInForm table tbody tr:nth-child(1),
	#SignInForm table tbody tr:nth-child(2) {
		position: relative;
	}
	span.icon {
		font-size: 1rem;
		color: rgba(85, 85, 85, 0.5);
		position: absolute;
	}
	.icon.username,
	.icon.password {
		bottom: 0.8rem;
		transform: translateY(-50%);
		left: 10px;
	}
	.icon.showPassword {
		width: 25px;
		height: 25px;
		padding: 1px;
		font-size: 1.25rem;
		text-align: center;
		border-radius: 50%;
		bottom: 1.5rem;
		right: 0.5rem;
		cursor: pointer;
		display: none;
	}
	.icon.showPassword:hover {
		background: rgba(12, 12, 12, 0.1);
	}
	#SignInForm table input:focus {
		border-bottom: 1px solid rgba(85, 85, 85, 0.5);
		outline: 1px solid rgba(85, 85, 85, 0.5);
	}
	#SignInForm table button {
		width: 100%;
		padding: 1rem;
		border-radius: 0.5rem;
		border: none;
		outline: none;
		cursor: pointer;
		background: #a7a791;
		color: rgba(255, 255, 255);
		font-size: 1.25rem;
	}
	#SignInForm table button:hover {
		background: #bf8f60;
	}
</style>
