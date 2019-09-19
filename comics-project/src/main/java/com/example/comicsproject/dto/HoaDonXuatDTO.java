package com.example.comicsproject.dto;

import java.util.List;

import com.example.comicsproject.entity.KhachHang;

import lombok.Data;

@Data
public class HoaDonXuatDTO {
	private List<TruyenDTO> truyens;
	private int total;
	private KhachHang khachHang;
}
