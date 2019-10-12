package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.TacGia;

@Repository
public interface TacGiaRepository extends JpaRepository<TacGia, Integer> {
	
}
