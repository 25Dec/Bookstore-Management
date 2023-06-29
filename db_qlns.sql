create database DB_QLNS;

use DB_QLNS;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

select @@sql_mode;

create table SACH(
	MaSach int primary key,
    TenSach varchar(200),
    DonGia double(20,1),
    SoLuong int,
    MaTG int,
    MaTL int
);

create table TACGIA(
	MaTG int primary key,
    TenTG varchar(200)
);

create table THELOAI(
	MaTL int primary key,
    TenTL varchar(200)
);

create table PHIEUNHAPSACH(
	MaPhieuNhapSach int primary key auto_increment,
    NgayNhapSach datetime
);

create table CT_PHIEUNHAP(
	MaCTPN int primary key auto_increment,
    DonGiaNhap double(20,1),
    SoLuong int,
    MaSach int,
    MaPhieuNhapSach int
);

create table HOADON(
	MaHD int primary key auto_increment,
    NgayLap date,
    TongTien double(20,1),
    SoTienTra double(20,1),
    ConLai double(20,1),
    MaKH int
);

create table CT_HOADON(
	MaHD int,
    MaCTHD int,
    DonGiaBan double(20,1),
    SoLuong int,
    MaSach int,
    primary key (MaHD, MaCTHD)
);

create table PHIEUTHUTIEN(
	MaPhieuThuTien int primary key auto_increment,
    NgayThuTien datetime,
    TongTien double(20,1),
    SoTienDaThu double(20,1),
    ConLai double(20,1),
    MaKH int
);

create table BAOCAOTON(
	MaBCT int primary key,
    TenBCT varchar(200),
	Thang int,
    Nam int
);

create table CT_BAOCAOTON(
	MaCTBCT int primary key auto_increment,
    TonDau int,
    PhatSinh int,
    DaBan int,
    TonCuoi int,
    MaSach int,
    MaBCT int
);

create table BAOCAOCONGNO(
	MaBCCN int primary key,
    TenBCCN varchar(200),
    Thang int,
    Nam int
);

create table CT_BAOCAOCONGNO(
	MaCTBCCN int primary key auto_increment,
    NoDau double(20,1),
    PhatSinh double(20,1),
    NoCuoi double(20,1),
    MaKH int,
    MaBCCN int
);

create table KHACHHANG(
	MaKH int primary key,
    HoTen varchar(200),
    DiaChi varchar(200),
    DienThoai varchar(10),
    Email varchar(200),
    SoTienNo double(20,1)
);

create table THAMSO(
	SoLuongNhapToiThieu int,
    LuongTonToiThieuTruocKhiNhap int,
    TienNoToiDa double(20,1),
    LuongTonToiThieuSauKhiBan int,
    SuDungQuiDinh bool
);

-- Dữ liệu bảng SACH
INSERT INTO SACH (MaSach, TenSach, DonGia, SoLuong, MaTG, MaTL)
VALUES (1,'Harry Potter and the Philosopher''s Stone', 99000, 200, 1, 1),
       (2,'To Kill a Mockingbird', 89000, 150, 2, 2),
       (3,'The Great Gatsby', 79000, 160, 3, 3),
       (4,'Pride and Prejudice', 68000, 180, 4, 4),
       (5,'1984', 99000, 220, 5, 5),
       (6,'The Catcher in the Rye', 89000, 300, 6, 6),
       (7,'Animal Farm', 76000, 280, 5, 7),
       (8,'The Hobbit', 100000, 250, 7, 8),
       (9,'The Lord of the Rings', 55000, 300, 7, 8),
       (10,'Brave New World', 77000, 290, 8, 9),
       (11,'The Da Vinci Code', 120000, 150, 9, 10),
       (12,'The Alchemist', 99000, 190, 10, 11),
       (13,'The Chronicles of Narnia', 120000, 210, 11, 12),
       (14,'Gone with the Wind', 109000, 220, 12, 13),
       (15,'The Fault in Our Stars', 89000, 230, 13, 14),
       (16,'The Hunger Games', 79000, 240, 14, 15),
       (17,'The Girl on the Train', 99000, 220, 15, 16),
       (18,'The Maze Runner', 69000, 150, 16, 17),
       (19,'Divergent', 79000, 160, 17, 18),
       (20,'The Book Thief', 89000, 170, 18, 19);

