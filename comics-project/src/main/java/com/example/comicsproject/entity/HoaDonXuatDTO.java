package com.example.comicsproject.entity;

import java.util.List;

import lombok.Data;

@Data
public class HoaDonXuatDTO {
	private List<TruyenDTO> truyens;
	private int total;
	private KhachHang khachHang;
}
