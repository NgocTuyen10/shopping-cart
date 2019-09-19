package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.comicsproject.dto.AccountDTO;
import com.example.comicsproject.entity.Account;
import com.example.comicsproject.service.AccountSerive;

@Controller
public class AccountController extends BaseController {

	@Autowired
	private AccountSerive accountService;

	@RequestMapping(value = "/create-account", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createTest(@RequestBody Account account) {

		this.accountService.add(account);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/find-account", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> findAccount(@RequestBody AccountDTO accountDTO) {
		Account account = this.accountService.findAccount(accountDTO);
		if (account != null)
			return new ResponseEntity<>(account, HttpStatus.CREATED);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
