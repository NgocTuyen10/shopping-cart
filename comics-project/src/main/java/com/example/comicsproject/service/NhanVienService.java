package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.NhanVien;
import com.example.comicsproject.repository.NhanVienRepository;

@Service
public class NhanVienService {
	@Autowired
	private NhanVienRepository nhanVienRepository;

	public List<NhanVien> findAll() {
		return this.nhanVienRepository.findAll();
	}

	public void create(NhanVien nhanVien) {
		this.nhanVienRepository.save(nhanVien);
	}

	public NhanVien findByID(int id) {
		return nhanVienRepository.getOne(id);
	}

	public void update(int id, NhanVien nhanVien) {
		NhanVien nhanVienInDB = this.nhanVienRepository.getOne(id);
		if (nhanVienInDB != null) {
			nhanVienInDB.setNhanVienId(id);
			nhanVienInDB.setBoPhan(nhanVien.getBoPhan());
			nhanVienInDB.setGioiTinh(nhanVien.getGioiTinh());
			nhanVienInDB.setLuongThang(nhanVien.getLuongThang());
			nhanVienInDB.setNgaySinh(nhanVien.getNgaySinh());
			nhanVienInDB.setSoDienThoai(nhanVien.getSoDienThoai());
			nhanVienInDB.setTen(nhanVien.getTen());
			nhanVienInDB.setTrangThai(true);
			nhanVienRepository.save(nhanVienInDB);
		}
	}

	public void delete(int id) {
		nhanVienRepository.inactiveNhanVien(id);
	}

	public void deleteByIds(ListObject list) throws DataAccessException {
		for (int id : list.getId()) {
			try {
				nhanVienRepository.inactiveNhanVien(id);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
