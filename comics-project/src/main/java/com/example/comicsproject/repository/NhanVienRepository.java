package com.example.comicsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.NhanVien;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
	@Query(value = "SELECT * FROM nhan_vien WHERE trang_thai=true", nativeQuery = true)
	public List<NhanVien> findAll();
	
	@Modifying
	@Query(value = "update nhan_vien set trang_thai=false where nhan_vien_id=:q", nativeQuery = true)
	public void inactiveNhanVien(@Param("q") int id);
	
}
