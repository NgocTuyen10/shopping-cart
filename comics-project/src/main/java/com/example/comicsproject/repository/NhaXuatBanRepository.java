package com.example.comicsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.NhaXuatBan;

@Repository
public interface NhaXuatBanRepository extends JpaRepository<NhaXuatBan, Integer> {
	@Query(value = "select * from nha_xuat_ban where trang_thai=true", nativeQuery = true)
	public List<NhaXuatBan> findAll();

	@Modifying
	@Query(value = "update nha_xuat_ban set trang_thai=false where nha_xuat_ban_id=:q", nativeQuery = true)
	public void inactiveNhaXuatBan(@Param("q") int id);

	@Modifying
	@Query(value = "insert into nha_xuat_ban(ten,ma_nha_xuat_ban,thong_tin,trang_thai) \r\n" + 
			"values (:q1,:q2,:q3,true)", nativeQuery = true)
	public void create(@Param("q1") String ten,@Param("q2") String maNhaXuatBan,@Param("q3") String thongTin);
	
	@Modifying
	@Query(value = "update nha_xuat_ban set ten =:q1,ma_nha_xuat_ban =:q2,thong_tin=:q3 where nha_xuat_ban_id=:q4", nativeQuery = true)
	public void update(@Param("q1") String ten,@Param("q2") String maNhaXuatBan,@Param("q3") String thongTin,@Param("q4") int id);
}
