package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class TheLoaiCreateDTO {
	private int theLoaiId;

	public TheLoaiCreateDTO() {
		super();
	}

	public TheLoaiCreateDTO(int theLoaiId) {
		this.theLoaiId = theLoaiId;
	}
}
