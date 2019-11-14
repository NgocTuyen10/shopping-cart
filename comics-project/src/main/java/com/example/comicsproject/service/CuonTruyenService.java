package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.CuonTruyen;
import com.example.comicsproject.repository.CuonTruyenRepository;

@Service
public class CuonTruyenService {
	@Autowired
	private CuonTruyenRepository cuonTruyenRepository;

	public List<CuonTruyen> getAll() {
		return this.cuonTruyenRepository.getAll();
	}
}
