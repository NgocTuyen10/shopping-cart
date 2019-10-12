package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.service.DichGiaService;

@RestController
public class DichGiaController extends BaseManagementController {
	@Autowired
	private DichGiaService dichGiaService;

	@GetMapping(value = "dich-gia")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.dichGiaService.getAllDTO());
	}

}
