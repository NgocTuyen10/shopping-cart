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

import com.example.comicsproject.dto.TacGiaDTO;
import com.example.comicsproject.entity.ListObject;
import com.example.comicsproject.entity.TacGia;
import com.example.comicsproject.service.TacGiaService;

@RestController
public class TacGiaController extends BaseManagementController {
	@Autowired
	private TacGiaService tacGiaService;

	@GetMapping(value = "/tac-gia")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> getAllDTO() {
		return ResponseEntity.ok(this.tacGiaService.getListDTO());
	}

	@RequestMapping(value = "/tac-gia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> create(@RequestBody TacGiaDTO tacGiaDTO) {
		this.tacGiaService.create(tacGiaDTO);
		return new ResponseEntity<>(tacGiaDTO, HttpStatus.CREATED);
	}

	@GetMapping(value = "/list-tac-gia")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(this.tacGiaService.findAll());
	}

	@RequestMapping(value = "/tac-gia/edit/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody TacGiaDTO tacGiaDTO) {
		tacGiaService.update(id, tacGiaDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@RequestMapping(value = "/tac-gia/delete", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@RequestBody ListObject listRequest) {
		tacGiaService.deleteByIds(listRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/tac-gia/{tacGiaId}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable("tacGiaId") int tacGiaId) {
		TacGia tacGia = this.tacGiaService.findById(tacGiaId);
		return new ResponseEntity<>(tacGia, HttpStatus.OK);
	}

}
