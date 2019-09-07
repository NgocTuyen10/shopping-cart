package com.example.comicsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.TheLoai;

@Repository
public interface TheLoaiRepository extends JpaRepository<TheLoai, Integer> {

	@Query(value = "select * from the_loai where trang_thai = true", nativeQuery = true)
	public List<TheLoai> findAll();

	@Modifying
	@Query(value = "update the_loai set trang_thai=false where the_loai_id=:q", nativeQuery = true)
	public void inactiveTheLoai(@Param("q") int id);

	@Query(value = "select ten from the_loai where ma_the_loai=:q", nativeQuery = true)
	public String findTenTheLoaiByMaTheLoai(@Param("q") String maTheLoai);
}
