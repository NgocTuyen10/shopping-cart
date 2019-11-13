package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.KhachHang;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
	@Query(value = "SELECT nextval('khach_hang_sequence');", nativeQuery = true)
	public int getNextKhachHangId();

	@Query(value = "select * from khach_hang k\r\n"
			+ "where k.khach_hang_id in ( select d.khach_hang_id from don_dat_mua_truyen d where d.don_dat_mua_truyen_id=:q )", nativeQuery = true)
	public KhachHang getKhachHangFromDonMua(@Param("q") int donDatMuaTruyenId);
}
