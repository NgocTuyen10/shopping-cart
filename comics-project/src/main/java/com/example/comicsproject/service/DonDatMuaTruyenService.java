package com.example.comicsproject.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.DonDatMuaTruyenDTO;
import com.example.comicsproject.dto.DonDatMuaTruyenViewDTO;
import com.example.comicsproject.dto.TruyenDTO;
import com.example.comicsproject.dto.TruyenDonDatMuaDTO;
import com.example.comicsproject.entity.DonDatMuaTruyen;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.repository.CuonTruyenRepository;
import com.example.comicsproject.repository.DonDatMuaTruyenRepository;
import com.example.comicsproject.repository.KhachHangRepository;

@Service
@Transactional
public class DonDatMuaTruyenService {
	@Autowired
	private DonDatMuaTruyenRepository donDatMuaTruyenRepository;
	@Autowired
	private KhachHangRepository khachHangRepository;
	@Autowired
	private CuonTruyenRepository cuonTruyenRepository;

	public List<DonDatMuaTruyen> findAll() {
		return this.donDatMuaTruyenRepository.findAll();
	}

	public void create(DonDatMuaTruyen donDatMuaTruyen) {
		this.donDatMuaTruyenRepository.save(donDatMuaTruyen);
	}

	public int getHoaDonXuatId() {
		return this.donDatMuaTruyenRepository.getNextId();
	}

	public void addToChiTietHoaDonXuat(int hoaDonXuatId, int truyenId, int soLuong) {
		this.donDatMuaTruyenRepository.addToChiTietDonDatMuaTruyen(hoaDonXuatId, truyenId, soLuong);
	}

	public void addHoaDonXuat(int hoaDonXuatId, Date ngayGhi, float tongTien, boolean trangThai) {
		this.donDatMuaTruyenRepository.addDonDatMuaTruyen(hoaDonXuatId, ngayGhi, tongTien, trangThai);
	}

	public void AddCartDataToDatabase(DonDatMuaTruyenDTO donDatMuaTruyenDTO) throws ParseException {

		int khachHangId = khachHangRepository.getNextKhachHangId();
		int donDatMuaTruyenId = donDatMuaTruyenRepository.getNextId();

		KhachHang khachHang = donDatMuaTruyenDTO.getKhachHang();
		khachHang.setKhachHangId(khachHangId);
		this.khachHangRepository.save(khachHang);

		DonDatMuaTruyen donDatMuaTruyen = new DonDatMuaTruyen();
		donDatMuaTruyen.setTongTien(donDatMuaTruyenDTO.getTotal());

//		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
//		Date dt = sf.parse(sf.format(new Date()));

		donDatMuaTruyen.setKhachHang(khachHang);
		donDatMuaTruyen.setNgayDat(new Date());
		donDatMuaTruyen.setDonDatMuaTruyenId(donDatMuaTruyenId);
		/*
		 * this.hoaDonXuatService.addHoaDonXuat(hoaDonXuat.getHoaDonXuatId(),
		 * hoaDonXuat.getNgayGhi(), hoaDonXuat.getTongTien(), true);
		 */
		this.donDatMuaTruyenRepository.save(donDatMuaTruyen);

		List<TruyenDTO> truyenDTO = donDatMuaTruyenDTO.getTruyens();

		for (TruyenDTO truyen : truyenDTO) {
			this.donDatMuaTruyenRepository.addToChiTietDonDatMuaTruyen(donDatMuaTruyenId, truyen.getTruyenId(),
					truyen.getSoLuong());
		}
	}

	public DonDatMuaTruyen getDonDatMuaTruyen(int donDatMuaTruyenId) {
		return this.donDatMuaTruyenRepository.getDonDatMuaTruyen(donDatMuaTruyenId);
	}

