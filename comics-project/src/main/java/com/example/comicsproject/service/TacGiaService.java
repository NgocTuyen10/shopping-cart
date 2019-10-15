package com.example.comicsproject.service;

import java.util.ArrayList;
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

	public void create(TacGia tacGia) {
		this.tacGiaRepository.save(tacGia);
	}

	public TacGia findById(int id) {
		return this.tacGiaRepository.getOne(id);
	}

	public void update(int id, TacGia tacGia) {
		TacGia tacGiaInDB = this.tacGiaRepository.getOne(id);
		if (tacGiaInDB != null) {
			tacGiaInDB.setTen(tacGia.getTen());
			tacGiaInDB.setMaTacGia(tacGia.getMaTacGia());
			tacGiaInDB.setNgaySinh(tacGia.getNgaySinh());
			tacGiaInDB.setDiaChi(tacGia.getDiaChi());
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
