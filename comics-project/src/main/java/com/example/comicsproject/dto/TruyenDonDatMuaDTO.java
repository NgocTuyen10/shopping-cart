package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TruyenDonDatMuaDTO {
	private int truyenId;
	private String ten;
	private float donGiaBan;
	private int soLuong;

	public TruyenDonDatMuaDTO(String ten, float donGiaBan, int soLuong) {
		this.donGiaBan = donGiaBan;
		this.ten = ten;
		this.soLuong = soLuong;
	}
}
