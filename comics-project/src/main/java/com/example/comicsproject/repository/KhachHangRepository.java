package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.KhachHang;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
	@Query(value = "SELECT nextval('khach_hang_sequence');", nativeQuery = true)
	public int getNextKhachHangId();
}
