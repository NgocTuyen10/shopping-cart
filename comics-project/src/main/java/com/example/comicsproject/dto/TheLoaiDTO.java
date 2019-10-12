package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TheLoaiDTO {
	private int theLoaiId;
	private String ten;

	public TheLoaiDTO(int theLoaiId, String ten) {
		this.theLoaiId = theLoaiId;
		this.ten = ten;
	}
}
