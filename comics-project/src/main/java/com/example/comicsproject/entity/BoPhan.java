package com.example.comicsproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "bo_phan")
@Data
public class BoPhan {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int boPhanId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "nguoi_quan_ly_id")
	private int nguoiQuanLyId;

	@Column(name = "trang_thai")
	private boolean trangThai;

}
