package com.example.comicsproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.NhaXuatBanDTO;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.NhaXuatBan;
import com.example.comicsproject.repository.NhaXuatBanRepository;

@Service
public class NhaXuatBanService {
	@Autowired
	private NhaXuatBanRepository nhaXuatBanRepository;

	public List<NhaXuatBan> findAll() {
		return this.nhaXuatBanRepository.findAll();
	}

	public List<NhaXuatBanDTO> getAllDTO() {
		List<NhaXuatBanDTO> dtos = new ArrayList<>();
		for (NhaXuatBan nhaXuatBan : this.nhaXuatBanRepository.findAll())
			dtos.add(new NhaXuatBanDTO(nhaXuatBan.getNhaXuatBanId(), nhaXuatBan.getTen()));
		return dtos;
	}

	public void create(NhaXuatBanDTO nhaXuatBanDTO) {
		String ten = nhaXuatBanDTO.getTen();
		String maNhaXuatBan = nhaXuatBanDTO.getMaNhaXuatBan();
		String thongTin = nhaXuatBanDTO.getThongTin();
		this.nhaXuatBanRepository.create(ten, maNhaXuatBan, thongTin);
	}

	public NhaXuatBan findById(int id) {
		return this.nhaXuatBanRepository.getOne(id);
	}

	public void update(int id, NhaXuatBanDTO nhaXuatBanDTO) {
		NhaXuatBan nhaXuatBanInDB = this.nhaXuatBanRepository.getOne(id);
		if (nhaXuatBanInDB != null) {
			String ten = nhaXuatBanDTO.getTen();
			String maNhaXuatBan = nhaXuatBanDTO.getMaNhaXuatBan();
			String thongTin = nhaXuatBanDTO.getThongTin();
			this.nhaXuatBanRepository.update(ten, maNhaXuatBan, thongTin, id);
		}
	}

	public void delete(int id) {
		this.nhaXuatBanRepository.inactiveNhaXuatBan(id);
	}

	public void deleteByIds(ListObject list) {
		for (int id : list.getId()) {
			nhaXuatBanRepository.inactiveNhaXuatBan(id);
		}
	}
}
