package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.comicsproject.dto.TruyenCRUDDTO;
import com.example.comicsproject.entity.DichGia;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.TacGia;
import com.example.comicsproject.entity.Truyen;
import com.example.comicsproject.repository.TruyenRepository;

@Service
@Transactional
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

	public void delete(int id) {
		this.truyenRepository.inactiveTruyen(id);
	}

	public void deleteByIds(ListObject list) {
		for (int id : list.getId()) {
			truyenRepository.inactiveTruyen(id);
		}
	}

	public void createTruyen(TruyenCRUDDTO truyenCRUDDTO) {

		int truyenId = this.truyenRepository.getNextId();

		Truyen truyen = new Truyen();
		truyen.setTruyenId(truyenId);
		truyen.setMaTruyen(truyenCRUDDTO.getMaTruyen());
		truyen.setDonGiaBan(truyenCRUDDTO.getDonGiaBan());
		truyen.setDonGiaBan(truyenCRUDDTO.getDonGiaBan());
		truyen.setTheLoai(truyenCRUDDTO.getTheLoai());
		truyen.setSoLuongCon(truyenCRUDDTO.getSoLuongBan());
		truyen.setSoLuongBan(truyenCRUDDTO.getSoLuongBan());
		truyen.setDenTrang(truyenCRUDDTO.isDenTrang());
		truyen.setNhaXuatBan(truyenCRUDDTO.getNhaXuatBan());
		truyen.setTrangThai(true);

		this.truyenRepository.save(truyen);

		for (DichGia dichGia : truyenCRUDDTO.getDichGias()) {
			this.truyenRepository.addToTruyenDichGia(truyenId, dichGia.getDichGiaId());
		}
		for (TacGia tacGia : truyenCRUDDTO.getTacGias()) {
			this.truyenRepository.addToTruyenTacGia(truyenId, tacGia.getTacGiaId());
		}

	}
}
