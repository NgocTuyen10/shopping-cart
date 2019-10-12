package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.DichGiaDTO;
import com.example.comicsproject.entity.DichGia;
import com.example.comicsproject.repository.DichGiaRepository;

@Service
public class DichGiaService {
	@Autowired
	private DichGiaRepository dichGiaRepository;

	public List<DichGiaDTO> getAllDTO() {
		List<DichGiaDTO> dtos = new ArrayList<>();
		for (DichGia dichGia : this.dichGiaRepository.findAll()) {
			dtos.add(new DichGiaDTO(dichGia.getDichGiaId(), dichGia.getTen()));
		}
		return dtos;
	}

}
