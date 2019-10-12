package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.service.TacGiaService;

@RestController
public class TacGiaController extends BaseManagementController {
	@Autowired
	private TacGiaService tacGiaService;

	@GetMapping(value = "tac-gia")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.tacGiaService.getListDTO());
	}
}