-- Dữ liệu bảng TACGIA
INSERT INTO TACGIA (MaTG, TenTG)
VALUES (1,'William Shakespeare'),
       (2,'Jane Austen'),
       (3,'Mark Twain'),
       (4,'Fyodor Dostoevsky'),
       (5,'Victor Hugo'),
       (6,'Leo Tolstoy'),
       (7,'Ernest Hemingway'),
       (8,'George Orwell'),
       (9,'J.R.R. Tolkien'),
       (10,'Gabriel Garcia Marquez'),
       (11,'Haruki Murakami'),
       (12,'Paulo Coelho'),
       (13,'Edgar Allan Poe'),
       (14,'Agatha Christie'),
       (15,'Franz Kafka'),
       (16,'Miguel de Cervantes'),
       (17,'Albert Camus'),
       (18,'Virginia Woolf'),
       (19,'Charles Dickens'),
       (20,'Hermann Hesse');

-- Dữ liệu bảng THELOAI
INSERT INTO THELOAI (MaTL, TenTL)
VALUES (1,'Văn học'),
       (2,'Khoa học'),
       (3,'Lịch sử'),
	   (4,'Tâm lý'),
	   (5,'Thiếu nhi'),
       (6,'Truyện tranh'),
       (7,'Tôn giáo'),
       (8,'Tiểu thuyết'),
       (9,'Hài hước'),
       (10,'Hồi ký'),
       (11,'Phiêu lưu'),
       (12,'Kỹ năng sống'),
       (13,'Sách giáo trình'),
       (14,'Trinh thám'),
       (15,'Tiểu sử'),
       (16,'Du lịch'),
       (17,'Kinh tế'),
       (18,'Y học'),
       (19,'Tâm linh'),
       (20,'Học đường');

-- Dữ liệu bảng PHIEUNHAPSACH
INSERT INTO PHIEUNHAPSACH (NgayNhapSach)
VALUES ('2023-01-01'),
       ('2023-01-15'),
       ('2023-01-30'),
       ('2023-02-01'),
       ('2023-02-15'),
       ('2023-02-27'),
       ('2023-03-01'),
       ('2023-03-15'),
       ('2023-03-30'),
       ('2023-04-01'),
       ('2023-04-15'),
       ('2023-04-30'),
       ('2023-05-01'),
       ('2023-05-15'),
       ('2023-05-30'),
       ('2023-06-01'),
       ('2023-06-02'),
       ('2023-06-03'),
       ('2023-06-04'),
       ('2023-06-05');

-- Dữ liệu bảng CT_PHIEUNHAP
INSERT INTO CT_PHIEUNHAP (MaPhieuNhapSach, DonGiaNhap, SoLuong, MaSach)
VALUES (1, 99000, 200, 1),
       (2, 89000, 150, 2),
       (3, 79000, 160, 3),
       (4, 68000, 180, 4),
       (5, 99000, 220, 5),
       (6, 89000, 300, 6),
       (7, 76000, 280, 7),
       (8, 100000, 250, 8),
       (9, 55000, 300, 9),
       (10, 77000, 290, 10),
       (11, 120000, 150, 11),
       (12, 99000, 190, 12),
       (13, 120000, 210, 13),
       (14, 109000, 220, 14),
       (15, 89000, 230, 15),
       (16, 79000, 240, 16),
       (17, 99000, 220, 17),
       (18, 69000, 150, 18),
       (19, 79000, 160, 19),
       (20, 89000, 170, 20);

-- Dữ liệu bảng BAOCAOTON
-- INSERT INTO BAOCAOTON (MaBCT, TenBCT, Thang, Nam)
-- VALUES (1,'Báo cáo tồn tháng 1', 1, 2023),
--        (2,'Báo cáo tồn tháng 2', 2, 2023),
--        (3,'Báo cáo tồn tháng 3', 3, 2023),
--        (4,'Báo cáo tồn tháng 4', 4, 2023),
--        (5,'Báo cáo tồn tháng 5', 5, 2023);

-- Dữ liệu bảng CT_BAOCAOTON
-- INSERT INTO CT_BAOCAOTON (TonDau, PhatSinh, TonCuoi, MaSach, MaBCT)
-- VALUES (100, 20, 120, 1, 1),
--        (150, 10, 160, 2, 1),
--        (200, 30, 230, 3, 2),
--        (120, 15, 135, 4, 2),
--        (80, 25, 105, 5, 3),
--        (220, 18, 238, 6, 3),
--        (90, 22, 112, 7, 4),
--        (180, 12, 192, 8, 4),
--        (120, 20, 140, 9, 5),
--        (150, 17, 167, 10, 5);

