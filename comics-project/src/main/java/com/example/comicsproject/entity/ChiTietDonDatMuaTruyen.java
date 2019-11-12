package com.example.comicsproject.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "chi_tiet_don_dat_mua_truyen")
@Data
@IdClass(MyKey.class)
public class ChiTietDonDatMuaTruyen {
	@Id
	private int truyenId;
	@Id
	private int donDatMuaTruyenId;

	@Column(name = "so_luong")
	private int soLuong;
}

class MyKey implements Serializable {

	private int donDatMuaTruyenId;

	private int truyenId;
}
