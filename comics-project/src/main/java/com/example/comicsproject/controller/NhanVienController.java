package com.example.comicsproject.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.NhanVien;
import com.example.comicsproject.service.NhanVienService;

@RestController
public class NhanVienController extends BaseManagementController {
	@Autowired
	private NhanVienService nhanVienService;

	@GetMapping(value = "/nhanvien")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(nhanVienService.findAll());
	}

	@RequestMapping(value = "/nhanvien", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> create(@RequestBody NhanVien nhanVien) {
		this.nhanVienService.create(nhanVien);
		return new ResponseEntity<>(nhanVien, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/nhanvien/edit/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody NhanVien nhanVien) {
		nhanVienService.update(id, nhanVien);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@RequestMapping(value = "/nhanvien/delete", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@RequestBody ListObject listRequest) {
		nhanVienService.deleteByIds(listRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/nhanvien/{nhanVienId}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> findById(@PathVariable("nhanVienId") int nhanVienId) {
		NhanVien nhanVien = this.nhanVienService.findByID(nhanVienId);
		return new ResponseEntity<>(nhanVien, HttpStatus.OK);
	}
}
