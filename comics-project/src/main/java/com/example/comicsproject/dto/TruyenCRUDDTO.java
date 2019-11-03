package com.example.comicsproject.dto;

import java.util.List;

import com.example.comicsproject.entity.DichGia;
import com.example.comicsproject.entity.NhaXuatBan;
import com.example.comicsproject.entity.TacGia;
import com.example.comicsproject.entity.TheLoai;

import lombok.Data;

@Data
public class TruyenCRUDDTO {
	private int truyenId;
	private String maTruyen;
	private float donGiaNhap;
	private float donGiaBan;
	private TheLoai theLoai;
	private int soLuongCon;
	private int soLuongBan;
	private boolean denTrang;
	private List<TacGia> tacGias;
	private List<DichGia> dichGias;
	private NhaXuatBan nhaXuatBan;
}
