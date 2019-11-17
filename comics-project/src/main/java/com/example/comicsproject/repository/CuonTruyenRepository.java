package com.example.comicsproject.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.CuonTruyen;

@Repository
@Transactional
public interface CuonTruyenRepository extends JpaRepository<CuonTruyen, Integer> {
	@Query(value = "select * from cuon_truyen where trang_thai_ban=false", nativeQuery = true)
	public List<CuonTruyen> getAll();

	@Query(value = "select count(*) from cuon_truyen where truyen_id=:q", nativeQuery = true)
	public int counCuonTruyenByMaTruyen();
}
