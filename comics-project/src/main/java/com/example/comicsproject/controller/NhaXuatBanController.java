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

import com.example.comicsproject.dto.NhaXuatBanDTO;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.NhaXuatBan;
import com.example.comicsproject.service.NhaXuatBanService;

@RestController
public class NhaXuatBanController extends BaseManagementController {
	@Autowired
	private NhaXuatBanService nhaXuatBanService;

	@GetMapping(value = "nha-xuat-ban")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.nhaXuatBanService.getAllDTO());
	}

	@RequestMapping(value = "/nha-xuat-ban", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> create(@RequestBody NhaXuatBanDTO nhaXuatBanDTO) {
		this.nhaXuatBanService.create(nhaXuatBanDTO);
		return new ResponseEntity<>(nhaXuatBanDTO, HttpStatus.CREATED);
	}

	@GetMapping(value = "/list-nha-xuat-ban")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(this.nhaXuatBanService.findAll());
	}

	@RequestMapping(value = "/nha-xuat-ban/edit/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody NhaXuatBanDTO nhaXuatBanDTO) {
		nhaXuatBanService.update(id, nhaXuatBanDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@RequestMapping(value = "/nha-xuat-ban/delete", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@RequestBody ListObject listRequest) {
		nhaXuatBanService.deleteByIds(listRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/nha-xuat-ban/{nhaXuatBanId}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable("nhaXuatBanId") int nhaXuatBanId) {
		NhaXuatBan nhaXuatBan = this.nhaXuatBanService.findById(nhaXuatBanId);
		return new ResponseEntity<>(nhaXuatBan, HttpStatus.OK);
	}

}
