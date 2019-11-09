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

import com.example.comicsproject.dto.DonDatMuaTruyenDTO;
import com.example.comicsproject.service.DonDatMuaTruyenService;

@Controller
public class DonDatMuaTruyenController extends BaseController {

	@Autowired
	private DonDatMuaTruyenService donDatMuaTruyenService;

	@RequestMapping(value = "/don-dat-mua-truyen", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createCart(@RequestBody(required = true) DonDatMuaTruyenDTO donDatMuaTruyenDTO)
			throws ParseException {
		this.donDatMuaTruyenService.AddCartDataToDatabase(donDatMuaTruyenDTO);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
