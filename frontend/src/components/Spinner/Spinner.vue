<template>
	<div id="Spinner">
		<div class="spin"></div>
		<p class="content">{{ props.message }}</p>
	</div>
</template>

<script>
	export default {
		props: ["message"],
		setup(props) {
			return { props };
		},
	};
</script>

<style scoped>
	#Spinner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#Spinner .spin {
		display: block;
		width: 100px;
		height: 100px;
		margin: 50px auto;
		border: 5px solid transparent;
		border-radius: 50%;
		border-top-color: #bf8f60;
		animation: spin 1s ease infinite;
	}

	@keyframes spin {
		to {
			-webkit-transform: rotateZ(360deg);
		}
	}
</style>
