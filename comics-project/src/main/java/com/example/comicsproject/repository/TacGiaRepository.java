package com.example.comicsproject.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.TacGia;

@Repository
@Transactional
public interface TacGiaRepository extends JpaRepository<TacGia, Integer> {
	@Query(value = "select * from tac_gia where trang_thai=true", nativeQuery = true)
	public List<TacGia> findAll();

	@Modifying
	@Query(value = "update tac_gia set trang_thai=false where tac_gia_id=:q", nativeQuery = true)
	public void inactiveTacGia(@Param("q") int id);

}
