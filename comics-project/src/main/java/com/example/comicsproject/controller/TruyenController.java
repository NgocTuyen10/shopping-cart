package com.example.comicsproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.entity.Truyen;
import com.example.comicsproject.repository.TruyenRepository;
import com.example.comicsproject.service.TheLoaiService;
import com.example.comicsproject.service.TruyenService;

import ch.qos.logback.core.pattern.color.MagentaCompositeConverter;

@Controller
public class TruyenController extends BaseController {

	@Autowired
	private TruyenService truyenService;
	@Autowired
	private TruyenRepository truyenRepository;

	@Autowired
	private TheLoaiService theLoaiService;

	@GetMapping("/theloai/{maTheLoai}")
//	@ResponseBody
	public String showTruyenByMaTheLoai(@PathVariable("maTheLoai") String maTheLoai, Model model) {
		// String tenTheLoai = this.theLoaiService.findTenTheLoaiByMaTheLoai(maTheLoai);
		// model.addAttribute("tenTheLoai", tenTheLoai);

		List<Truyen> truyens = this.truyenService.findByMaTheLoai(maTheLoai);
//		model.addAttribute("truyens", truyens);

		model.addAttribute("theloais", theLoaiService.findAll());

		return "products";
	}

	@GetMapping("/truyens")
	public String showAllTruyen() {
		this.truyenService.findAll();
		return "index";

	}

	@RequestMapping(value = "/the-loai-truyen/{maTheLoai}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Truyen> findTruyenByMaTheLoai(@PathVariable("maTheLoai") String maTheLoai) {
		return this.truyenService.findByMaTheLoai(maTheLoai);
	}

	@GetMapping("/truyen/{maTruyen}")
//	@ResponseBody
	public String showTruyenByMaTruyen(@PathVariable("maTruyen") String maTruyen, Model model) {
		// String tenTheLoai = this.theLoaiService.findTenTheLoaiByMaTheLoai(maTheLoai);
		// model.addAttribute("tenTheLoai", tenTheLoai);

		Truyen truyen = this.truyenService.findByMaTruyen(maTruyen);
		model.addAttribute("truyen", truyen);

		model.addAttribute("theloais", theLoaiService.findAll());

		return "product-page";
	}

	@RequestMapping(value = "/truyen/paging", params = { "maTheLoai", "page", "size" }, method = RequestMethod.GET)
	@ResponseBody
	public Page<Truyen> findPaginated(@RequestParam("maTheLoai") String maTheLoai, @RequestParam("page") int page,
			@RequestParam("size") int size) throws Exception {
		Page<Truyen> resultPage = truyenService.findPaginatedByMaTheLoai(maTheLoai, page, size);
		if (page > resultPage.getTotalPages()) {
			System.out.println("Page is not existed");
		}

		return resultPage;
	}

}
