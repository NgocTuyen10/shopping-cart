package com.example.comicsproject.entity;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Table(name = "chi_tiet_hoa_don_xuat")
@Data
public class ChiTietHoaDonXuat {

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "truyen_id")
	private Truyen truyenId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "hoa_don_xuat_id")
	private HoaDonXuat hoaDonXuat;

	@Column(name = "so_luong")
	private int soLuong;
}
