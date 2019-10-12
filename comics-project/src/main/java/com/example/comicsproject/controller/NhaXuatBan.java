package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.service.NhaXuatBanService;

@RestController
public class NhaXuatBan extends BaseManagementController {
	@Autowired
	private NhaXuatBanService nhaXuatBanService;

	@GetMapping(value = "nha-xuat-ban")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.nhaXuatBanService.getAllDTO());
	}

}
