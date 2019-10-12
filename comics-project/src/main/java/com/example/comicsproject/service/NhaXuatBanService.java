package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.NhaXuatBanDTO;
import com.example.comicsproject.entity.NhaXuatBan;
import com.example.comicsproject.repository.NhaXuatBanRepository;

@Service
public class NhaXuatBanService {
	@Autowired
	private NhaXuatBanRepository nhaXuatBanRepository;

	public List<NhaXuatBanDTO> getAllDTO() {
		List<NhaXuatBanDTO> dtos = new ArrayList<>();
		for (NhaXuatBan nhaXuatBan : this.nhaXuatBanRepository.findAll())
			dtos.add(new NhaXuatBanDTO(nhaXuatBan.getNhaXuatBanId(), nhaXuatBan.getTen()));
		return dtos;
	}

}
