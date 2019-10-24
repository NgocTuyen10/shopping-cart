package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.Truyen;
import com.example.comicsproject.repository.TruyenRepository;

@Service
public class TruyenService {

	@Autowired
	private TruyenRepository truyenRepository;

	public List<Truyen> findAll() {
		return truyenRepository.findAll();
	}

	public List<Truyen> findByTheLoaiId(int theLoaiId) {
		return truyenRepository.findByTheLoaiId(theLoaiId);
	}

	public List<Truyen> findByMaTheLoai(String maTheLoai) {
		return this.truyenRepository.findByMaTheLoai(maTheLoai);
	}

	public Truyen findByMaTruyen(String maTruyen) {
		return this.truyenRepository.findByMaTruyen(maTruyen);
	}

	public Page<Truyen> findPaginated(int page, int size) {
		return truyenRepository.findAll(PageRequest.of(page, size));
	}

	public Page<Truyen> findPaginatedByMaTheLoai(String maTheLoai, int page, int size) {
		return truyenRepository.findByMaTheLoaiPaging(maTheLoai, PageRequest.of(page, size));
	}

	public List<Truyen> getTopSaleProduct() {
		return truyenRepository.getTopSaleProduct();
	}

	public List<Truyen> getTopLastProduct() {
		return truyenRepository.getTopLastProduct();
	}
}
