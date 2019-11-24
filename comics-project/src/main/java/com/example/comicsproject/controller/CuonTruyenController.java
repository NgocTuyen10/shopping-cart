package com.example.comicsproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.entity.CuonTruyen;
import com.example.comicsproject.service.CuonTruyenService;

@Controller
public class CuonTruyenController extends BaseManagementController {

	@Autowired
	private CuonTruyenService cuonTruyenService;

	@GetMapping("/cuon-truyen")
	@ResponseBody
	public List<CuonTruyen> getAll() {
		return this.cuonTruyenService.getAll();
	}
}