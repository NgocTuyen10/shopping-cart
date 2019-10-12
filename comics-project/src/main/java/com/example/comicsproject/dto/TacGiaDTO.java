package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TacGiaDTO {
	private int tacGiaId;
	private String ten;

	public TacGiaDTO(int tacGiaId, String ten) {
		this.tacGiaId = tacGiaId;
		this.ten = ten;
	}
}