-- Dữ liệu bảng BAOCAOCONGNO
-- INSERT INTO BAOCAOCONGNO (MaBCCN, TenBCCN, Thang, Nam)
-- VALUES (1,'Báo cáo công nợ tháng 1', 1, 2023),
--        (2,'Báo cáo công nợ tháng 2', 2, 2023),
--        (3,'Báo cáo công nợ tháng 3', 3, 2023),
--        (4,'Báo cáo công nợ tháng 4', 4, 2023),
--        (5,'Báo cáo công nợ tháng 5', 5, 2023);

-- Dữ liệu bảng CT_BAOCAOCONGNO
-- INSERT INTO CT_BAOCAOCONGNO (NoDau, PhatSinh, NoCuoi, MaKH, MaBCCN)
-- VALUES (1000, 200, 1200, 1, 1),
--        (1500, 100, 1600, 2, 1),
--        (2000, 300, 2300, 3, 2),
--        (1200, 150, 1350, 4, 2),
--        (800, 250, 1050, 5, 3),
--        (2200, 180, 2380, 6, 3),
--        (900, 220, 1120, 7, 4),
--        (1800, 120, 1920, 8, 4),
--        (1200, 200, 1400, 9, 5),
--        (1500, 170, 1670, 10, 5);

-- Dữ liệu bảng THAMSO
INSERT INTO THAMSO VALUES
(150, 300, 20000, 20, true);

-- Add foreign keys for table SACH
ALTER TABLE SACH ADD CONSTRAINT FK_SACH_TACGIA
    FOREIGN KEY (MaTG)
    REFERENCES TACGIA (MaTG);
ALTER TABLE SACH ADD CONSTRAINT FK_SACH_THELOAI
    FOREIGN KEY (MaTL)
    REFERENCES THELOAI (MaTL);

-- Add foreign keys for table HOADON
ALTER TABLE HOADON ADD CONSTRAINT FK_HOADON_KHACHHANG
    FOREIGN KEY (MaKH)
    REFERENCES KHACHHANG (MaKH);

-- Add foreign keys for table CT_HOADON
ALTER TABLE CT_HOADON ADD CONSTRAINT FK_CT_HOADON_SACH
    FOREIGN KEY (MaSach)
    REFERENCES SACH (MaSach);
ALTER TABLE CT_HOADON ADD CONSTRAINT FK_CT_HOADON_HOADON
    FOREIGN KEY (MaHD)
    REFERENCES HOADON (MaHD);

-- Add foreign keys for table CT_PHIEUNHAP
ALTER TABLE CT_PHIEUNHAP ADD CONSTRAINT FK_CT_PHIEUNHAP_SACH
    FOREIGN KEY (MaSach)
    REFERENCES SACH (MaSach);
ALTER TABLE CT_PHIEUNHAP ADD CONSTRAINT FK_CT_PHIEUNHAP_PHIEUNHAPSACH
    FOREIGN KEY (MaPhieuNhapSach)
    REFERENCES PHIEUNHAPSACH (MaPhieuNhapSach);

-- Add foreign keys for table CT_BAOCAOTON
ALTER TABLE CT_BAOCAOTON ADD CONSTRAINT FK_CT_BAOCAOTON_SACH
    FOREIGN KEY (MaSach)
    REFERENCES SACH (MaSach);
ALTER TABLE CT_BAOCAOTON ADD CONSTRAINT FK_CT_BAOCAOTON_BAOCAOTON
    FOREIGN KEY (MaBCT)
    REFERENCES BAOCAOTON (MaBCT);

-- Add foreign keys for table PHIEUTHUTIEN
ALTER TABLE PHIEUTHUTIEN ADD CONSTRAINT FK_PHIEUTHUTIEN_KHACHHANG
    FOREIGN KEY (MaKH)
    REFERENCES KHACHHANG (MaKH);

-- Add foreign keys for table CT_BAOCAOCONGNO
ALTER TABLE CT_BAOCAOCONGNO ADD CONSTRAINT FK_CT_BAOCAOCONGNO_KHACHHANG
    FOREIGN KEY (MaKH)
    REFERENCES KHACHHANG (MaKH);
ALTER TABLE CT_BAOCAOCONGNO ADD CONSTRAINT FK_CT_BAOCAOCONGNO_BAOCAOCONGNO
    FOREIGN KEY (MaBCCN)
    REFERENCES BAOCAOCONGNO (MaBCCN);