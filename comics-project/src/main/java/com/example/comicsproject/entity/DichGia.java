package com.example.comicsproject.entity;

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

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dich_gia")
@Getter
@Setter
public class DichGia {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int dichGiaId;

	@Column(name = "ten")
	private String ten;

	@Column(name = "ngay_sinh")
	private Date ngaySinh;

	@Column(name = "dia_chi")
	private String diaChi;

	@ManyToMany(fetch = FetchType.LAZY,cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "truyen_dich_gia", joinColumns = { @JoinColumn(name = "dich_gia_id") }, inverseJoinColumns = {
			@JoinColumn(name = "truyen_id") })
	@JsonBackReference
	private List<Truyen> truyens ;
}
