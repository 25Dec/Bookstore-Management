import { defineStore } from "pinia";

export const useThongBaoStore = defineStore("ThongBaoStore", {
	state: () => ({
		listOfToasts: {
			success: {
				icon: "<span class='material-icons'>check</span>",
				msg: "",
			},
			warning: {
				icon: "<span class='material-icons'>report_problem</span>",
				msg: "",
			},
			error: {
				icon: "<span class='material-icons'>error</span>",
				msg: "",
			},
		},
		status: "",
		message: "",
		display: false,
	}),
});
