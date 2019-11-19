package com.example.comicsproject.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.dto.DonDatMuaTruyenDTO;
import com.example.comicsproject.dto.DonDatMuaTruyenViewDTO;
import com.example.comicsproject.dto.HoaDonXuatTruyenUpdateDTO;
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

	@GetMapping(value = "/don-dat-mua-truyen/{donDatMuaTruyenId}")
	@ResponseBody
	public DonDatMuaTruyen getDonDatMuaTruyenViewById(@PathVariable("donDatMuaTruyenId") int donDatMuaTruyenId) {
		return this.donDatMuaTruyenService.getDonDatMuaTruyen(donDatMuaTruyenId);
	}

	@GetMapping(value = "/don-dat-mua-truyen-view/{donDatMuaTruyenId}")
	@ResponseBody
	public DonDatMuaTruyenViewDTO getDonDatMuaTruyenView(@PathVariable("donDatMuaTruyenId") int donDatMuaTruyenId) {
		return this.donDatMuaTruyenService.getDonDatMuaTruyenView(donDatMuaTruyenId);
	}

	@GetMapping(value = "/don-dat-mua-truyen-view/export/{donDatMuaTruyenId}")
	@ResponseBody
	public ResponseEntity<Resource> exportDonDatMuaTruyenView(@PathVariable("donDatMuaTruyenId") int donDatMuaTruyenId)
			throws EncryptedDocumentException, IOException, InvalidFormatException {
		Path path = Paths.get("E:\\shopping-cart\\shopping-cart\\copy_187A4E10.xls");
		Resource resource = new UrlResource(path.toUri());

		this.donDatMuaTruyenService
				.exportToExcel(this.donDatMuaTruyenService.getDonDatMuaTruyenView(donDatMuaTruyenId));
		return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/octet-stream"))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);

	}

	@RequestMapping(value = "/don-dat-mua-truyen/update-state", method = RequestMethod.POST)
	@ResponseBody
	public void updateDonDatMuaTruyen(@RequestBody HoaDonXuatTruyenUpdateDTO hoaDonXuatTruyenUpdateDTO)
			throws Exception {
		this.donDatMuaTruyenService.updateDonDatTruyenId(hoaDonXuatTruyenUpdateDTO.getTrangThai(),
				hoaDonXuatTruyenUpdateDTO.getDonDatMuaTruyenId());
	}
}
