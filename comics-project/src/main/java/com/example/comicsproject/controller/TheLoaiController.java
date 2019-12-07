package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.service.TheLoaiService;

@RestController
public class TheLoaiController extends BaseManagementController {
	@Autowired
	private TheLoaiService theLoaiSerVice;

	@GetMapping(value="/the-loai")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.theLoaiSerVice.getListDTO());
	}

}
