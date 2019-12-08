package com.example.comicsproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.entity.NhaCungCap;
import com.example.comicsproject.service.NhaCungCapService;

@RestController
public class NhaCungCapController extends BaseController {
	@Autowired
	private NhaCungCapService nhaCungCapService;

	@GetMapping(value = "nha-cung-cap")
	public List<NhaCungCap> getAll() {
		return this.nhaCungCapService.getAll();
	}

}
