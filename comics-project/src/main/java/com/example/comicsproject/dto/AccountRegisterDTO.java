package com.example.comicsproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class AccountRegisterDTO {

	private String ten;
	private String soDienThoai;
	private Date ngaySinh;
	private String diaChi;
	private String email;
	private String username;
	private String password;

}
