package com.example.comicsproject.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.dto.HoaDonXuatDTO;
import com.example.comicsproject.dto.TruyenHoaDonXuatDTO;
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

	@GetMapping(value = "/truyen-hoa-don-xuat")
	@ResponseBody
	public List<TruyenHoaDonXuatDTO> getTruyenToXuat() {
		return this.hoaDonXuatService.getTruyenToXuat();
	}
}
