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

import com.example.comicsproject.dto.DichGiaDTO;
import com.example.comicsproject.entity.DichGia;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.service.DichGiaService;

@RestController
public class DichGiaController extends BaseManagementController {
	@Autowired
	private DichGiaService dichGiaService;

	@GetMapping(value = "dich-gia")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.dichGiaService.getAllDTO());
	}

	@RequestMapping(value = "/dich-gia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody DichGiaDTO dichGiaDTO) {
		this.dichGiaService.create(dichGiaDTO);
		return new ResponseEntity<>(dichGiaDTO, HttpStatus.CREATED);
	}

	@GetMapping(value = "/list-dich-gia")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(this.dichGiaService.findAll());
	}

	@RequestMapping(value = "/dich-gia/edit/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody DichGiaDTO dichGiaDTO) {
		dichGiaService.update(id, dichGiaDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@RequestMapping(value = "/dich-gia/delete", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@RequestBody ListObject listRequest) {
		dichGiaService.deleteByIds(listRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/dich-gia/{dichGiaId}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable("dichGiaId") int dichGiaId) {
		DichGia dichGia = this.dichGiaService.findById(dichGiaId);
		return new ResponseEntity<>(dichGia, HttpStatus.OK);
	}

}
