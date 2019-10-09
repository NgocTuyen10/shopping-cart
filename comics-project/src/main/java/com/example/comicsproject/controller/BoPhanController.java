package com.example.comicsproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.comicsproject.entity.BoPhan;
import com.example.comicsproject.service.BoPhanService;



@RestController
public class BoPhanController extends BaseController{
	@Autowired
	private BoPhanService boPhanService;

	@GetMapping(value="/bophan")
	public ResponseEntity<List<BoPhan>> findAll() {
		return ResponseEntity.ok(boPhanService.findAll());
	}

	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody BoPhan theLoai) {
		return new ResponseEntity<>(theLoai, HttpStatus.CREATED);
	}
}
