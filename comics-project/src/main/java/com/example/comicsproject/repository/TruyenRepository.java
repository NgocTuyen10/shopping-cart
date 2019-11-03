package com.example.comicsproject.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.Truyen;

@Repository
public interface TruyenRepository extends JpaRepository<Truyen, Integer> {

	@Query(value = "SELECT nextval('truyen_sequence');", nativeQuery = true)
	public int getNextId();

	@Query(value = "select * from truyen where trang_thai = true;", nativeQuery = true)
	public List<Truyen> findAll();

	@Query(value = "select * from truyen where trang_thai = true and the_loai_id=:q", nativeQuery = true)
	public List<Truyen> findByTheLoaiId(@Param("q") int theLoaiId);

	@Query(value = "select * from truyen t join the_loai tl on t.the_loai_id = tl.the_loai_id\r\n"
			+ "where t.trang_thai = true and tl.ma_the_loai=:q", nativeQuery = true)
	public List<Truyen> findByMaTheLoai(@Param("q") String maTheLoai);

	@Query(value = "select * from truyen where trang_thai = true and ma_truyen=:q", nativeQuery = true)
	public Truyen findByMaTruyen(@Param("q") String maTruyen);

	@Query(value = "select * from truyen t join the_loai tl on t.the_loai_id = tl.the_loai_id\r\n"
			+ "where t.trang_thai = true and tl.ma_the_loai=:q", nativeQuery = true)
	public Page<Truyen> findByMaTheLoaiPaging(@Param("q") String maTheLoai, Pageable pageable);

	@Query(value = "select * from truyen order by truyen.so_luong_ban desc limit 4;", nativeQuery = true)
	public List<Truyen> getTopSaleProduct();

	@Query(value = "select * from truyen order by truyen.ngay_nhap desc limit 4;", nativeQuery = true)
	public List<Truyen> getTopLastProduct();

	@Modifying
	@Query(value = "update truyen set trang_thai=false where truyen_id=:q", nativeQuery = true)
	public void inactiveTruyen(@Param("q") int id);

	@Modifying
	@Transactional
	@Query(value = "insert into truyen_dich_gia(truyen_id,dich_gia_id) values (:q1,:q2)", nativeQuery = true)
	public void addToTruyenDichGia(@Param("q1") int truyenId, @Param("q2") int dichGiaId);

	@Modifying
	@Transactional
	@Query(value = "insert into truyen_tac_gia(truyen_id,tac_gia_id) values (:q1,:q2)", nativeQuery = true)
	public void addToTruyenTacGia(@Param("q1") int truyenId, @Param("q2") int tacGiaId);

}
