package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.comicsproject.service.TheLoaiService;

@Controller
public class HomeController extends BaseController{

	@Autowired
	private TheLoaiService theLoaiService;

	@GetMapping()
	public String home(Model model) {
		model.addAttribute("theloais", theLoaiService.findAll());
		return "index";
	}
	
	@GetMapping(value="/detail")
	public String productDetail(Model model) {
//		model.addAttribute("theloais", theLoaiService.findAll());
		return "product-page";
	}
	
	@GetMapping(value="/checkout")
	public String showCart(Model model) {
		return "checkout";
	}
	
	@GetMapping(value="/login")
	public String showLoginPage(Model model) {
		return "login";
	}
	@GetMapping(value="/register")
	public String showRegisterPage(Model model) {
		return "register";
	}
}
