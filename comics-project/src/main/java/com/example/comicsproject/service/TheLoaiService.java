package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.TheLoai;
import com.example.comicsproject.repository.TheLoaiRepository;

@Service
public class TheLoaiService {

	@Autowired
	private TheLoaiRepository theLoaiRepository;

	public List<TheLoai> findAll() {
		return this.theLoaiRepository.findAll();
	}
	public void addTheLoai(TheLoai theLoai) {
		try {
			theLoaiRepository.save(theLoai);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public TheLoai findTheLoaiByID(int id) {
		return theLoaiRepository.getOne(id);
	}

	public void updateTheLoai(int id, TheLoai theLoai) {
		if (findTheLoaiByID(id) != null)
			theLoaiRepository.save(theLoai);
	}
	
	public void deleteTheLoai(int id) {
		this.theLoaiRepository.inactiveTheLoai(id);
	}

	public String findTenTheLoaiByMaTheLoai(String maTheLoai) {
		return this.theLoaiRepository.findTenTheLoaiByMaTheLoai(maTheLoai);
	}
}
