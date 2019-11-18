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
import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sf.parse(sf.format(new Date()));

		donDatMuaTruyen.setKhachHang(khachHang);
		donDatMuaTruyen.setNgayDat(dt);
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

	public DonDatMuaTruyenViewDTO getDonDatMuaTruyenView(int donDatMuaTruyenId) {
		KhachHang khachHang = this.khachHangRepository.getKhachHangFromDonMua(donDatMuaTruyenId);
		List<TruyenDonDatMuaDTO> truyenHoaDonDTOs = this.donDatMuaTruyenRepository
				.getListTruyenHoaDonDTO(donDatMuaTruyenId);
		DonDatMuaTruyenViewDTO donDatMuaTruyenViewDTO = new DonDatMuaTruyenViewDTO();
		donDatMuaTruyenViewDTO.setKhachHang(khachHang);
		donDatMuaTruyenViewDTO.setTruyenHoaDonDTOs(truyenHoaDonDTOs);
		return donDatMuaTruyenViewDTO;
	}

	public void updateDonDatTruyenId(int trangThai, int donDatTruyenId) {
		this.donDatMuaTruyenRepository.updatedonDatMuaTruyen(trangThai, donDatTruyenId);
	}

	public void exportToExcel(DonDatMuaTruyenViewDTO donDatMuaTruyenViewDTO)
			throws EncryptedDocumentException, IOException {
		FileInputStream file = new FileInputStream(
				new File("E:\\shopping-cart\\shopping-cart\\ExcelInvoiceTemplate.xls"));
		HSSFWorkbook workbook = new HSSFWorkbook(file);
		HSSFSheet sheet = workbook.getSheetAt(0);

		KhachHang khachHang = donDatMuaTruyenViewDTO.getKhachHang();
		//get cell and then set valuse for cell
		Row rowTen = sheet.createRow(11);
		Cell cell = rowTen.createCell(2);
		cell.setCellValue(khachHang.getTen());
		

		Row rowEmail = sheet.createRow(13);
		cell = rowEmail.createCell(2);
		cell.setCellValue(khachHang.getEmail());

		Row rowSoDienThoai = sheet.createRow(12);
		cell = rowSoDienThoai.createCell(2);
		cell.setCellValue(khachHang.getEmail());

		Row rowDiaChi = sheet.createRow(14);
		cell = rowDiaChi.createCell(2);
		cell.setCellValue(khachHang.getEmail());

		List<TruyenDonDatMuaDTO> truyenHoaDonXuatDTOs = donDatMuaTruyenViewDTO.getTruyenHoaDonDTOs();
		for (TruyenDonDatMuaDTO truyen : truyenHoaDonXuatDTOs) {
			int rowNumber = 17;
			Row row = sheet.createRow(rowNumber++);
			for (int i = 0; i < 3; i++) {
				int col = 1;
				Cell cellT = row.createCell(col++);
				cellT.setCellValue(truyen.getTen());

				cellT = row.createCell(col++);
				cellT.setCellValue(truyen.getSoLuong());

				cellT = row.createCell(col++);
				cellT.setCellValue(truyen.getDonGiaBan());
			}

		}
		file.close();
		FileOutputStream out = new FileOutputStream(
				new File("E:\\shopping-cart\\shopping-cart\\copy_ExcelInvoiceTemplate.xls"));
		workbook.write(out);
		out.close();
	}

}
