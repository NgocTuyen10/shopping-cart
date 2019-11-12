package com.example.comicsproject.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.dto.DonDatMuaTruyenDTO;
import com.example.comicsproject.dto.DonDatMuaTruyenViewDTO;
import com.example.comicsproject.entity.DonDatMuaTruyen;
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

	@GetMapping(value = "/don-dat-mua-truyen")
	@ResponseBody
	public List<DonDatMuaTruyen> findAll() {
		return this.donDatMuaTruyenService.findAll();
	}

	@GetMapping(value = "/don-dat-mua-truyen-view/{donDatMuaTruyenId}")
	@ResponseBody
	public DonDatMuaTruyenViewDTO getDonDatMuaTruyenView(@PathVariable("donDatMuaTruyenId") int donDatMuaTruyen) {
		return this.donDatMuaTruyenService.getDonDatMuaTruyenView(donDatMuaTruyen);
	}

}
