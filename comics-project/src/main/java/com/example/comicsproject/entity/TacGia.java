package com.example.comicsproject.entity;

import java.util.ArrayList;
import java.util.Date;
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
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "tac_gia")
@Data
public class TacGia {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int tacGiaId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "ma_tac_gia")
	private String maTacGia;

	@Column(name = "dia_chi")
	private String diaChi;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name = "ngay_sinh")
	private Date ngaySinh;
	 
	@ManyToMany(fetch = FetchType.LAZY,cascade = { CascadeType.ALL, CascadeType.MERGE })
	@JoinTable(name = "truyen_tac_gia", joinColumns = { @JoinColumn(name = "tac_gia_id") }, inverseJoinColumns = {
			@JoinColumn(name = "truyen_id") })
	@JsonBackReference
	private List<Truyen> truyens = new ArrayList<Truyen>();

}
