package com.example.comicsproject.repository;

import java.util.Date;
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

	@Modifying
	@Query(value = "insert into tac_gia(ten,ma_tac_gia,ngay_sinh,dia_chi,trang_thai) \r\n" + 
			"values (:q1,:q2,:q3,:q4,true)", nativeQuery = true)
	public void crerate(@Param("q1") String ten,@Param("q2") String maTacGia,@Param("q3")Date ngaySinh,@Param("q4") String diaChi);
	
	@Modifying
	@Query(value = "update tac_gia set ten =:q1,ma_tac_gia =:q2,ngay_sinh=:q3,dia_chi=:q4 where tac_gia_id=:q5", nativeQuery = true)
	public void update(@Param("q1") String ten,@Param("q2") String maTacGia,@Param("q3")Date ngaySinh,@Param("q4") String diaChi,@Param("q5") int id);
	

}
