package com.example.comicsproject.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.comicsproject.entity.HoaDonXuat;
import com.example.comicsproject.entity.HoaDonXuatDTO;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.entity.TruyenDTO;
import com.example.comicsproject.service.HoaDonXuatService;
import com.example.comicsproject.service.KhachHangService;

@Controller
public class KhachHangController extends BaseController {
	@Autowired
	private KhachHangService khachHangService;

	@Autowired
	private HoaDonXuatService hoaDonXuatService;

	/*@RequestMapping(value = "/khach-hang", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody KhachHang khacHang) {
		this.khachHangService.create(khacHang);
		return new ResponseEntity<>(khacHang, HttpStatus.CREATED);
	}*/

	@RequestMapping(value = "/hoa-don-xuat", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createCart(@RequestBody(required = true) HoaDonXuatDTO hoaDonXuatDTO)
			throws ParseException {
		
		int khachHangId = khachHangService.getNextKhachHangId();
		int hoaDonXuatId = hoaDonXuatService.getHoaDonXuatId();
		
		KhachHang khachHang =  hoaDonXuatDTO.getKhachHang();
		khachHang.setKhachHangId(khachHangId);
		this.khachHangService.create(khachHang);
		
		HoaDonXuat hoaDonXuat = new HoaDonXuat();
		hoaDonXuat.setTongTien(hoaDonXuatDTO.getTotal());

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sf.parse(sf.format(new Date()));
		
		hoaDonXuat.setKhachHang(khachHang);
		hoaDonXuat.setNgayGhi(dt);
		hoaDonXuat.setHoaDonXuatId(hoaDonXuatId);
		/*this.hoaDonXuatService.addHoaDonXuat(hoaDonXuat.getHoaDonXuatId(), hoaDonXuat.getNgayGhi(),
				hoaDonXuat.getTongTien(), true);*/
		this.hoaDonXuatService.create(hoaDonXuat);

		List<TruyenDTO> truyenDTO = hoaDonXuatDTO.getTruyens();

		for (TruyenDTO truyen : truyenDTO) {
			this.hoaDonXuatService.addToChiTietHoaDonXuat(hoaDonXuatId, truyen.getTruyenId(), truyen.getSoLuong());
		}

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	/*@RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createTest(@RequestBody HoaDonXuat hoaDonXuat) throws ParseException {

		this.hoaDonXuatService.create(hoaDonXuat);

		return new ResponseEntity<>(HttpStatus.CREATED);
	}*/
}
