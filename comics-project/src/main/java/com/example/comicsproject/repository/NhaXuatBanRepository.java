package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.NhaXuatBan;

@Repository
public interface NhaXuatBanRepository extends JpaRepository<NhaXuatBan, Integer> {

}
