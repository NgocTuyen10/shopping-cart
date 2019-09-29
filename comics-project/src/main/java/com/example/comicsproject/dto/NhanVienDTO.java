package com.example.comicsproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NhanVienDTO {
	private String ten;
	private String soDienThoai;
	private Date ngaySinh;
	private int gioiTinh;
	private float luongThang;
	private int boPhan;
}
