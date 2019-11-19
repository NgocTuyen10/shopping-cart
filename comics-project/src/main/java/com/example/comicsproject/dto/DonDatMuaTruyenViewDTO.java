package com.example.comicsproject.dto;

import java.util.Date;
import java.util.List;

import com.example.comicsproject.entity.KhachHang;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class DonDatMuaTruyenViewDTO {
	private KhachHang khachHang;
	private List<TruyenDonDatMuaDTO> truyenHoaDonDTOs;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date ngayDat;
}
