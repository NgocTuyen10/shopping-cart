package com.example.comicsproject.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.CuonTruyen;

@Repository
@Transactional
public interface CuonTruyenRepository extends JpaRepository<CuonTruyen, Integer> {
	@Query(value = "select * from cuon_truyen order by ngay_nhap desc", nativeQuery = true)
	public List<CuonTruyen> getAll();

	@Query(value = "select count(*) from cuon_truyen where truyen_id=:q", nativeQuery = true)
	public int counCuonTruyenByMaTruyen();
	@Query(value="select * from cuon_truyen where cuon_truyen_id=:q",nativeQuery=true)
	public CuonTruyen getCuonTruyenByCuonTruyenId(@Param("q") int cuonTruyenId);
	
	
	@Modifying
	@Transactional
	@Query(value = "update cuon_truyen set trang_thai_ban=:q1 where cuon_truyen_id=:q2", nativeQuery = true)
	public void updatedonDatMuaTruyen(@Param("q1") int trangThaiBan, @Param("q2") int cuonTruyenId);
}
