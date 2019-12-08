package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.NhaCungCap;
import com.example.comicsproject.repository.NhaCungCapRepository;

@Service
public class NhaCungCapService {
	@Autowired
	private NhaCungCapRepository nhaCungCapRepository;

	public List<NhaCungCap> getAll() {
		return this.nhaCungCapRepository.getAll();
	}
}
