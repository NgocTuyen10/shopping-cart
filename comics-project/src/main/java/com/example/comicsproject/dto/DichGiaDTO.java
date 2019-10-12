package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class DichGiaDTO {
	private int dichGiaId;
	private String ten;

	public DichGiaDTO(int dichGiaId, String ten) {
		this.dichGiaId = dichGiaId;
		this.ten = ten;
	}
}
