package com.example.comicsproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comicsproject.dto.AccountDTO;
import com.example.comicsproject.entity.Account;
import com.example.comicsproject.repository.AccountRepository;

@Service
public class AccountSerive {

	@Autowired
	private AccountRepository accountRepository;

	public Account findAccount(AccountDTO accountDTO) {
		return this.accountRepository.findAccount(accountDTO.getUsername(), accountDTO.getPassword());
	}

	public Account findAccountByUsername(String username) {
		return this.findAccountByUsername(username);
	}

	public void add(Account account) {
		this.accountRepository.save(account);
	}

}