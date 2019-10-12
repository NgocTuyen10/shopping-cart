package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class NhaXuatBanDTO {
	private int nhaXuatBanId;
	private String ten;

	public NhaXuatBanDTO(int nhaXuatBanId, String ten) {
		this.nhaXuatBanId = nhaXuatBanId;
		this.ten = ten;
	}
}
