const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456789",
	database: "db_qlns",
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to database: " + err.stack);
	} else {
		console.log("Connected to database");
	}
});

// APIs CHO TRANG CHỦ
app.get("/trangChu/tongTienHoaDonDaLap", (req, res) => {
	db.query("SELECT SUM(TongTien) AS TongTienHoaDonDaLap FROM HOADON;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/tongTienThuDuocThucTeTuHoaDon", (req, res) => {
	db.query("SELECT SUM(SoTienTra) AS TongTienThuDuocThucTeTuHoaDon FROM HOADON;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/tongTienThuDuocThucTeTuPhieuThuTien", (req, res) => {
	db.query("SELECT SUM(SoTienDaThu) AS TongTienThuDuocThucTeTuPhieuThuTien FROM PHIEUTHUTIEN;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/soLuongKhachHang", (req, res) => {
	db.query("SELECT count(MaKH) as SoLuongKhachHang FROM KHACHHANG", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/tongTienVaSoTienTraCuaCacHoaDonTheoNgayLap", (req, res) => {
	db.query(
		"SELECT NgayLap, SUM(TongTien) AS TongTien, SUM(SoTienTra) AS SoTienTra FROM HOADON GROUP BY NgayLap;",
		(err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		}
	);
});

app.get("/trangChu/soLuongSach", (req, res) => {
	db.query("SELECT count(MaSach) as SoLuongSach FROM SACH", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/soLuongTheLoai", (req, res) => {
	db.query("SELECT COUNT(*) AS SoLuongTheLoai FROM THELOAI;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangChu/soLuongKhachDangNo", (req, res) => {
	db.query("SELECT COUNT(*) AS SoLuongKhachDangNo FROM KHACHHANG WHERE SoTienNo > 0;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/sach/:id", (req, res) => {
	const id = req.params.id;
	db.query("select * from SACH where id = ?", [id], (err, result) => {
		if (err) {
			res.status(500).send({ error: "Error fetching book" });
		} else if (result.length === 0) {
			res.status(404).send({ error: "User not found" });
		} else {
			res.send(result[0]);
		}
	});
});

// APIs cho trang nhập sách
app.get("/trangSach/danhSachSach", (req, res) => {
	db.query(
		"select SACH.MaSach, TenSach, TenTL, TenTG, SACH.SoLuong, DonGia, NgayNhapSach from SACH join TACGIA join THELOAI join CT_PHIEUNHAP join PHIEUNHAPSACH where SACH.MaTG = TACGIA.MaTG and SACH.MaTL = THELOAI.MaTL and CT_PHIEUNHAP.MaSach = SACH.MaSach and CT_PHIEUNHAP.MaPhieuNhapSach = PHIEUNHAPSACH.MaPhieuNhapSach",
		(err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		}
	);
});

app.get("/trangSach/books/:id", (req, res) => {
	const id = req.params.id;
	db.query(
		"select MaSach, TACGIA.MaTG, THELOAI.MaTL, TenSach, TenTL, TenTG, SoLuong, DonGia from SACH join TACGIA join THELOAI where SACH.MaTG = TACGIA.MaTG and SACH.MaTL = THELOAI.MaTL and MaSach = ?",
		[id],
		(error, results) => {
			if (error) {
				res.status(500).send({ error: "Error fetching book" });
			} else if (results.length === 0) {
				res.status(404).send({ error: "Book not found" });
			} else {
				res.send(results[0]);
			}
		}
	);
});

app.post("/trangSach/books/addPhieuNhapSach", (req, res) => {
	const { MaSach, TenSach, TenTG, TenTL, SoLuong, DonGia } = req.body;

	// Thực hiện truy vấn SQL để kiểm tra và lấy mã tác giả
	let MaTG;
	const queryTacGia = `SELECT MaTG FROM TACGIA WHERE TenTG = '${TenTG}'`;
	db.query(queryTacGia, (error, results) => {
		if (error) {
			console.error("Lỗi truy vấn: " + error);
			return;
		}

		if (results.length > 0) {
			MaTG = results[0].MaTG;
		} else {
			MaTG = Math.floor(Math.random() * 99999) + 1;
			// Thêm tác giả mới vào bảng TACGIA
			const insertTacGia = `INSERT INTO TACGIA (MaTG, TenTG) VALUES (${MaTG},'${TenTG}')`;
			db.query(insertTacGia, (err, result) => {
				if (err) {
					console.error("Lỗi thêm tác giả: " + err);
					return;
				}
			});
		}

		// Thực hiện truy vấn SQL để kiểm tra và lấy mã thể loại
		let MaTL;
		const queryTheLoai = `SELECT MaTL FROM THELOAI WHERE TenTL = '${TenTL}'`;
		db.query(queryTheLoai, (err, results) => {
			if (err) {
				console.error("Lỗi truy vấn: " + err);
				return;
			}

			if (results.length > 0) {
				MaTL = results[0].MaTL;
			} else {
				MaTL = Math.floor(Math.random() * 99999) + 1;
				const insertTheLoai = `INSERT INTO THELOAI (MaTL, TenTL) VALUES (${MaTL},'${TenTL}')`;
				db.query(insertTheLoai, (error, result) => {
					if (error) {
						console.error("Lỗi thêm thể loại: " + error);
						return;
					}
				});
			}

			// Thực hiện truy vấn SQL để thêm thông tin sách vào bảng SACH
			const insertSach = `INSERT INTO SACH (MaSach, TenSach, DonGia, SoLuong, MaTG, MaTL) VALUES (${MaSach},"${TenSach}", ${DonGia}, ${SoLuong}, ${MaTG}, ${MaTL})`;
			db.query(insertSach, (error) => {
				if (error) {
					console.error("Lỗi thêm sách: " + error);
					return;
				}
				// Thêm thông tin phiếu nhập sách vào bảng PHIEUNHAPSACH
				let MaPhieuNhapSach = Math.floor(Math.random() * 99999) + 1;
				const insertPhieuNhapSach = `INSERT INTO PHIEUNHAPSACH (MaPhieuNhapSach, NgayNhapSach) VALUES (${MaPhieuNhapSach}, CURRENT_TIMESTAMP())`;
				db.query(insertPhieuNhapSach, (err) => {
					if (err) {
						console.error("Lỗi thêm phiếu nhập sách: " + err);
						return;
					}

					// Thêm thông tin chi tiết phiếu nhập sách vào bảng CT_PHIEUNHAP
					const insertCTPhieuNhap = `INSERT INTO CT_PHIEUNHAP (MaSach, MaPhieuNhapSach, DonGiaNhap, SoLuong) VALUES (${MaSach}, ${MaPhieuNhapSach}, ${DonGia}, ${SoLuong})`;
					db.query(insertCTPhieuNhap, (err) => {
						if (err) {
							console.error("Lỗi thêm chi tiết phiếu nhập: " + err);
							return;
						}

						res.send("success");
					});
				});
			});
		});
	});
});

app.put("/trangSach/books/:id", (req, res) => {
	const MaSach = req.params.id;
	const { TenSach, TenTG, TenTL } = req.body;

	// Thực hiện truy vấn SQL để kiểm tra và lấy mã tác giả
	const queryTacGia = `SELECT MaTG FROM TACGIA WHERE TenTG = '${TenTG}'`;
	db.query(queryTacGia, (error, results) => {
		if (error) {
			console.error("Lỗi truy vấn: " + error);
			return;
		}

		let MaTG;
		if (results.length > 0) {
			MaTG = results[0].MaTG;
		} else {
			// Thêm tác giả mới vào bảng TACGIA
			MaTG = Math.floor(Math.random() * 99999) + 1;
			const insertTacGia = `INSERT INTO TACGIA (MaTG, TenTG) VALUES (${MaTG},'${TenTG}')`;
			db.query(insertTacGia, (err, result) => {
				if (err) {
					console.error("Lỗi thêm tác giả: " + err);
					return;
				}
			});
		}

		let MaTL;
		// Thực hiện truy vấn SQL để kiểm tra và lấy mã thể loại
		const queryTheLoai = `SELECT MaTL FROM THELOAI WHERE TenTL = '${TenTL}'`;
		db.query(queryTheLoai, (err, results) => {
			if (err) {
				console.error("Lỗi truy vấn: " + err);
				return;
			}
			MaTL = results[0].MaTL;

			// Thực hiện truy vấn SQL để update thông tin sách
			const updateSach = `UPDATE SACH SET TenSach = '${TenSach}', MaTG = '${MaTG}', MaTL = '${MaTL}' WHERE MaSach = ${MaSach}`;
			db.query(updateSach, (error) => {
				if (error) {
					console.error("Lỗi cập nhật sách: " + error);
					return;
				}
			});
		});
	});
});

app.delete("/trangSach/books/:id", (req, res) => {
	const maSach = req.params.id; // Mã sách cần xóa

	// Xóa các bản ghi liên quan trong bảng CT_PHIEUNHAP trước
	const deleteCTPhieuNhap = `DELETE FROM CT_PHIEUNHAP WHERE MaSach = ${maSach}`;
	db.query(deleteCTPhieuNhap, (error) => {
		// Xóa các bản ghi liên quan trong bảng PHIEUNHAP trước
		const deletePhieuNhap = `DELETE FROM PHIEUNHAPSACH WHERE MaPhieuNhapSach = ${maSach}`;
		db.query(deletePhieuNhap, (error) => {
			if (error) {
				console.error("Lỗi xóa chi tiết phiếu nhập: " + error);
				return;
			}
			// Xóa các bản ghi liên quan đến sách trong bảng CT_HOADON
			const deleteCTHoaDon = `DELETE FROM CT_HOADON WHERE MaSach = ${maSach}`;
			db.query(deleteCTHoaDon, (error) => {
				if (error) {
					console.error("Lỗi xóa chi tiết hóa đơn: " + error);
					return;
				}

				// Xóa các bản ghi liên quan đến sách trong bảng CT_BAOCAOTON
				const deleteCTBaoCaoTon = `DELETE FROM CT_BAOCAOTON WHERE MaSach = ${maSach}`;
				db.query(deleteCTBaoCaoTon, (error) => {
					if (error) {
						console.error("Lỗi xóa chi tiết báo cáo tồn: " + error);
						return;
					}
					// Xóa sách khỏi bảng SACH
					const deleteSach = `DELETE FROM SACH WHERE MaSach = ${maSach}`;
					db.query(deleteSach, (error) => {
						if (error) {
							console.error("Lỗi xóa sách: " + error);
							return;
						}
					});

					res.send("Đã xóa sách và thông tin liên quan thành công!");
				});
			});
		});
	});
});

// APIs về trang tìm kiếm
app.get("/trangTraCuu/danhSachSach", (req, res) => {
	db.query(
		"select MaSach, TenSach, TenTL, TenTG, SoLuong, DonGia from SACH join TACGIA join THELOAI where SACH.MaTG = TACGIA.MaTG and SACH.MaTL = THELOAI.MaTL",
		(err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		}
	);
});

// APIs cho trang hóa đơn
app.get("/trangHoaDon/danhSachHoaDon", (req, res) => {
	db.query("select * from HOADON, KHACHHANG where HOADON.MaKH = KHACHHANG.MaKH", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangHoaDon/danhSachHoaDon/:id", (req, res) => {
	const id = req.params.id;
	db.query(
		"select CT_HOADON.MaHD, CT_HOADON.MaCTHD, CT_HOADON.DonGiaBan,  CT_HOADON.SoLuong, HoTen, DiaChi, DienThoai, Email, TenSach, TenTL, TenTG from HOADON, CT_HOADON, KHACHHANG, SACH, THELOAI, TACGIA where HOADON.MaHD = CT_HOADON.MaHD and HOADON.MaKH = KHACHHANG.MaKH and CT_HOADON.MaSach = SACH.MaSach and SACH.MaTL = THELOAI.MaTL and SACH.MaTG = TACGIA.MaTG and HOADON.MaHD = ?",
		[id],
		(error, results) => {
			if (error) {
				res.status(500).send({ error: "Error fetching ChiTietHoaDon" });
			} else if (results.length === 0) {
				res.status(404).send({ error: "ChiTietHoaDon not found" });
			} else {
				res.send(results);
			}
		}
	);
});

app.post("/trangHoaDon/danhSachHoaDon/addHoaDonThanhToan", (req, res) => {
	const { MaHD, HoTen, DiaChi, DienThoai, Email, TongTien, SoTienTra, SoTienNo, ConLai, listOfSachDaChon } = req.body;

	// Thực hiện truy vấn SQL để kiểm tra và lấy mã khách hàng
	const queryKhachHang = `SELECT MaKH FROM KHACHHANG WHERE HoTen = '${HoTen}' AND DienThoai = '${DienThoai}'`;
	db.query(queryKhachHang, (error, results) => {
		if (error) {
			console.error("Lỗi truy vấn: " + error);
			return;
		}

		let MaKH;
		if (results.length > 0) {
			MaKH = results[0].MaKH;
		} else {
			// Thêm khách hàng mới vào bảng KHACHHANG
			MaKH = Math.floor(Math.random() * 99999) + 1;
			const insertKhachHang = `INSERT INTO KHACHHANG (MaKH, HoTen, DiaChi, DienThoai, Email, SoTienNo) VALUES (${MaKH},'${HoTen}', '${DiaChi}','${DienThoai}','${Email}', ${SoTienNo})`;
			db.query(insertKhachHang, (err, result) => {
				if (err) {
					console.error("Lỗi thêm khách hàng: " + err);
					return;
				}
			});
		}
		// Thêm hóa đơn mới vào bảng HOADON
		const insertHoaDon = `INSERT INTO HOADON (MaHD, NgayLap, TongTien, SoTienTra, ConLai, MaKH) VALUES (${MaHD}, CURRENT_TIMESTAMP(), ${TongTien}, ${SoTienTra}, ${ConLai}, ${MaKH})`;
		db.query(insertHoaDon, (err, result) => {
			if (err) {
				console.error("Lỗi chèn thông tin hóa đơn:", err);
				return;
			}

			// cập nhật lượng tồn của mỗi sách
			listOfSachDaChon.forEach((sach) => {
				let sql = `UPDATE SACH SET SoLuong = ${sach.SoLuong} where MaSach = ${sach.MaSach};`;

				db.query(sql, (err, result) => {
					if (err) {
						console.error("Lỗi cập nhật số lượng tồn mỗi sách thất bại:", err);
						return;
					}
				});
			});

			// Chèn chi tiết hóa đơn
			const chiTietHoaDon = listOfSachDaChon.map((sach) => {
				let obj = {
					MaHD,
					MaCTHD: sach.MaCTHD,
					DonGiaBan: sach.DonGia,
					SoLuongMua: sach.soLuongMua,
					MaSach: sach.MaSach,
				};
				return obj;
			});

			db.query(
				"INSERT INTO CT_HOADON (MaHD, MaCTHD, DonGiaBan, SoLuong, MaSach) VALUES ?",
				[chiTietHoaDon.map((item) => Object.values(item))],
				(err, result) => {
					if (err) {
						console.error("Lỗi chèn chi tiết hóa đơn:", err);
						return;
					}
					res.send("Đã thêm hóa đơn và thông tin liên quan thành công!");
				}
			);
		});
	});
});

app.post("/trangHoaDon/danhSachHoaDon/addHoaDonGhiNo", (req, res) => {
	const { MaHD, HoTen, DiaChi, DienThoai, Email, TongTien, SoTienTra, SoTienNo, ConLai, listOfSachDaChon } = req.body;

	// Thực hiện truy vấn SQL để kiểm tra và lấy mã khách hàng
	const queryKhachHang = `SELECT MaKH FROM KHACHHANG WHERE HoTen = '${HoTen}' AND DienThoai = '${DienThoai}'`;
	db.query(queryKhachHang, (error, results) => {
		if (error) {
			console.error("Lỗi truy vấn: " + error);
			return;
		}

		let MaKH;
		if (results.length > 0) {
			MaKH = results[0].MaKH;
		} else {
			// Thêm khách hàng mới vào bảng KHACHHANG
			MaKH = Math.floor(Math.random() * 99999) + 1;
			const insertKhachHang = `INSERT INTO KHACHHANG (MaKH, HoTen, DiaChi, DienThoai, Email, SoTienNo) VALUES (${MaKH},'${HoTen}', '${DiaChi}','${DienThoai}','${Email}', ${SoTienNo})`;
			db.query(insertKhachHang, (err, result) => {
				if (err) {
					console.error("Lỗi thêm khách hàng: " + err);
					return;
				}
			});
		}

		// Thêm hóa đơn mới vào bảng HOADON và lấy mã hóa đơn vừa thêm
		const insertHoaDon = `INSERT INTO HOADON (MaHD, NgayLap, TongTien, SoTienTra, ConLai, MaKH) VALUES (${MaHD}, CURRENT_TIMESTAMP(),${TongTien},${SoTienTra},${ConLai}, ${MaKH})`;
		db.query(insertHoaDon, (err, result) => {
			if (err) {
				console.error("Lỗi chèn thông tin hóa đơn:", err);
				return;
			}

			// cập nhật lượng tồn của mỗi sách
			listOfSachDaChon.forEach((sach) => {
				let sql = `UPDATE SACH SET SoLuong = ${sach.SoLuong} where MaSach = ${sach.MaSach};`;

				db.query(sql, (err, result) => {
					if (err) {
						console.error("Lỗi cập nhật số lượng tồn mỗi sách thất bại:", err);
						return;
					}
				});
			});

			// Chèn chi tiết hóa đơn
			const chiTietHoaDon = listOfSachDaChon.map((sach) => {
				let obj = {
					MaHD,
					MaCTHD: sach.MaCTHD,
					DonGiaBan: sach.DonGia,
					SoLuongMua: sach.soLuongMua,
					MaSach: sach.MaSach,
				};
				return obj;
			});

			db.query(
				"INSERT INTO CT_HOADON (MaHD, MaCTHD, DonGiaBan, SoLuong, MaSach) VALUES ?",
				[chiTietHoaDon.map((item) => Object.values(item))],
				(err, result) => {
					if (err) {
						console.error("Lỗi chèn chi tiết hóa đơn:", err);
						return;
					}

					const insertPhieuThuTien = `INSERT INTO PHIEUTHUTIEN (NgayThuTien, TongTien, SoTienDaThu, ConLai, MaKH) VALUES (CURRENT_TIMESTAMP(),${TongTien}, ${SoTienTra},${ConLai}, ${MaKH})`;
					db.query(insertPhieuThuTien, (err, result) => {
						if (err) {
							console.error("Lỗi thêm phiếu thu tiền nợ: " + err);
							return;
						}
					});

					res.send("Đã thêm hóa đơn và thông tin liên quan thành công!");
				}
			);
		});
	});
});

app.delete("/trangHoaDon/danhSachHoaDon/:id", (req, res) => {
	const MaHD = req.params.id;
	const deleteCTHoaDon = `DELETE FROM CT_HOADON WHERE MaHD = ${MaHD}`;
	db.query(deleteCTHoaDon, (error) => {
		const deleteHoaDon = `DELETE FROM HOADON WHERE MaHD = ${MaHD}`;
		db.query(deleteHoaDon, (error) => {
			if (error) {
				console.error("Lỗi xóa báo cáo tồn: " + error);
				return;
			}

			res.send("Đã xóa hóa đơn và thông tin liên quan thành công!");
		});
	});
});

// APIs về trang thu tiền
app.get("/trangThuTien/danhSachPhieuThuTien", (req, res) => {
	db.query("select * from KHACHHANG, PHIEUTHUTIEN where KHACHHANG.MaKH = PHIEUTHUTIEN.MaKH;", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangThuTien/danhSachPhieuThuTien/:id", (req, res) => {
	const id = req.params.id;

	db.query(
		"select * from KHACHHANG, PHIEUTHUTIEN where KHACHHANG.MaKH = PHIEUTHUTIEN.MaKH and PHIEUTHUTIEN.MaPhieuThuTien = ?",
		[id],
		(error, results) => {
			if (error) {
				res.status(500).send({ error: "Error fetching ChiTietPhieuThuTien" });
			} else if (results.length === 0) {
				res.status(404).send({ error: "ChiTietPhieuThuTien not found" });
			} else {
				res.send(results[0]);
			}
		}
	);
});

app.put("/trangThuTien/danhSachPhieuThuTien/:id", (req, res) => {
	const MaPhieuThuTien = req.params.id;
	const { MaKH, SoTienDaThu, ConLai } = req.body;

	const updatePhieuThuTien = `UPDATE PHIEUTHUTIEN SET SoTienDaThu = ${SoTienDaThu}, ConLai = ${ConLai} where MaPhieuThuTien = ${MaPhieuThuTien}`;
	db.query(updatePhieuThuTien, (err, result) => {
		if (err) {
			console.error("Lỗi cập nhật số tiền nợ khách hàng: " + err);
			return;
		}
		const updateSoTienNoKhachHang = `UPDATE KHACHHANG SET SoTienNo = ${ConLai} where MaKH = ${MaKH}`;
		db.query(updateSoTienNoKhachHang, (err, result) => {
			if (err) {
				console.error("Lỗi cập nhật số tiền nợ khách hàng: " + err);
				return;
			}
		});
	});
});

// APIs về trang báo cáo tồn
app.get("/trangBaoCaoTon/danhSachBaoCaoTon", (req, res) => {
	db.query("select * from BAOCAOTON", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangBaoCaoTon/chiTietBaoCaoTon/:id", (req, res) => {
	const MaBCT = req.params.id;
	const Thang = req.query.thang;
	const Nam = req.query.nam;
	const chiTietBaoCaoTon = `SELECT S.TenSach AS TenSach, IFNULL(TonDau, 0) AS TonDau, IFNULL(PhatSinh, 0) AS PhatSinh, IFNULL(DaBan, 0) AS DaBan, IFNULL(TonDau, 0) + IFNULL(PhatSinh, 0) - IFNULL(DaBan, 0) AS TonCuoi FROM SACH S INNER JOIN TACGIA TG ON S.MaTG = TG.MaTG LEFT JOIN (SELECT TonDau.TenSach, SUM(CASE WHEN MONTH(TonDau.NgayNhapSach) = ${Thang} AND YEAR(TonDau.NgayNhapSach) = ${Nam} THEN TonDau.SoLuong ELSE 0 END) AS TonDau FROM (SELECT PNS.MaPhieuNhapSach, MaCTPN, S.MaSach, TenSach, NgayNhapSach, DonGiaNhap, CTPN.SoLuong FROM PHIEUNHAPSACH PNS, CT_PHIEUNHAP CTPN, SACH S WHERE  PNS.MaPhieuNhapSach = CTPN.MaPhieuNhapSach AND S.MaSach = CTPN.MaSach ORDER BY NgayNhapSach ASC LIMIT 1 ) as TonDau) AS TON_NHAP ON S.TenSach = TON_NHAP.TenSach LEFT JOIN (SELECT PhatSinh.TenSach, SUM(CASE WHEN MONTH(PhatSinh.NgayNhapSach) = ${Thang} AND YEAR(PhatSinh.NgayNhapSach) = ${Nam} THEN PhatSinh.SoLuong ELSE 0 END) AS PhatSinh FROM (SELECT PNS.MaPhieuNhapSach, MaCTPN, S.MaSach, TenSach, NgayNhapSach, DonGiaNhap, CTPN.SoLuong FROM  PHIEUNHAPSACH PNS, CT_PHIEUNHAP CTPN, SACH S WHERE PNS.MaPhieuNhapSach = CTPN.MaPhieuNhapSach AND S.MaSach = CTPN.MaSach ORDER BY NgayNhapSach ASC LIMIT 1, 100000) as PhatSinh ) as PHAT_SINH ON S.TenSach = PHAT_SINH.TenSach LEFT JOIN (SELECT CTHD.MaSach, S.TenSach, SUM(CASE WHEN MONTH(HD.NgayLap) = ${Thang} AND YEAR(HD.NgayLap) = ${Nam} THEN CTHD.SoLuong ELSE 0 END) AS DaBan FROM CT_HOADON CTHD, HOADON HD, SACH S WHERE CTHD.MaHD = HD.MaHD AND CTHD.MaSach = S.MaSach AND MONTH(HD.NgayLap) = ${Thang} AND YEAR(HD.NgayLap) = ${Nam} GROUP BY CTHD.MaSach ) AS TON_BAN ON S.TenSach = TON_BAN.TenSach GROUP BY S.TenSach, TG.TenTG`;
	try {
		db.query(chiTietBaoCaoTon, (err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		});
	} catch (e) {
		console.log(e);
	}
});

app.post("/trangBaoCaoTon/danhSachBaoCaoTon", (req, res) => {
	const { MaBCT, TenBCT, Thang, Nam } = req.body;

	const insertBCT = `INSERT INTO BAOCAOTON (MaBCT, TenBCT, Thang, Nam) VALUES (${MaBCT},'${TenBCT}', ${Thang}, ${Nam})`;
	db.query(insertBCT, (err, result) => {
		if (err) {
			console.error("Lỗi thêm báo cáo tồn: " + err);
			return;
		}
		const insertCTBCT = `INSERT INTO CT_BAOCAOTON (TonDau, PhatSinh, DaBan, TonCuoi, MaSach, MaBCT) SELECT SUM(CASE WHEN MONTH(PNS.NgayNhapSach) = ${Thang} AND YEAR(PNS.NgayNhapSach) = ${Nam} THEN CT_PN.SoLuong ELSE 0 END) AS TonDau, SUM(CASE WHEN DAY(PNS.NgayNhapSach) > DAY(PNS.NgayNhapSach) AND MONTH(PNS.NgayNhapSach) = ${Thang} AND YEAR(PNS.NgayNhapSach) = ${Nam} THEN CT_PN.SoLuong ELSE 0 END) AS PhatSinh, SUM(CASE WHEN MONTH(HD.NgayLap) = ${Thang} AND YEAR(HD.NgayLap) = ${Nam} THEN CTHD.SoLuong ELSE 0 END) AS DaBan, SUM(CASE WHEN MONTH(PNS.NgayNhapSach) = ${Thang} AND YEAR(PNS.NgayNhapSach) = ${Nam} THEN CT_PN.SoLuong ELSE 0 END) + SUM(CASE WHEN DAY(PNS.NgayNhapSach) > DAY(PNS.NgayNhapSach) AND MONTH(PNS.NgayNhapSach) = ${Thang} AND YEAR(PNS.NgayNhapSach) = ${Nam} THEN CT_PN.SoLuong ELSE 0 END) - SUM(CASE WHEN MONTH(HD.NgayLap) = ${Thang} AND YEAR(HD.NgayLap) = ${Nam} THEN CTHD.SoLuong ELSE 0 END) AS TonCuoi, S.MaSach AS MaSach, BCT.MaBCT AS MaBCT FROM SACH S LEFT JOIN CT_PHIEUNHAP CT_PN ON CT_PN.MaSach = S.MaSach LEFT JOIN PHIEUNHAPSACH PNS ON CT_PN.MaPhieuNhapSach = PNS.MaPhieuNhapSach LEFT JOIN CT_HOADON CTHD ON CTHD.MaSach = S.MaSach LEFT JOIN HOADON HD ON CTHD.MaHD = HD.MaHD CROSS JOIN BAOCAOTON BCT WHERE BCT.Thang = ${Thang} AND BCT.Nam = ${Nam} AND MONTH(PNS.NgayNhapSach) = ${Thang} AND YEAR(PNS.NgayNhapSach) = ${Nam} GROUP BY S.MaSach, BCT.MaBCT`;
		db.query(insertCTBCT, (err, result) => {
			if (err) {
				console.error("Lỗi thêm chi tiết báo cáo tồn: " + err);
				return;
			}
		});
	});
});

app.delete("/trangBaoCaoTon/danhSachBaoCaoTon/:id", (req, res) => {
	const MaBCT = req.params.id;
	const deleteCTBaoCaoTon = `DELETE FROM CT_BAOCAOTON WHERE MaBCT = ${MaBCT}`;
	db.query(deleteCTBaoCaoTon, (error) => {
		const deleteBaoCaoTon = `DELETE FROM BAOCAOTON WHERE MaBCT = ${MaBCT}`;
		db.query(deleteBaoCaoTon, (error) => {
			if (error) {
				console.error("Lỗi xóa báo cáo tồn: " + error);
				return;
			}

			res.send("Đã xóa báo cáo tồn và thông tin liên quan thành công!");
		});
	});
});

// APIs về trang báo cáo công nợ
app.get("/trangBaoCaoCongNo/danhSachBaoCaoCongNo", (req, res) => {
	db.query("select * from BAOCAOCONGNO", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/trangBaoCaoCongNo/chiTietBaoCaoCongNo/:id", (req, res) => {
	const id = req.params.id;
	const Thang = req.query.thang;
	const Nam = req.query.nam;
	const chiTietBaoCaoCongNo = `SELECT SUM(CASE WHEN HOADON.NgayLap < '2023-06-01' THEN HOADON.ConLai ELSE 0 END) AS NoDau, SUM(CASE WHEN HOADON.NgayLap >= '2023-06-01' AND HOADON.NgayLap <= '2023-06-30' THEN HOADON.ConLai ELSE 0 END) AS PhatSinh, SUM(CASE  WHEN HOADON.NgayLap <= '2023-06-30' THEN HOADON.ConLai ELSE 0 END) AS NoCuoi, KHACHHANG.MaKH, BAOCAOCONGNO.MaBCCN FROM KHACHHANG INNER JOIN HOADON ON KHACHHANG.MaKH = HOADON.MaKH CROSS JOIN BAOCAOCONGNO WHERE MONTH(HOADON.NgayLap) = ${Thang} AND YEAR(HOADON.NgayLap) = ${Nam} GROUP BY KHACHHANG.MaKH, BAOCAOCONGNO.MaBCCN;`;
	try {
		db.query(chiTietBaoCaoCongNo, (err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		});
	} catch (e) {
		console.log(e);
	}
});

app.post("/trangBaoCaoCongNo/danhSachBaoCaoCongNo", (req, res) => {
	const { MaBCCN, TenBCCN, Thang, Nam } = req.body;

	const insertBCCN = `INSERT INTO BAOCAOCONGNO (MaBCCN, TenBCCN, Thang, Nam) VALUES (${MaBCCN}, '${TenBCCN}', ${Thang}, ${Nam})`;
	db.query(insertBCCN, (err, result) => {
		if (err) {
			console.error("Lỗi thêm báo cáo công nợ: " + err);
			return;
		}
		const insertCTBCCN = `INSERT INTO CT_BAOCAOCONGNO (NoDau, PhatSinh, NoCuoi, MaKH, MaBCCN) SELECT SUM(CASE WHEN HOADON.NgayLap < '2023-06-01' THEN HOADON.ConLai ELSE 0 END) AS NoDau, SUM(CASE WHEN HOADON.NgayLap >= '2023-06-01' AND HOADON.NgayLap <= '2023-06-30' THEN HOADON.ConLai ELSE 0 END) AS PhatSinh, SUM(CASE WHEN HOADON.NgayLap <= '2023-06-30' THEN HOADON.ConLai ELSE 0 END) AS NoCuoi,KHACHHANG.MaKH,BAOCAOCONGNO.MaBCCN FROM KHACHHANG INNER JOIN HOADON ON KHACHHANG.MaKH = HOADON.MaKH CROSS JOIN BAOCAOCONGNO WHERE MONTH(HOADON.NgayLap) = 6 AND YEAR(HOADON.NgayLap) = 2023 GROUP BY KHACHHANG.MaKH, BAOCAOCONGNO.MaBCCN;`;
		db.query(insertCTBCCN, (err, result) => {
			if (err) {
				console.error("Lỗi thêm chi tiết báo cáo công nơ: " + err);
				return;
			}
		});
	});
});

app.delete("/trangBaoCaoCongNo/danhSachBaoCaoCongNo/:id", (req, res) => {
	const MaBCCN = req.params.id;
	const deleteCTBaoCaoCongNo = `DELETE FROM CT_BAOCAOCONGNO WHERE MaBCCN = ${MaBCCN}`;
	db.query(deleteCTBaoCaoCongNo, (error) => {
		const deleteBaoCaoCongNo = `DELETE FROM BAOCAOCONGNO WHERE MaBCCN = ${MaBCCN}`;
		db.query(deleteBaoCaoCongNo, (error) => {
			if (error) {
				console.error("Lỗi xóa báo cáo công nợ: " + error);
				return;
			}

			res.send("Đã xóa báo cáo công nợ và thông tin liên quan thành công!");
		});
	});
});

// APIs về tham số
app.get("/trangCaiDat/thamSo", (req, res) => {
	const sql = "SELECT * FROM THAMSO";

	db.query(sql, (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.put("/trangCaiDat/thamSo", (req, res) => {
	const { soLuongNhapToiThieu, luongTonToiThieuTruocKhiNhap, tienNoToiDa, luongTonToiThieuSauKhiBan, suDungQuiDinh } =
		req.body;

	db.query(
		"update THAMSO set SoLuongNhapToiThieu = ?, LuongTonToiThieuTruocKhiNhap = ?, TienNoToiDa = ?, LuongTonToiThieuSauKhiBan = ?, SuDungQuiDinh = ?",
		[soLuongNhapToiThieu, luongTonToiThieuTruocKhiNhap, tienNoToiDa, luongTonToiThieuSauKhiBan, suDungQuiDinh],
		(error, results) => {
			if (error) {
				res.status(500).send({ error: "Error updating THAMSO" });
			} else if (results.affectedRows === 0) {
				res.status(404).send({ error: "THAMSO not found" });
			}
		}
	);
});

// APIs khác
app.get("/theloai", (req, res) => {
	db.query("select * from THELOAI", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

// Khởi chạy server
app.listen(4000, () => console.log("App listening on port 4000"));
