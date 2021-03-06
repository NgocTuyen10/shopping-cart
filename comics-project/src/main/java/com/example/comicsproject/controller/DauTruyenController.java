package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.service.DauTruyenService;

@RestController
public class DauTruyenController extends BaseManagementController {
	@Autowired
	private DauTruyenService dauTruyenService;

	@GetMapping(value = "/dau-truyen")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(this.dauTruyenService.findAll());
	}
}
