package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.HoaDonXuat;

@Repository
public interface HoaDonXuatRepository extends JpaRepository<HoaDonXuat, Integer> {
	@Query(value = "SELECT nextval('hoa_don_xuat_sequence');", nativeQuery = true)
	public int getNextId();

	@Query(value = "insert into chi_tiet_hoa_don_xuat value(:p1,:p2,:p3)", nativeQuery = true)
	public void addToChiTietHoaDonXuat(@Param("p1") int chiTietHoaDonXuatId, @Param("p2") int truyenId,
			@Param("p3") int soLuong);
}
