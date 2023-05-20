create database DB_QLNS;

use DB_QLNS;

create table SACH(
	MaSach int primary key auto_increment,
    TenSach varchar(200),
    DonGia double(20,1),
    SoLuong int,
    MaTG int,
    MaTL int
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

create table TACGIA(
	MaTG int primary key auto_increment,
    TenTG varchar(200)
);

create table THELOAI(
	MaTL int primary key auto_increment,
    TenTL varchar(200)
);

create table PHIEUNHAPSACH(
	MaPhieuNhapSach int primary key auto_increment,
    NgayNhapSach date
);

create table CT_PHIEUNHAP(
	MaCTPN int primary key auto_increment,
    DonGiaNhap double(20,1),
    SoLuong int,
    MaSach int,
    MaPhieuNhapSach int
);

create table BAOCAOTON(
	MaBCT int primary key auto_increment,
    TenBCT varchar(200),
    Thang date
);

create table CT_BAOCAOTON(
	MaCTBCT int primary key auto_increment,
    TonDau double(20,1),
    PhatSinh double(20,1),
    TonCuoi double(20,1),
    MaSach int,
    MaBCT int
);

create table BAOCAOCONGNO(
	MaBCCN int primary key auto_increment,
    TenBCCN varchar(200),
    Thang date
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
	MaKH int primary key auto_increment,
    HoTen varchar(200),
    DiaChi varchar(200),
    DienThoai varchar(10),
    Email varchar(200),
    SoTienNo double(20,1)
);

create table PHIEUTHUTIEN(
	MaPhieuThuTien int primary key auto_increment,
    NgayThuTien date,
    SoTienThu double(20,1),
    MaKH int
);

create table THAMSO(
	SoLuongNhapToiThieu int,
    LuongTonToiThieuTruocKhiNhap int,
    TienNoToiDa double(20,1),
    LuongTonToiThieuSauKhiBan int,
    SuDungQuiDinh bool
);

-- Dữ liệu bảng SACH
INSERT INTO SACH (TenSach, DonGia, SoLuong, MaTG, MaTL)
VALUES ('Harry Potter and the Philosopher''s Stone', 99000, 50, 1, 1),
       ('To Kill a Mockingbird', 89000, 30, 2, 2),
       ('The Great Gatsby', 79000, 25, 3, 3),
       ('Pride and Prejudice', 68000, 40, 4, 4),
       ('1984', 99000, 20, 5, 5),
       ('The Catcher in the Rye', 89000, 35, 6, 6),
       ('Animal Farm', 76000, 45, 5, 7),
       ('The Hobbit', 100000, 30, 7, 8),
       ('The Lord of the Rings', 55000, 15, 7, 8),
       ('Brave New World', 77000, 25, 8, 9),
       ('The Da Vinci Code', 120000, 20, 9, 10),
       ('The Alchemist', 99000, 15, 10, 11),
       ('The Chronicles of Narnia', 120000, 25, 11, 12),
       ('Gone with the Wind', 109000, 30, 12, 13),
       ('The Fault in Our Stars', 89000, 35, 13, 14),
       ('The Hunger Games', 79000, 40, 14, 15),
       ('The Girl on the Train', 99000, 20, 15, 16),
       ('The Maze Runner', 69000, 25, 16, 17),
       ('Divergent', 79000, 30, 17, 18),
       ('The Book Thief', 89000, 35, 18, 19);

-- Dữ liệu bảng hóa đơn
INSERT INTO HOADON (NgayLap, TongTien, SoTienTra, ConLai, MaKH)
VALUES ('2023-01-01', 100.5, 50.25, 50.25, 1),
       ('2023-01-02', 80.0, 40.0, 40.0, 2),
       ('2023-01-03', 120.75, 60.375, 60.375, 3),
       ('2023-01-04', 90.25, 45.125, 45.125, 4),
       ('2023-01-05', 150.0, 75.0, 75.0, 5),
       ('2023-01-06', 70.5, 35.25, 35.25, 6),
       ('2023-01-07', 200.25, 100.125, 100.125, 7),
       ('2023-01-08', 180.0, 90.0, 90.0, 8),
       ('2023-01-09', 130.75, 65.375, 65.375, 9),
       ('2023-01-10', 110.25, 55.125, 55.125, 10),
       ('2023-01-11', 95.0, 47.5, 47.5, 11),
       ('2023-01-12', 120.5, 60.25, 60.25, 12),
       ('2023-01-13', 85.75, 42.875, 42.875, 13),
       ('2023-01-14', 140.25, 70.125, 70.125, 14),
       ('2023-01-15', 75.0, 37.5, 37.5, 15),
       ('2023-01-16', 220.5, 110.25, 110.25, 16),
       ('2023-01-17', 160.0, 80.0, 80.0, 17),
       ('2023-01-18', 105.75, 52.875, 52.875, 18),
       ('2023-01-19', 95.25, 47.625, 47.625, 19),
       ('2023-01-20', 180.0, 90.0, 90.0, 20);

-- Dữ liệu bảng CT_HOADON
INSERT INTO CT_HOADON (MaHD, MaCTHD, DonGiaBan, SoLuong, MaSach)
VALUES (1, 1, 9.99, 2, 1),
       (1, 2, 12.99, 1, 2),
       (2, 1, 8.99, 3, 3),
       (2, 2, 10.99, 2, 4),
       (3, 1, 7.99, 1, 5),
       (3, 2, 9.99, 4, 6),
       (4, 1, 6.99, 2, 7),
       (4, 2, 8.99, 3, 8),
       (5, 1, 10.99, 1, 9),
       (5, 2, 12.99, 2, 10),
       (6, 1, 8.99, 3, 11),
       (6, 2, 10.99, 1, 12),
       (7, 1, 7.99, 2, 13),
       (7, 2, 9.99, 4, 14),
       (8, 1, 6.99, 1, 15),
       (8, 2, 8.99, 3, 16),
       (9, 1, 10.99, 1, 17),
       (9, 2, 12.99, 2, 18),
       (10, 1, 8.99, 3, 19),
       (10, 2, 10.99, 1, 20);

-- Dữ liệu bảng TACGIA
INSERT INTO TACGIA (TenTG)
VALUES ('William Shakespeare'),
       ('Jane Austen'),
       ('Mark Twain'),
       ('Fyodor Dostoevsky'),
       ('Victor Hugo'),
       ('Leo Tolstoy'),
       ('Ernest Hemingway'),
       ('George Orwell'),
       ('J.R.R. Tolkien'),
       ('Gabriel Garcia Marquez'),
       ('Haruki Murakami'),
       ('Paulo Coelho'),
       ('Edgar Allan Poe'),
       ('Agatha Christie'),
       ('Franz Kafka'),
       ('Miguel de Cervantes'),
       ('Albert Camus'),
       ('Virginia Woolf'),
       ('Charles Dickens'),
       ('Hermann Hesse');

-- Dữ liệu bảng THELOAI
INSERT INTO THELOAI (TenTL)
VALUES ('Văn học'),
       ('Khoa học'),
       ('Lịch sử'),
	   ('Tâm lý'),
	   ('Thiếu nhi'),
       ('Truyện tranh'),
       ('Tôn giáo'),
       ('Tiểu thuyết'),
       ('Hài hước'),
       ('Hồi ký'),
       ('Phiêu lưu'),
       ('Kỹ năng sống'),
       ('Sách giáo trình'),
       ('Trinh thám'),
       ('Tiểu sử'),
       ('Du lịch'),
       ('Kinh tế'),
       ('Y học'),
       ('Tâm linh'),
       ('Học đường');

-- Dữ liệu bảng PHIEUNHAPSACH
INSERT INTO PHIEUNHAPSACH (NgayNhapSach)
VALUES ('2023-01-01'),
       ('2023-02-03'),
       ('2023-03-05'),
       ('2023-04-10'),
       ('2023-05-15'),
       ('2023-06-20'),
       ('2023-07-25'),
       ('2023-08-30'),
       ('2023-09-02'),
       ('2023-10-05'),
       ('2023-11-10'),
       ('2023-12-15'),
       ('2024-01-20'),
       ('2024-02-25'),
       ('2024-03-01'),
       ('2024-04-05'),
       ('2024-05-10'),
       ('2024-06-15'),
       ('2024-07-20'),
       ('2024-08-25');

-- Dữ liệu bảng CT_PHIEUNHAP
INSERT INTO CT_PHIEUNHAP (MaPhieuNhapSach, DonGiaNhap, SoLuong, MaSach)
VALUES (1, 10.5, 20, 1),
       (1, 12.8, 15, 2),
       (2, 9.2, 30, 3),
       (2, 14.7, 10, 4),
       (3, 11.3, 25, 5),
       (3, 13.6, 18, 6),
       (4, 8.9, 35, 7),
       (4, 16.2, 12, 8),
       (5, 10.7, 22, 9),
       (5, 11.9, 17, 10),
       (6, 12.4, 28, 11),
       (6, 14.5, 14, 12),
       (7, 9.8, 32, 13),
       (7, 15.1, 16, 14),
       (8, 10.2, 18, 15),
       (8, 13.9, 20, 16),
       (9, 11.6, 24, 17),
       (9, 12.3, 13, 18),
       (10, 9.5, 26, 19),
       (10, 14.8, 11, 20);

-- Dữ liệu bảng BAOCAOTON
INSERT INTO BAOCAOTON (TenBCT, Thang)
VALUES ('Báo cáo tồn tháng 1','2023-01-01'),
       ('Báo cáo tồn tháng 2','2023-02-01'),
       ('Báo cáo tồn tháng 3','2023-03-01'),
       ('Báo cáo tồn tháng 4','2023-04-01'),
       ('Báo cáo tồn tháng 5','2023-05-01');

-- Dữ liệu bảng CT_BAOCAOTON
INSERT INTO CT_BAOCAOTON (TonDau, PhatSinh, TonCuoi, MaSach, MaBCT)
VALUES (100, 20, 120, 1, 1),
       (150, 10, 160, 2, 1),
       (200, 30, 230, 3, 2),
       (120, 15, 135, 4, 2),
       (80, 25, 105, 5, 3),
       (220, 18, 238, 6, 3),
       (90, 22, 112, 7, 4),
       (180, 12, 192, 8, 4),
       (120, 20, 140, 9, 5),
       (150, 17, 167, 10, 5);

-- Dữ liệu bảng BAOCAOCONGNO
INSERT INTO BAOCAOCONGNO (TenBCCN, Thang)
VALUES ('Báo cáo công nợ tháng 1','2023-01-01'),
       ('Báo cáo công nợ tháng 2','2023-02-01'),
       ('Báo cáo công nợ tháng 3','2023-03-01'),
       ('Báo cáo công nợ tháng 4','2023-04-01'),
       ('Báo cáo công nợ tháng 5','2023-05-01');

-- Dữ liệu bảng CT_BAOCAOCONGNO
INSERT INTO CT_BAOCAOCONGNO (NoDau, PhatSinh, NoCuoi, MaKH, MaBCCN)
VALUES (1000, 200, 1200, 1, 1),
       (1500, 100, 1600, 2, 1),
       (2000, 300, 2300, 3, 2),
       (1200, 150, 1350, 4, 2),
       (800, 250, 1050, 5, 3),
       (2200, 180, 2380, 6, 3),
       (900, 220, 1120, 7, 4),
       (1800, 120, 1920, 8, 4),
       (1200, 200, 1400, 9, 5),
       (1500, 170, 1670, 10, 5);

-- Dữ liệu bảng KHACHHANG
INSERT INTO KHACHHANG (HoTen, DiaChi, DienThoai, Email, SoTienNo)
VALUES ('Nguyen Van A', '123 ABC Street', '0123456789', 'nva@example.com', 10000),
       ('Tran Thi B', '456 XYZ Street', '0987654321', 'ttb@example.com', 15000),
       ('Le Van C', '789 DEF Street', '0369852147', 'lvc@example.com', 20000),
       ('Pham Thi D', '321 GHI Street', '0541236987', 'ptd@example.com', 12000),
       ('Hoang Van E', '654 JKL Street', '0321456879', 'hve@example.com', 32000),
       ('Do Thi F', '987 MNO Street', '0912345678', 'dtf@example.com', 22000),
       ('Vo Van G', '321 PQR Street', '0365987412', 'vvg@example.com', 30000),
       ('Ngo Thi H', '654 STU Street', '0987456123', 'nth@example.com', 18000),
       ('Mai Van I', '987 VWX Street', '0123456789', 'mvi@example.com', 12000),
       ('Truong Thi K', '123 YZ Street', '0987654321', 'ttk@example.com', 15000),
       ('Nguyen Van L', '456 ABC Street', '0369852147', 'nvl@example.com', 20000),
       ('Tran Thi M', '789 XYZ Street', '0541236987', 'ttm@example.com', 11000),
       ('Le Van N', '321 DEF Street', '0321456879', 'lvn@example.com', 10000),
       ('Pham Thi O', '654 GHI Street', '0912345678', 'pto@example.com', 16000),
       ('Hoang Van P', '987 JKL Street', '0365987412', 'hvp@example.com', 14000),
       ('Do Thi Q', '321 MNO Street', '0987456123', 'dtq@example.com', 18000),
       ('Vo Van R', '654 PQR Street', '0123456789', 'vvr@example.com', 19000),
       ('Ngo Thi S', '987 STU Street', '0987654321', 'nts@example.com', 13000),
       ('Mai Van T', '321 VWX Street', '0369852147', 'mvt@example.com', 11000),
       ('Truong Thi U', '654 YZ Street', '0541236987', 'ttu@example.com', 17000);

-- Dữ liệu bảng PHIEUTHUTIEN
INSERT INTO PHIEUTHUTIEN (NgayThuTien, SoTienThu, MaKH)
VALUES ('2023-01-01', 5000, 1),
       ('2023-02-01', 8000, 2),
       ('2023-03-01', 12000, 3),
       ('2023-04-01', 9000, 4),
       ('2023-05-01', 6000, 5);

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

-- Add foreign keys for table CT_BAOCAOCONGNO
ALTER TABLE CT_BAOCAOCONGNO ADD CONSTRAINT FK_CT_BAOCAOCONGNO_KHACHHANG
    FOREIGN KEY (MaKH)
    REFERENCES KHACHHANG (MaKH);
ALTER TABLE CT_BAOCAOCONGNO ADD CONSTRAINT FK_CT_BAOCAOCONGNO_BAOCAOCONGNO
    FOREIGN KEY (MaBCCN)
    REFERENCES BAOCAOCONGNO (MaBCCN);

-- Add foreign keys for table PHIEUTHUTIEN
ALTER TABLE PHIEUTHUTIEN ADD CONSTRAINT FK_PHIEUTHUTIEN_KHACHHANG
    FOREIGN KEY (MaKH)
    REFERENCES KHACHHANG (MaKH);
    

