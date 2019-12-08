package com.example.comicsproject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TruyenNhapDTO {
	private int truyenId;
	private int soLuong;
	private float donGiaNhap;
	private int nhaCungCapId;
}
