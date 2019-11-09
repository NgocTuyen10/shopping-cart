package com.example.comicsproject.dto;

import java.util.List;

import com.example.comicsproject.entity.KhachHang;

import lombok.Data;

@Data
public class DonDatMuaTruyenDTO {
	private List<TruyenDTO> truyens;
	private int total;
	private KhachHang khachHang;
}
