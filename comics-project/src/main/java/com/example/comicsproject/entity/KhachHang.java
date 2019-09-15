package com.example.comicsproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "khach_hang")
@Data
public class KhachHang {
	@Id
	private int khachHangId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "so_dien_thoai")
	private String soDienThoai;

	@Column(name = "dia_chi")
	private String diaChi;

	@Column(name = "email")
	private String email;

	@Column(name = "ngay_sinh")
	private Date ngaySinh;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	private Account account;

}
