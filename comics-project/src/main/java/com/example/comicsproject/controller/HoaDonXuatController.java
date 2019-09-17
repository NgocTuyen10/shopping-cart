package com.example.comicsproject.controller;

import java.text.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.comicsproject.entity.HoaDonXuatDTO;
import com.example.comicsproject.service.HoaDonXuatService;

@Controller
public class HoaDonXuatController extends BaseController {

	@Autowired
	private HoaDonXuatService hoaDonXuatService;

	@RequestMapping(value = "/hoa-don-xuat", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createCart(@RequestBody(required = true) HoaDonXuatDTO hoaDonXuatDTO)
			throws ParseException {
		this.hoaDonXuatService.AddCartDataToDatabase(hoaDonXuatDTO);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
