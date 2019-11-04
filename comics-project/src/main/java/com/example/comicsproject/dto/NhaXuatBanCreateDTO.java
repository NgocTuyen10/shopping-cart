package com.example.comicsproject.dto;

import lombok.Data;

@Data
public class NhaXuatBanCreateDTO {
	private int nhaXuatBanId;

	public NhaXuatBanCreateDTO() {
		super();
	}

	public NhaXuatBanCreateDTO(int nhaXuatBanId) {
		this.nhaXuatBanId = nhaXuatBanId;
	}
}
