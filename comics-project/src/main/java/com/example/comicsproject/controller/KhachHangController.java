package com.example.comicsproject.controller;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.entity.HoaDonXuat;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.entity.TruyenDTO;
import com.example.comicsproject.service.HoaDonXuatService;
import com.example.comicsproject.service.KhachHangService;

@Controller
@Transactional
public class KhachHangController extends BaseController {
	@Autowired
	private KhachHangService khachHangService;

	@Autowired
	private HoaDonXuatService hoaDonXuatService;

	@RequestMapping(value = "/khach-hang", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody KhachHang khacHang) {
		this.khachHangService.create(khacHang);
		return new ResponseEntity<>(khacHang, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/hoa-don-xuat", params = { "total", "cartData" }, method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createCart(@RequestParam("total") float total,
			@RequestParam("cartData") String list) {
		
		int hoaDonXuatId = hoaDonXuatService.getHoaDonXuatId();
		HoaDonXuat hoaDonXuat = new HoaDonXuat();
		hoaDonXuat.setTongTien(total);
		hoaDonXuat.setNgayGhi(new Date());
		hoaDonXuat.setHoaDonXuatId(hoaDonXuatId);
		this.hoaDonXuatService.create(hoaDonXuat);
		
		/*for (TruyenDTO truyenDTO : list) {
			this.hoaDonXuatService.addToChiTietHoaDonXuat(hoaDonXuatId, truyenDTO.getTruyenId(), truyenDTO.getSoLuong());
		}*/
		return new ResponseEntity<>("Success", HttpStatus.CREATED);
	}
}
