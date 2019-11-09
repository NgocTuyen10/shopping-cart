package com.example.comicsproject.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.DonDatMuaTruyenDTO;
import com.example.comicsproject.dto.TruyenDTO;
import com.example.comicsproject.entity.DonDatMuaTruyen;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.repository.DonDatMuaTruyenRepository;
import com.example.comicsproject.repository.KhachHangRepository;

@Service
@Transactional
public class DonDatMuaTruyenService {
	@Autowired
	private DonDatMuaTruyenRepository donDatMuaTruyenRepository;
	@Autowired
	private KhachHangRepository khachHangRepository;

	public void create(DonDatMuaTruyen donDatMuaTruyen) {
		this.donDatMuaTruyenRepository.save(donDatMuaTruyen);
	}

	public int getHoaDonXuatId() {
		return this.donDatMuaTruyenRepository.getNextId();
	}

	public void addToChiTietHoaDonXuat(int hoaDonXuatId, int truyenId, int soLuong) {
		this.donDatMuaTruyenRepository.addToChiTietDonDatMuaTruyen(hoaDonXuatId, truyenId, soLuong);
	}

	public void addHoaDonXuat(int hoaDonXuatId, Date ngayGhi, float tongTien, boolean trangThai) {
		this.donDatMuaTruyenRepository.addDonDatMuaTruyen(hoaDonXuatId, ngayGhi, tongTien, trangThai);
	}

	public void AddCartDataToDatabase(DonDatMuaTruyenDTO donDatMuaTruyenDTO) throws ParseException {

		int khachHangId = khachHangRepository.getNextKhachHangId();
		int donDatMuaTruyenId = donDatMuaTruyenRepository.getNextId();

		KhachHang khachHang = donDatMuaTruyenDTO.getKhachHang();
		khachHang.setKhachHangId(khachHangId);
		this.khachHangRepository.save(khachHang);

		DonDatMuaTruyen donDatMuaTruyen = new DonDatMuaTruyen();
		donDatMuaTruyen.setTongTien(donDatMuaTruyenDTO.getTotal());

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sf.parse(sf.format(new Date()));

		donDatMuaTruyen.setKhachHang(khachHang);
		donDatMuaTruyen.setNgayDat(dt);
		donDatMuaTruyen.setDonDatMuaTruyenId(donDatMuaTruyenId);
		/*
		 * this.hoaDonXuatService.addHoaDonXuat(hoaDonXuat.getHoaDonXuatId(),
		 * hoaDonXuat.getNgayGhi(), hoaDonXuat.getTongTien(), true);
		 */
		this.donDatMuaTruyenRepository.save(donDatMuaTruyen);

		List<TruyenDTO> truyenDTO = donDatMuaTruyenDTO.getTruyens();

		for (TruyenDTO truyen : truyenDTO) {
			this.donDatMuaTruyenRepository.addToChiTietDonDatMuaTruyen(donDatMuaTruyenId, truyen.getTruyenId(),
					truyen.getSoLuong());
		}
	}
}