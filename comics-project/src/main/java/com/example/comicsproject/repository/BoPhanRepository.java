package com.example.comicsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.BoPhan;

@Repository
public interface BoPhanRepository extends JpaRepository<BoPhan, Integer>{
	
	@Query(value="select * from bo_phan where trang_thai=true",nativeQuery=true)
	public List<BoPhan> findAll();
	
}