	public DonDatMuaTruyenViewDTO getDonDatMuaTruyenView(int donDatMuaTruyenId) throws ParseException {
		KhachHang khachHang = this.khachHangRepository.getKhachHangFromDonMua(donDatMuaTruyenId);
		List<TruyenDonDatMuaDTO> truyenHoaDonDTOs = this.donDatMuaTruyenRepository
				.getListTruyenHoaDonDTO(donDatMuaTruyenId);
//		Date ngayDat = this.donDatMuaTruyenRepository.getDateDonDatTruyen(donDatMuaTruyenId);
		DonDatMuaTruyenViewDTO donDatMuaTruyenViewDTO = new DonDatMuaTruyenViewDTO();
		donDatMuaTruyenViewDTO.setKhachHang(khachHang);
		donDatMuaTruyenViewDTO.setTruyenHoaDonDTOs(truyenHoaDonDTOs);
		donDatMuaTruyenViewDTO.setNgayDat(new Date());
		donDatMuaTruyenViewDTO.setDonDatTruyenId(donDatMuaTruyenId);
		return donDatMuaTruyenViewDTO;
	}

	public void updateDonDatTruyenId(int trangThai, int donDatTruyenId) {
		this.donDatMuaTruyenRepository.updatedonDatMuaTruyen(trangThai, donDatTruyenId);
	}

	public Date getDate(int donDatTruyenId) {
		return this.donDatMuaTruyenRepository.getDateDonDatTruyen(donDatTruyenId);
	}

	public void exportToExcel(DonDatMuaTruyenViewDTO donDatMuaTruyenViewDTO)
			throws EncryptedDocumentException, IOException, ParseException {
		FileInputStream file = new FileInputStream(new File("E:\\shopping-cart\\shopping-cart\\187A4E10.xls"));
		HSSFWorkbook workbook = new HSSFWorkbook(file);
		HSSFSheet sheet = workbook.getSheetAt(0);

		KhachHang khachHang = donDatMuaTruyenViewDTO.getKhachHang();
		// get cell and then set valuse for cell

		Cell cell = sheet.getRow(11).getCell(2);
		cell.setCellValue(khachHang.getTen());

		cell = sheet.getRow(2).getCell(6);
		cell.setCellValue("#" + donDatMuaTruyenViewDTO.getDonDatTruyenId());

		cell = sheet.getRow(12).getCell(2);
		cell.setCellValue(khachHang.getSoDienThoai());

		cell = sheet.getRow(13).getCell(2);
		cell.setCellValue(khachHang.getEmail());

		cell = sheet.getRow(14).getCell(2);
		cell.setCellValue(khachHang.getDiaChi());

		List<TruyenDonDatMuaDTO> truyenHoaDonXuatDTOs = donDatMuaTruyenViewDTO.getTruyenHoaDonDTOs();
		int rowNumber = 18;
		float tongTien = 0;
		for (TruyenDonDatMuaDTO truyen : truyenHoaDonXuatDTOs) {

			cell = sheet.getRow(rowNumber).getCell(1);
			cell.setCellValue(truyen.getTen());

			cell = sheet.getRow(rowNumber).getCell(4);
			cell.setCellValue(truyen.getSoLuong());

			cell = sheet.getRow(rowNumber).getCell(5);
			cell.setCellValue(truyen.getDonGiaBan());

			float tongTienTruyen = truyen.getDonGiaBan() * truyen.getSoLuong();
			cell = sheet.getRow(rowNumber).getCell(6);
			cell.setCellValue(tongTienTruyen);

			tongTien += tongTienTruyen;

			rowNumber++;
		}
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		String ngayDat = sf.format(donDatMuaTruyenViewDTO.getNgayDat());

		cell = sheet.getRow(35).getCell(6);
		cell.setCellValue(tongTien);

		cell = sheet.getRow(41).getCell(6);
		cell.setCellValue(ngayDat);

		file.close();
		FileOutputStream out = new FileOutputStream(new File("E:\\shopping-cart\\shopping-cart\\copy_187A4E10.xls"));
		workbook.write(out);
		out.close();
	}

}
