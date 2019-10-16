package com.example.comicsproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class TacGiaDTO {
	private int tacGiaId;
	private String ten;
	private String maTacGia;
	private String diaChi;
	private Date ngaySinh;

	public TacGiaDTO() {

	}

	public TacGiaDTO(int tacGiaId, String ten) {
		this.tacGiaId = tacGiaId;
		this.ten = ten;
	}
}
