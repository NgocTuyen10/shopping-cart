package com.example.comicsproject.dto;

import java.util.List;

import com.example.comicsproject.entity.KhachHang;

import lombok.Data;

@Data
public class DonDatMuaTruyenViewDTO {
	private KhachHang khachHang;
	private List<TruyenDonDatMuaDTO> truyenHoaDonDTOs;
}
