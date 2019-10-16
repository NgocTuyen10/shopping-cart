package com.example.comicsproject.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.DichGia;

@Repository
@Transactional
public interface DichGiaRepository extends JpaRepository<DichGia, Integer> {
	@Query(value = "select * from dich_gia where trang_thai=true", nativeQuery = true)
	public List<DichGia> findAll();

	@Modifying
	@Query(value = "update dich_gia set trang_thai=false where dich_gia_id=:q", nativeQuery = true)
	public void inactiveDichGia(@Param("q") int id);

	@Modifying
	@Query(value = "insert into dich_gia(ten,ma_dich_gia,ngay_sinh,dia_chi,trang_thai) \r\n" + 
			"values (:q1,:q2,:q3,:q4,true)", nativeQuery = true)
	public void crerate(@Param("q1") String ten,@Param("q2") String maDichGia,@Param("q3")Date ngaySinh,@Param("q4") String diaChi);
	
	@Modifying
	@Query(value = "update dich_gia set ten =:q1,ma_dich_gia =:q2,ngay_sinh=:q3,dia_chi=:q4 where dich_gia_id=:q5", nativeQuery = true)
	public void update(@Param("q1") String ten,@Param("q2") String maDichGia,@Param("q3")Date ngaySinh,@Param("q4") String diaChi,@Param("q5") int id);
	
}
