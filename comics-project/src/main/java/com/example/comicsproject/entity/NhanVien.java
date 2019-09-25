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

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Table(name="nhan_vien")
@Data
public class NhanVien {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int nhanVienId;
	
	@Column(name = "ten")
	private String ten;
	
	@Column(name = "so_dien_thoai")
	private String soDienThoai;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name = "ngay_sinh")
	private Date ngaySinh;
	
	@Column(name = "gioi_tinh")
	private int gioiTinh;
	
	@Column(name = "luong_thang")
	private float luongThang;
	
	@Column(name = "trang_thai")
	private boolean trangThai;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="bo_phan_id")
	private BoPhan boPhan;
}
