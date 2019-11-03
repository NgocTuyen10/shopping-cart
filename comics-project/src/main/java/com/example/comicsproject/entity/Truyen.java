package com.example.comicsproject.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Table(name = "truyen")
@Data
public class Truyen {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int truyenId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "don_gia_nhap")
	private float donGiaNhap;

	@Column(name = "don_gia_ban")
	private float donGiaBan;

	@Column(name = "ghi_chu")
	private String ghiChu;

	@Column(name = "so_luong_ban")
	private int soLuongBan;

	@Column(name = "so_luong_con")
	private int soLuongCon;

	@Column(name = "trang_thai")
	private boolean trangThai;

	@Column(name = "anh")
	private String anh;

	@Column(name = "den_trang")
	private boolean denTrang;

	@Column(name = "ma_truyen")
	private String maTruyen;

	@ManyToOne
	@JoinColumn(name = "the_loai_id", nullable = false)
	private TheLoai theLoai;

	// 12-10-2019 update by TuyenBN
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.MERGE })
	@JoinTable(name = "truyen_tac_gia", joinColumns = { @JoinColumn(name = "truyen_id") }, inverseJoinColumns = {
			@JoinColumn(name = "tac_gia_id") })
	@JsonManagedReference
	private List<TacGia> tacGias;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.MERGE })
	@JoinTable(name = "truyen_dich_gia", joinColumns = { @JoinColumn(name = "truyen_id") }, inverseJoinColumns = {
			@JoinColumn(name = "dich_gia_id") })
	@JsonManagedReference
	private List<DichGia> dichGias;

//	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.MERGE })
//	@JoinTable(name = "truyen_nha_xuat_ban", joinColumns = { @JoinColumn(name = "truyen_id") }, inverseJoinColumns = {
//			@JoinColumn(name = "nha_xuat_ban_id") })
//	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "nha_xuat_ban_id", nullable = false)
	private NhaXuatBan nhaXuatBan;

}
