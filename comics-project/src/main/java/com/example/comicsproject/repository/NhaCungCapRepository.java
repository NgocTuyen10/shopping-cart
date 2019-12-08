package com.example.comicsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.NhaCungCap;

@Repository
public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
	@Query(value = "select * from nha_cung_cap where trang_thai = true", nativeQuery = true)
	List<NhaCungCap> getAll();
}
