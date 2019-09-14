package com.example.comicsproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.HoaDonXuat;
import com.example.comicsproject.repository.HoaDonXuatRepository;

@Service
public class HoaDonXuatService {
	@Autowired
	private HoaDonXuatRepository hoaDonXuatRepository;

	public void create(HoaDonXuat hoaDonXuat) {
		this.hoaDonXuatRepository.save(hoaDonXuat);
	}

	public int getHoaDonXuatId() {
		return this.hoaDonXuatRepository.getNextId();
	}
	public void addToChiTietHoaDonXuat(int chiTietHoaDonXuatId,int truyenId,int soLuong) {
		this.hoaDonXuatRepository.addToChiTietHoaDonXuat(chiTietHoaDonXuatId, truyenId, soLuong);
	}
}
