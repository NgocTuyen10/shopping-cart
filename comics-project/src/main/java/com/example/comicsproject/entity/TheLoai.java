package com.example.comicsproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "the_loai")
@Data
public class TheLoai {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int theLoaiId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "trang_thai")
	private boolean trangThai;

	@Column(name = "ma_the_loai")
	private String maTheLoai;

	public TheLoai() {

	}

	public TheLoai(int theLoaiId) {
		this.theLoaiId = theLoaiId;
	}

}
