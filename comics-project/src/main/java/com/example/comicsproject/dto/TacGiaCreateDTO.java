package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TacGiaCreateDTO {
	private int tacGiaId;

	public TacGiaCreateDTO() {
		super();
	}

	public TacGiaCreateDTO(int tacGiaId) {
		this.tacGiaId = tacGiaId;
	}
}
