package com.example.comicsproject.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.HoaDonXuat;

@Repository
public interface HoaDonXuatRepository extends JpaRepository<HoaDonXuat, Integer> {
	@Query(value = "SELECT nextval('hoa_don_xuat_sequence');", nativeQuery = true)
	public int getNextId();

	@Query(value = "insert into chi_tiet_hoa_don_xuat(hoa_don_xuat_id,truyen_id,so_luong) values(:p1,:p2,:p3);", nativeQuery = true)
	public void addToChiTietHoaDonXuat(@Param("p1") int chiTietHoaDonXuatId, @Param("p2") int truyenId,
			@Param("p3") int soLuong);

	@Query(value = "insert into hoa_don_xuat(hoa_don_xuat_id,ngay_ghi,tong_tien,trang_thai) values(:p1,:p2,:p3,:p4);", nativeQuery = true)
	public void addHoaDonXuat(@Param("p1") int hoaDonXuatId, @Param("p2") Date ngayGhi, @Param("p3") float tongTien,
			@Param("p4") boolean trangThai);
}
