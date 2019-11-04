package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class DichGiaCreateDTO {
	private int dichGiaId;

	public DichGiaCreateDTO() {
		super();
	}

	public DichGiaCreateDTO(int dichGiaId) {
		this.dichGiaId = dichGiaId;
	}
}
