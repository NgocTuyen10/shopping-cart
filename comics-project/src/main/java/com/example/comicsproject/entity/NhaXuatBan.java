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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nha_xuat_ban")
@Getter
@Setter
public class NhaXuatBan {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int nhaXuatBanId;

	@Column(name = "ma_nha_xuat_ban")
	private String maNhaXuatBan;
	@Column(name = "ten")
	private String ten;
	@Column(name = "thong_tin")
	private String thongTin;
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.MERGE })
	@JoinTable(name = "truyen_nha_xuat_ban", joinColumns = {
			@JoinColumn(name = "nha_xuat_ban_id") }, inverseJoinColumns = { @JoinColumn(name = "truyen_id") })
	@JsonBackReference
	private List<Truyen> truyens;

}
