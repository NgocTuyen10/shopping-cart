package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TruyenHoaDonDTO {
	private int truyenId;
	private String ten;
	private float donGiaBan;
	private int soLuong;

	public TruyenHoaDonDTO(String ten, float donGiaBan, int soLuong) {
		this.donGiaBan = donGiaBan;
		this.ten = ten;
		this.soLuong = soLuong;
	}
}
