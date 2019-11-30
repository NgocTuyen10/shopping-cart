package com.example.comicsproject.dto;

import java.util.List;

import lombok.Data;

@Data
public class TruyenCRUDDTO {
	private int truyenId;
	private String maTruyen;
	private String ten;
	private float donGiaBan;
	private TheLoaiCreateDTO theLoai;
	private boolean denTrang;
	private List<TacGiaCreateDTO> tacGias;
	private List<DichGiaCreateDTO> dichGias;
	private NhaXuatBanCreateDTO nhaXuatBan;
	private int dauTruyenId;
}
