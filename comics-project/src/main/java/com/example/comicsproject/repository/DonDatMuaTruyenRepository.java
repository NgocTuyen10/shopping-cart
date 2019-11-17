package com.example.comicsproject.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.dto.TruyenDonDatMuaDTO;
import com.example.comicsproject.entity.DonDatMuaTruyen;

@Repository
public interface DonDatMuaTruyenRepository extends JpaRepository<DonDatMuaTruyen, Integer> {
	@Query(value = "SELECT nextval('don_dat_mua_truyen_sequence');", nativeQuery = true)
	public int getNextId();

	@Transactional
	@Modifying
	@Query(value = "insert into chi_tiet_don_dat_mua_truyen(don_dat_mua_truyen_id,truyen_id,so_luong) values(:p1,:p2,:p3);", nativeQuery = true)
	public void addToChiTietDonDatMuaTruyen(@Param("p1") int donDatMuaTruyenId, @Param("p2") int truyenId,
			@Param("p3") int soLuong);

	@Query(value = "insert into don_dat_mua_truyen(don_dat_mua_truyen_id,ngay_ghi,tong_tien,trang_thai) values(:p1,:p2,:p3,:p4);", nativeQuery = true)
	@Transactional
	public void addDonDatMuaTruyen(@Param("p1") int donDatMuaTruyenId, @Param("p2") Date ngayGhi,
			@Param("p3") float tongTien, @Param("p4") boolean trangThai);

	@Query(value = "select * from don_dat_mua_truyen where don_dat_mua_truyen_id =:q", nativeQuery = true)
	public DonDatMuaTruyen getDonDatMuaTruyen(@Param("q") int donDatMuaTruyenId);

	@Query(value = "SELECT NEW com.example.comicsproject.dto.TruyenDonDatMuaDTO(t.truyenId,t.ten,t.donGiaBan,c.soLuong) from Truyen t join ChiTietDonDatMuaTruyen c \r\n"
			+ "on t.truyenId = c.truyenId and c.donDatMuaTruyenId=:q", nativeQuery = false)
	public List<TruyenDonDatMuaDTO> getListTruyenHoaDonDTO(@Param("q") int donDatMuaTruyenId);

	@Modifying
	@Transactional
	@Query(value = "update don_dat_mua_truyen set trang_thai=:q1 where don_dat_mua_truyen_id=:q2", nativeQuery = true)
	public void updatedonDatMuaTruyen(@Param("q1") int trangThai, @Param("q2") int donDatMuaTruyenId);

}
