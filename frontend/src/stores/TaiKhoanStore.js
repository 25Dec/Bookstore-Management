import { defineStore } from "pinia";
import { useThongBaoStore } from "../stores/ThongBaoStore";
import axios from "axios";

export const useTaiKhoanStore = defineStore("TaiKhoanStore", {
	state: () => ({
		listOfTaiKhoan:[],
		loading: false,
		displayAddForm: false,
		displayDeleteForm: false,
	}),
	actions: {
	},
});
