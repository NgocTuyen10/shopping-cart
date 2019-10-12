package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.TacGiaDTO;
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
}
