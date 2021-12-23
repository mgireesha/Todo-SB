package com.gmt.todo.controller;

import java.util.Enumeration;
import java.util.List;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.WebAttributes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;
import com.gmt.todo.service.LoginService;
import com.gmt.todo.service.PersistCSVSerice;

@RestController
@CrossOrigin 
@RequestMapping("/todo")
public class HomeController {

	@Autowired
	private TodolistRepository todolistRepository;
	
	@Autowired
	private TodoTaskRepository todoTaskRepository;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private PersistCSVSerice persistCSVSerice;
	
	@RequestMapping(method = RequestMethod.GET, value = "/")
	public ModelAndView getTodoList() {
		ModelAndView mv = new ModelAndView();
		List<TodoList> list =  (List<TodoList>) todolistRepository.findAll();
		/*
		 * list.forEach(tList->{
		 * tList.setTaskList(todoTaskRepository.getByListId(tList.getListId())); });
		 */
		//list.get(0).setTaskList(todoTaskRepository.getByListId(list.get(0).getListId()));
		mv.addObject("taskList", todoTaskRepository.getByListId(list.get(0).getListId()));
		mv.addObject("todoList", list);
		mv.setViewName("Home");
		return mv;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/Home")
	public ModelAndView goToHome() {
		ModelAndView mv = new ModelAndView();
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<TodoList> list =  (List<TodoList>) todolistRepository.getByUserId(userDetails.getUsername());
		//List<TodoList> list =  (List<TodoList>) todolistRepository.findAll();
		mv.addObject("taskList", todoTaskRepository.getByListId(list.get(0).getListId()));
		mv.addObject("todoList", list);
		mv.setViewName("Home");
		return mv;
	}
	
	@RequestMapping(method = RequestMethod.GET,value = "/login")
	public ModelAndView Login() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("Login");
		return mv;
	}
	
	@RequestMapping(method = RequestMethod.POST,value = "/signup")
	public ModelAndView signup(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		try {
			loginService.resgisterUser(request);
			mv.addObject("registered", "success");
		} catch (Exception e) {
			mv.addObject("registered","failed to register");
			mv.addObject("error",e.getMessage());
		}
		mv.addObject("action", "signup");
		mv.setViewName("Login");
		return mv;
	}
	
	 @GetMapping("/login-error")
	    public ModelAndView login(HttpServletRequest request) {
	        HttpSession session = request.getSession(false);
	        String errorMessage = null;
	        if (session != null) {
				
				  Exception ex = (Exception) session
				  .getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION); 
				  if (ex != null) {
					  errorMessage = ex.getMessage();
					  System.out.println("login error: "+errorMessage); }
				 
	        	
				/*
				 * Enumeration<String> attributes = session.getAttributeNames(); while
				 * (attributes.hasMoreElements()) { String attribute = (String)
				 * attributes.nextElement();
				 * System.out.println(attribute+" : "+request.getSession().getAttribute(
				 * attribute)); }
				 */
	        }
	        
	        ModelAndView mv = new ModelAndView();
	        mv.addObject("errorMessage", errorMessage);
			mv.setViewName("Login");
			return mv;
	    }
	 
	 @RequestMapping("/error")
	 public String error() {
		 return "HeHe";
	 }
	 
	 @RequestMapping("/runcsv")
		public TResponse runPersistCSV() {
		 	TResponse resp = new TResponse();
			try {
				persistCSVSerice.processCSVData();
				resp.setStatus("success");
			} catch (Exception e) {
				resp.setStatus("failed");
				resp.setError(e.getMessage());
			}
			return resp;
		}
}
