package com.example.comicsproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.comicsproject.service.TheLoaiService;
import com.example.comicsproject.service.TruyenService;

@Controller
public class HomeController extends BaseController {

	@Autowired
	private TheLoaiService theLoaiService;

	@Autowired
	private TruyenService truyenService;

	@GetMapping()
	public String home(Model model) {
		model.addAttribute("theloais", theLoaiService.findAll());
//		model.addAttribute("topSale", truyenService.getTopSaleProduct());
		model.addAttribute("topLast", truyenService.getTopLastProduct());
		return "index";
	}

	@GetMapping(value = "/detail")
	public String productDetail(Model model) {
//		model.addAttribute("theloais", theLoaiService.findAll());
		return "product-page";
	}

	@GetMapping(value = "/checkout")
	public String showCart(Model model) {
		return "checkout";
	}

	@GetMapping(value = "/login")
	public String showLoginPage(Model model) {
		return "login";
	}

	@GetMapping(value = "/register")
	public String showRegisterPage(Model model) {
		return "register";
	}

	@GetMapping(value = "/management-login")
	public String showManagementLoginPage(Model model) {
		return "management-login";
	}

	@GetMapping(value = "/management")
	public String showManagementPage() {
		return "management";
	}

	// Result of searching
	@GetMapping(value = "/products-search")
	public String redirectToResultOfSearching(Model model) {
		model.addAttribute("theloais", theLoaiService.findAll());
		return "products-search";
	}
}
