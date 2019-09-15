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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "hoa_don_xuat")
@Data
public class HoaDonXuat {

	@Id
	private int hoaDonXuatId;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "ngay_ghi")
	private Date ngayGhi;

	@Column(name = "tong_tien")
	private float tongTien;

	@Column(name = "trang_thai")
	private boolean trangThai = true;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "khach_hang_id")
	private KhachHang khachHang;
}
