package com.example.comicsproject.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.comicsproject.entity.HoaDonXuat;
import com.example.comicsproject.entity.HoaDonXuatDTO;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.entity.TruyenDTO;
import com.example.comicsproject.repository.HoaDonXuatRepository;
import com.example.comicsproject.repository.KhachHangRepository;

@Service
@Transactional
public class HoaDonXuatService {
	@Autowired
	private HoaDonXuatRepository hoaDonXuatRepository;
	
	@Autowired
	private KhachHangRepository khachHangRepository;

	public void create(HoaDonXuat hoaDonXuat) {
		this.hoaDonXuatRepository.save(hoaDonXuat);
	}

	public int getHoaDonXuatId() {
		return this.hoaDonXuatRepository.getNextId();
	}

	public void addToChiTietHoaDonXuat(int hoaDonXuatId, int truyenId, int soLuong) {
		this.hoaDonXuatRepository.addToChiTietHoaDonXuat(hoaDonXuatId, truyenId, soLuong);
	}

	public void addHoaDonXuat(int hoaDonXuatId, Date ngayGhi, float tongTien, boolean trangThai) {
		this.hoaDonXuatRepository.addHoaDonXuat(hoaDonXuatId, ngayGhi, tongTien, trangThai);
	}
	
	public void AddCartDataToDatabase(HoaDonXuatDTO hoaDonXuatDTO) throws ParseException {
		
		int khachHangId = khachHangRepository.getNextKhachHangId();
		int hoaDonXuatId = hoaDonXuatRepository.getNextId();
		
		KhachHang khachHang =  hoaDonXuatDTO.getKhachHang();
		khachHang.setKhachHangId(khachHangId);
		this.khachHangRepository.save(khachHang);
		
		HoaDonXuat hoaDonXuat = new HoaDonXuat();
		hoaDonXuat.setTongTien(hoaDonXuatDTO.getTotal());

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sf.parse(sf.format(new Date()));
		
		hoaDonXuat.setKhachHang(khachHang);
		hoaDonXuat.setNgayGhi(dt);
		hoaDonXuat.setHoaDonXuatId(hoaDonXuatId);
		/*this.hoaDonXuatService.addHoaDonXuat(hoaDonXuat.getHoaDonXuatId(), hoaDonXuat.getNgayGhi(),
				hoaDonXuat.getTongTien(), true);*/
		this.hoaDonXuatRepository.save(hoaDonXuat);

		List<TruyenDTO> truyenDTO = hoaDonXuatDTO.getTruyens();

		for (TruyenDTO truyen : truyenDTO) {
			this.hoaDonXuatRepository.addToChiTietHoaDonXuat(hoaDonXuatId, truyen.getTruyenId(), truyen.getSoLuong());
		}
	}
}
