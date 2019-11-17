package com.example.comicsproject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HoaDonXuatTruyenUpdateDTO {
	private int donDatMuaTruyenId;
	private int trangThai;

	public HoaDonXuatTruyenUpdateDTO(int donDatMuaTruyenId, int trangThai) {
		this.donDatMuaTruyenId = donDatMuaTruyenId;
		this.trangThai = trangThai;
	}
}
