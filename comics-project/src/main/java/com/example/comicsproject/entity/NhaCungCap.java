package com.example.comicsproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nha_cung_cap")
@Getter
@Setter
public class NhaCungCap {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int nhaCungCapId;
	@Column(name = "ten")
	private String ten;
	@Column(name = "so_dien_thoai")
	private String soDienThoai;
	@Column(name = "trang_thai")
	private boolean trangThai;
}
