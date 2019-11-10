package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.DauTruyen;
import com.example.comicsproject.repository.DauTruyenRepository;

@Service
public class DauTruyenService {
	@Autowired
	private DauTruyenRepository dauTruyenRepositor;

	public List<DauTruyen> findAll() {
		return this.dauTruyenRepositor.findAll();
	}
}
