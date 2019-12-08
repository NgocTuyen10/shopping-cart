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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cuonTruyenId;
	@Column(name = "don_gia_nhap")
	private float donGiaNhap;
	@Column(name = "ngay_nhap")
	private Date ngayNhap;
	@Column(name = "trang_thai_ban")
	private boolean trangThaiBan;
	@Column(name = "truyen_id", nullable = false)
	private int truyenId;
	@ManyToOne(optional = false)
	@JoinColumn(name = "truyen_id", insertable = false, updatable = false)
	private Truyen truyen;
	@ManyToOne(optional = false)
	@JoinColumn(name = "nha_cung_cap_id", insertable = false, updatable = false)
	private NhaCungCap nhaCungCap;

	@ManyToOne(optional = false)
	@JoinColumn(name = "nhan_vien_id", nullable = false)
	private NhanVien nhanVien;

	@Column(name = "nha_cung_cap_id", nullable = false)
	private int nhaCungCapId;

}
