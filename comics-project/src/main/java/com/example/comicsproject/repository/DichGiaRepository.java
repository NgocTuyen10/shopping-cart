package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.DichGia;

@Repository
public interface DichGiaRepository extends JpaRepository<DichGia, Integer> {

}
