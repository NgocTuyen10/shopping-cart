package com.example.comicsproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.entity.BoPhan;
import com.example.comicsproject.repository.BoPhanRepository;

@Service
public class BoPhanService {
	@Autowired
	private BoPhanRepository boPhanRepository;
	
	public List<BoPhan> findAll(){
		return this.boPhanRepository.findAll();
	}
	
}
