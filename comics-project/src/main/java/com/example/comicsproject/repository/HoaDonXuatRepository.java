package com.example.comicsproject.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.dto.TruyenHoaDonXuatDTO;
import com.example.comicsproject.entity.HoaDonXuat;

@Repository
public interface HoaDonXuatRepository extends JpaRepository<HoaDonXuat, Integer> {
	@Query(value = "SELECT nextval('hoa_don_xuat_sequence');", nativeQuery = true)
	public int getNextId();

	@Transactional
	@Modifying
	@Query(value = "insert into chi_tiet_hoa_don_xuat(hoa_don_xuat_id,truyen_id,so_luong) values(:p1,:p2,:p3);", nativeQuery = true)
	public void addToChiTietHoaDonXuat(@Param("p1") int hoaDonXuatId, @Param("p2") int truyenId,
			@Param("p3") int soLuong);

	@Query(value = "insert into hoa_don_xuat(hoa_don_xuat_id,ngay_ghi,tong_tien,trang_thai) values(:p1,:p2,:p3,:p4);", nativeQuery = true)
	@Transactional
	public void addHoaDonXuat(@Param("p1") int hoaDonXuatId, @Param("p2") Date ngayGhi, @Param("p3") float tongTien,
			@Param("p4") boolean trangThai);

	@Query(value = "select new com.example.comicsproject.dto.TruyenHoaDonXuatDTO( t.truyenId as truyenId,t.maTruyen as maTruyen,t.ten as tenTruyen,(select count(*) from CuonTruyen c where c.truyenId = t.truyenId and c.trangThaiBan =1) \r\n"
			+ "as soLuongCon,t.donGiaBan as donGiaBan,d.tuaTruyen as tuaTruyen) from Truyen t\r\n"
			+ "join DauTruyen d on t.dauTruyenId = d.dauTruyenId and t.trangThai =true", nativeQuery = false)
	public List<TruyenHoaDonXuatDTO> getTruyenToXuat();

	@Query(value = "select new com.example.comicsproject.dto.TruyenHoaDonXuatDTO( t.truyenId as truyenId,t.maTruyen as maTruyen,t.ten as tenTruyen,(select count(*) from CuonTruyen c where c.truyenId = t.truyenId ) \r\n"
			+ "as soLuongCon,t.donGiaBan as donGiaBan,d.tuaTruyen as tuaTruyen) from Truyen t\r\n"
			+ "join DauTruyen d on t.dauTruyenId = d.dauTruyenId and t.trangThai =true and t.truyenId = :q", nativeQuery = false)
	public TruyenHoaDonXuatDTO getTruyenToXuatById(@Param("q") int truyenId);

}
