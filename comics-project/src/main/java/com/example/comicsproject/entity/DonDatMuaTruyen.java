package com.example.comicsproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Entity
@Table(name = "don_dat_mua_truyen")
@Data
public class DonDatMuaTruyen {
	@Id
	private int donDatMuaTruyenId;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "ngay_dat")
	private Date ngayDat;

	@Column(name = "tong_tien")
	private float tongTien;

	@Column(name = "trang_thai")
	private int trangThai = 1;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "khach_hang_id", nullable = false)
	private KhachHang khachHang;
}
