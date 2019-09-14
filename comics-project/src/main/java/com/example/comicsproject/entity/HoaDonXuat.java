package com.example.comicsproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "hoa_don_xuat")
@Data
public class HoaDonXuat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int hoaDonXuatId;

	@Column(name = "ngay_ghi")
	private Date ngayGhi;

	@Column(name = "tong_tien")
	private float tongTien;
	
	@Column(name = "trang_thai")
	private boolean trangThai;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;
}
