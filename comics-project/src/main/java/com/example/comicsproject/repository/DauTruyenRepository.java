package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.DauTruyen;

@Repository
public interface DauTruyenRepository extends JpaRepository<DauTruyen, Integer>{
	
}
