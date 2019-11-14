package com.example.comicsproject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TruyenHoaDonXuatDTO {
	private int truyenId;
	private String maTruyen;
	private String tenTruyen;
	private long soLuongCon;
	private float donGiaBan;
	private String tuaTruyen;

	public TruyenHoaDonXuatDTO(int truyenId, String maTruyen, String tenTruyen, long soLuongCon, float donGiaBan,
			String tuaTruyen) {
		this.truyenId = truyenId;
		this.maTruyen = maTruyen;
		this.tenTruyen = tenTruyen;
		this.soLuongCon = soLuongCon;
		this.donGiaBan = donGiaBan;
		this.tuaTruyen = tuaTruyen;
	}
}
