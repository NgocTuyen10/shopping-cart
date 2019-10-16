package com.example.comicsproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class DichGiaDTO {
	private int dichGiaId;
	private String ten;
	private String maDichGia;
	private String diaChi;
	private Date ngaySinh;

	public DichGiaDTO() {
		
	}
	public DichGiaDTO(int dichGiaId, String ten) {
		this.dichGiaId = dichGiaId;
		this.ten = ten;
	}
}
