package com.example.comicsproject.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.AccountDTO;
import com.example.comicsproject.dto.AccountRegisterDTO;
import com.example.comicsproject.entity.Account;
import com.example.comicsproject.entity.KhachHang;
import com.example.comicsproject.repository.AccountRepository;
import com.example.comicsproject.repository.KhachHangRepository;

@Service
@Transactional
public class AccountSerive {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private KhachHangRepository khachHangRepository;

	public Account findAccount(AccountDTO accountDTO) {
		return this.accountRepository.findAccount(accountDTO.getUsername(), accountDTO.getPassword());
	}

	public Account findAccountByUsername(String username) {
		return this.findAccountByUsername(username);
	}

	public void add(Account account) {
		this.accountRepository.save(account);
	}

	public void createAccount(AccountRegisterDTO registerDTO) {

		// Insert into account table

		int accountId = accountRepository.getNextAccountId();
		String username = registerDTO.getUsername();
		String password = registerDTO.getPassword();
		this.accountRepository.createAccount(username, password, accountId);

		// insert into khach_hang table
		int khachHangId = khachHangRepository.getNextKhachHangId();
		KhachHang khachHang = new KhachHang();
		khachHang.setDiaChi(registerDTO.getDiaChi());
		khachHang.setEmail(registerDTO.getEmail());
		khachHang.setKhachHangId(khachHangId);
		khachHang.setNgaySinh(registerDTO.getNgaySinh());
		khachHang.setSoDienThoai(registerDTO.getSoDienThoai());
		khachHang.setTen(registerDTO.getTen());
		khachHang.setAccount(new Account(accountId));
		this.khachHangRepository.save(khachHang);
	}

}