package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.DichGiaDTO;
import com.example.comicsproject.entity.DichGia;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.repository.DichGiaRepository;

@Service
public class DichGiaService {
	@Autowired
	private DichGiaRepository dichGiaRepository;

	public List<DichGia> findAll() {
		return this.dichGiaRepository.findAll();
	}

	public List<DichGiaDTO> getAllDTO() {
		List<DichGiaDTO> dtos = new ArrayList<>();
		for (DichGia dichGia : this.dichGiaRepository.findAll()) {
			dtos.add(new DichGiaDTO(dichGia.getDichGiaId(), dichGia.getTen()));
		}
		return dtos;
	}

	public void create(DichGiaDTO dichGiaDTO) {
		String ten = dichGiaDTO.getTen();
		String maTacGia = dichGiaDTO.getMaDichGia();
		Date ngaySinh = dichGiaDTO.getNgaySinh();
		String diaChi = dichGiaDTO.getDiaChi();
		this.dichGiaRepository.crerate(ten, maTacGia, ngaySinh, diaChi);
	}

	public DichGia findById(int id) {
		return this.dichGiaRepository.getOne(id);
	}

	public void update(int id, DichGiaDTO dichGiaDTO) {
		DichGia dichGiaInDB = this.dichGiaRepository.getOne(id);
		if (dichGiaInDB != null) {
			String ten = dichGiaDTO.getTen();
			String maTacGia = dichGiaDTO.getMaDichGia();
			Date ngaySinh = dichGiaDTO.getNgaySinh();
			String diaChi = dichGiaDTO.getDiaChi();
			this.dichGiaRepository.update(ten, maTacGia, ngaySinh, diaChi, id);
		}
	}

	public void delete(int id) {
		this.dichGiaRepository.inactiveDichGia(id);
	}

	public void deleteByIds(ListObject list) {
		for (int id : list.getId()) {
			dichGiaRepository.inactiveDichGia(id);
		}
	}

}
