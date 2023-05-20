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
app.get("/home/statbox/tongtien", (req, res) => {
	db.query("SELECT SUM(CT_HOADON.SoLuong * CT_HOADON.DonGiaBan) AS TongTien FROM CT_HOADON", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/home/statbox/thangnay", (req, res) => {
	db.query(
		"SELECT SUM(cth.SoLuong * cth.DonGiaBan) AS TongTienThangNay FROM CT_HOADON cth, HOADON hd  WHERE cth.MaHD = hd.MaHD and MONTH(hd.NgayLap) = MONTH(now()) AND YEAR(hd.NgayLap) = YEAR(now())",
		(err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		}
	);
});

app.get("/home/statbox/tuannay", (req, res) => {
	db.query(
		"SELECT SUM(CT_HOADON.SoLuong * CT_HOADON.DonGiaBan) AS TongTienTuanNay FROM HOADON, CT_HOADON WHERE  HOADON.NgayLap BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() and HOADON.MaHD = CT_HOADON.MaHD",
		(err, result) => {
			if (err) {
				throw err;
			}
			res.json(result);
		}
	);
});

app.get("/home/statbox/tongsach", (req, res) => {
	db.query("SELECT count(MaSach) as SoLuongSach FROM SACH", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/home/statbox/tongkhachhang", (req, res) => {
	db.query("SELECT count(MaKH) as SoLuongKhachHang FROM KHACHHANG", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.get("/home/danhsachsach", (req, res) => {
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

app.get("/sach/:id", (req, res) => {
	const id = req.params.id;
	db.query("select * from SACH where id = ?", [id], (error, results) => {
		if (error) {
			res.status(500).send({ error: "Error fetching book" });
		} else if (results.length === 0) {
			res.status(404).send({ error: "User not found" });
		} else {
			res.send(results[0]);
		}
	});
});

// APIs cho trang nhập sách
app.get("/addbook/danhsachsach", (req, res) => {
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

app.get("/addbook/books/:id", (req, res) => {
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

app.put("/addbook/books/:id", (req, res) => {
	const id = req.params.id;
	const { tenSach, tenTacGia, theLoai, soLuong, giaTien } = req.body;
	try {
		db.query(
			"update SACH set TenSach = ?, DonGia = ? , SoLuong = ? WHERE MaSach = ?;  ",
			[tenSach, giaTien, soLuong, id],
			(error, results) => {
				if (error) {
					res.status(500).send({ error: "Error updating SACH" });
				} else if (results.affectedRows === 0) {
					res.status(404).send({ error: "Book not found" });
				} else {
					res.send({ id });
				}
			}
		);
		db.query(
			"update TACGIA set TenTG = ?, DonGia = ? , SoLuong = ? WHERE MaSach = ?",
			[tenTacGia],
			(error, results) => {
				if (error) {
					res.status(500).send({ error: "Error updating TACGIA" });
				} else if (results.affectedRows === 0) {
					res.status(404).send({ error: "Book not found" });
				} else {
					res.send({ id });
				}
			}
		);
	} catch (e) {
		console.log(e);
	}
});

app.delete("/addbook/books/:id", (req, res) => {
	const maSach = req.params.id; // Mã sách cần xóa
	console.log(maSach);

	// Xóa các bản ghi liên quan trong bảng CT_PHIEUNHAP trước
	const deleteCTPhieuNhap = `DELETE FROM CT_PHIEUNHAP WHERE MaSach = ${maSach}`;
	db.query(deleteCTPhieuNhap, (error) => {
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

// APIs về trang tìm kiếm
app.get("/search/danhsachsach", (req, res) => {
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

// APIs về trang thu tiền
app.get("/payment/danhsachphieuthutien", (req, res) => {
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

// APIs về tham số
app.get("/thamso", (req, res) => {
	const sql = "SELECT * FROM THAMSO";

	db.query(sql, (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

app.put("/thamso", (req, res) => {
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
	db.query("select TenTL from THELOAI", (err, result) => {
		if (err) {
			throw err;
		}
		res.json(result);
	});
});

// Route POST để xử lý form tạo phiếu nhập sách
app.post("/phieunhapsach", (req, res) => {
	const { tenSach, tenTacGia, theLoai, soLuong, giaTien } = req.body;

	// Thực hiện truy vấn SQL để kiểm tra và lấy mã tác giả
	const queryTacGia = `SELECT MaTG FROM TACGIA WHERE TenTG = '${tenTacGia}'`;
	db.query(queryTacGia, (error, results) => {
		if (error) {
			console.error("Lỗi truy vấn: " + error);
			return;
		}

		let maTacGia;
		if (results.length > 0) {
			maTacGia = results[0].MaTG;
		} else {
			// Thêm tác giả mới vào bảng TACGIA và lấy mã tác giả vừa thêm
			const insertTacGia = `INSERT INTO TACGIA (TenTG) VALUES ('${tenTacGia}')`;
			db.query(insertTacGia, (err, result) => {
				if (err) {
					console.error("Lỗi thêm tác giả: " + err);
					return;
				}
				maTacGia = result.insertId;
			});
		}

		// Thực hiện truy vấn SQL để kiểm tra và lấy mã thể loại
		const queryTheLoai = `SELECT MaTL FROM THELOAI WHERE TenTL = '${theLoai}'`;
		db.query(queryTheLoai, (err, results) => {
			if (err) {
				console.error("Lỗi truy vấn: " + err);
				return;
			}

			let maTheLoai;
			if (results.length > 0) {
				maTheLoai = results[0].MaTL;
			} else {
				// Thêm thể loại mới vào bảng THELOAI và lấy mã thể loại vừa thêm
				const insertTheLoai = `INSERT INTO THELOAI (TenTL) VALUES ('${theLoai}')`;
				db.query(insertTheLoai, (error, result) => {
					if (error) {
						console.error("Lỗi thêm thể loại: " + error);
						return;
					}
					maTheLoai = result.insertId;
				});
			}

			// Thực hiện truy vấn SQL để thêm thông tin sách vào bảng SACH
			const insertSach = `INSERT INTO SACH (TenSach,DonGia, SoLuong, MaTG, MaTL) VALUES ('${tenSach}', ${giaTien}, ${soLuong}, ${maTacGia}, ${maTheLoai})`;
			db.query(insertSach, (error) => {
				if (error) {
					console.error("Lỗi thêm sách: " + error);
					return;
				}
				// Thực hiện truy vấn SQL để lấy mã sách vừa thêm
				const queryMaSach = "SELECT LAST_INSERT_ID() as MaSach";
				db.query(queryMaSach, (err, results) => {
					if (err) {
						console.error("Lỗi truy vấn: " + err);
						return;
					}

					const maSach = results[0].MaSach;

					// Thêm thông tin phiếu nhập sách vào bảng PHIEUNHAPSACH
					const insertPhieuNhapSach = "INSERT INTO PHIEUNHAPSACH (NgayNhapSach) VALUES (CURRENT_DATE())";
					db.query(insertPhieuNhapSach, (err) => {
						if (err) {
							console.error("Lỗi thêm phiếu nhập sách: " + err);
							return;
						}

						// Thực hiện truy vấn SQL để lấy mã phiếu nhập sách vừa thêm
						const queryMaPhieuNhapSach = "SELECT LAST_INSERT_ID() as MaPhieuNhapSach";
						db.query(queryMaPhieuNhapSach, (err, results) => {
							if (err) {
								console.error("Lỗi truy vấn: " + err);
								return;
							}

							const maPhieuNhapSach = results[0].MaPhieuNhapSach;

							// Thêm thông tin chi tiết phiếu nhập sách vào bảng CT_PHIEUNHAP
							const insertCTPhieuNhap = `INSERT INTO CT_PHIEUNHAP (MaSach, MaPhieuNhapSach, DonGiaNhap, SoLuong) VALUES (${maSach}, ${maPhieuNhapSach}, ${giaTien}, ${soLuong})`;
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
	});
});

// Khởi chạy server
app.listen(4000, () => console.log("App listening on port 4000"));
