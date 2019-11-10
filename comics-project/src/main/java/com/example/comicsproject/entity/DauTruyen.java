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
@Table(name = "dau_truyen")
@Getter
@Setter
public class DauTruyen {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int dauTruyenId;
	@Column(name = "tua_truyen")
	private String tuaTruyen;
	@Column(name = "trang_thai")
	private boolean trangThai;

	public DauTruyen() {

	}

	public DauTruyen(int dauTruyenId) {
		this.dauTruyenId = dauTruyenId;
	}

}
