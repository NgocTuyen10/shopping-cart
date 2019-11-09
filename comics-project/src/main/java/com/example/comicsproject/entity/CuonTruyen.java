package com.example.comicsproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cuon_truyen")
@Getter
@Setter
public class CuonTruyen {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int cuonTruyenId;
	@Column(name = "don_gia_nhap")
	private float donGiaNhap;
	@Column(name = "ngay_nhap")
	private Date ngayNhap;
	@Column(name = "trang_thai")
	private boolean trangThai;
	@ManyToOne
	@JoinColumn(name = "truyen_id", nullable = false)
	private Truyen truyen;
	
	@ManyToOne
	@JoinColumn(name = "nha_cung_cap_id", nullable = false)
	private NhaCungCap nhaCungCap;
	
	@ManyToOne
	@JoinColumn(name = "nhan_vien_id", nullable = false)
	private NhanVien nhanVien;
	
}
