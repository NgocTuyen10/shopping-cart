package com.example.comicsproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.repository.KhachHangRepository;

@Service
public class KhachHangService {
	@Autowired
	private KhachHangRepository khachHangRepository;

	public void create(KhachHang khachHang) {
		this.khachHangRepository.save(khachHang);
	}

	public int getNextKhachHangId() {
		return this.khachHangRepository.getNextKhachHangId();
	}

	public KhachHang getKhachHangFromDonMua(int donDatMuaHangId) {
		return this.khachHangRepository.getKhachHangFromDonMua(donDatMuaHangId);
	}
}
