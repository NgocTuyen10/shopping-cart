package com.example.comicsproject.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.comicsproject.dto.DichGiaDTO;
import com.example.comicsproject.dto.TacGiaDTO;
import com.example.comicsproject.dto.TruyenCRUDDTO;
import com.example.comicsproject.entity.ListObject;
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

		String tenTheLoai = this.theLoaiService.findTenTheLoaiByMaTheLoai(maTheLoai);
		model.addAttribute("tenTheLoai", tenTheLoai);

//		model.addAttribute("truyens", truyens);
		List<Truyen> truyens = this.truyenService.findByMaTheLoai(maTheLoai);
		model.addAttribute("theloais", theLoaiService.findAll());

		return "products";
	}

	// Get all truyen
	@GetMapping("/truyens")
	public String showAllTruyen() {
		this.truyenService.findAll();
		return "index";

	}

	// Get all truyen but not return view
	@GetMapping("/truyen")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
	public List<Truyen> getAll() {
		return this.truyenService.findAll();
	}

	@RequestMapping(value = "/the-loai-truyen/{maTheLoai}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Truyen> findTruyenByMaTheLoai(@PathVariable("maTheLoai") String maTheLoai) {
		return this.truyenService.findByMaTheLoai(maTheLoai);
	}

	// Get truyen by id and return view
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

	// Get truyen by id
	@GetMapping("/truyens/{truyenId}")
	@ResponseBody
	public Truyen getTruyenDetailById(@PathVariable("truyenId") int truyenId) {
		return this.truyenService.getTruyenById(truyenId);
	}

	// Get truyen by id and json data type
	@GetMapping("/truyen-hoa-don-xuat/{truyenId}")
	@ResponseBody
	public Truyen getTruyenById(@PathVariable("truyenId") int truyenId) {
		return this.truyenService.getTruyenById(truyenId);
	}

	// Paging corresponding wit maTheLoai
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

	// Paging when seaching
	@RequestMapping(value = "/truyen/searching", params = { "text", "page", "size" }, method = RequestMethod.GET)
	@ResponseBody
	public Page<Truyen> search(@RequestParam("text") String text, @RequestParam("page") int page,
			@RequestParam("size") int size) throws Exception {
		Page<Truyen> resultPage = truyenService.search(text, page, size);
		if (page > resultPage.getTotalPages()) {
			System.out.println("Page is not existed");
		}

		return resultPage;
	}

	@Transactional
	@RequestMapping(value = "/truyen/delete", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@RequestBody ListObject listRequest) {
		truyenService.deleteByIds(listRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/truyen", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody TruyenCRUDDTO truyenCRUDDTO) {
		this.truyenService.createTruyen(truyenCRUDDTO);
		return new ResponseEntity<>(truyenCRUDDTO, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/truyen/edit/{truyenId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(@PathVariable("id") int truyenId, @RequestBody TruyenCRUDDTO truyenCRUDDTO) {
		this.truyenService.editTruyen(truyenId, truyenCRUDDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
