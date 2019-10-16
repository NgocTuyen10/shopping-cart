package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.TacGiaDTO;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.TacGia;
import com.example.comicsproject.repository.TacGiaRepository;

@Service
public class TacGiaService {
	@Autowired
	private TacGiaRepository tacGiaRepository;

	public List<TacGia> findAll() {
		return this.tacGiaRepository.findAll();
	}

	public List<TacGiaDTO> getListDTO() {
		List<TacGiaDTO> dtos = new ArrayList<>();
		for (TacGia tacGia : this.tacGiaRepository.findAll()) {
			dtos.add(new TacGiaDTO(tacGia.getTacGiaId(), tacGia.getTen()));
		}
		return dtos;
	}

	public void create(TacGiaDTO tacGiaDTO) {
		String ten = tacGiaDTO.getTen();
		String maTacGia = tacGiaDTO.getMaTacGia();
		Date ngaySinh = tacGiaDTO.getNgaySinh();
		String diaChi = tacGiaDTO.getDiaChi();
		this.tacGiaRepository.crerate(ten, maTacGia, ngaySinh, diaChi);
	}

	public TacGia findById(int id) {
		return this.tacGiaRepository.getOne(id);
	}

	public void update(int id, TacGiaDTO tacGiaDTO) {
		TacGia tacGiaInDB = this.tacGiaRepository.getOne(id);
		if (tacGiaInDB != null) {
			String ten = tacGiaDTO.getTen();
			String maTacGia = tacGiaDTO.getMaTacGia();
			Date ngaySinh = tacGiaDTO.getNgaySinh();
			String diaChi = tacGiaDTO.getDiaChi();
			this.tacGiaRepository.update(ten, maTacGia, ngaySinh, diaChi,id);
		}
	}

	public void delete(int id) {
		this.tacGiaRepository.inactiveTacGia(id);
	}

	public void deleteByIds(ListObject list) {
		for (int id : list.getId()) {
			tacGiaRepository.inactiveTacGia(id);
		}
	}

}
