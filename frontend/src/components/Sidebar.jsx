import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublishIcon from "@mui/icons-material/Publish";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SearchIcon from "@mui/icons-material/Search";
import PaidIcon from "@mui/icons-material/Paid";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[400]} !important`,
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important",
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important",
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
								<Typography variant="h3" color={colors.grey[100]}>
									ADMINIS
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						<Item title="Trang chủ" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
						<Item
							title="Nhập sách"
							to="/addbook"
							icon={<PublishIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item title="Hóa đơn" to="/invoices" icon={<ReceiptIcon />} selected={selected} setSelected={setSelected} />
						<Item title="Tra cứu" to="/search" icon={<SearchIcon />} selected={selected} setSelected={setSelected} />
						<Item title="Thu tiền" to="/payment" icon={<PaidIcon />} selected={selected} setSelected={setSelected} />
						<Item
							title="Báo cáo"
							to="/statistics"
							icon={<BarChartIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item title="Cài đặt" to="/setting" icon={<SettingsIcon />} selected={selected} setSelected={setSelected} />
						<Item title="Đăng xuất" to="/logout" icon={<LogoutIcon />} selected={selected} setSelected={setSelected} />
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
