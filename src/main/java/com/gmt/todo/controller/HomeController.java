package com.gmt.todo.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.WebAttributes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;
import com.gmt.todo.service.PersistCSVSerice;
import com.gmt.todo.service.TaskService;
import com.gmt.todo.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/todo")
public class HomeController {

	@Autowired
	private TodolistRepository todolistRepository;

	@Autowired
	private TodoTaskRepository todoTaskRepository;

	@Autowired
	private PersistCSVSerice persistCSVSerice;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TaskService taskService;

	@RequestMapping(method = RequestMethod.GET, value = {"/",""})
	public void getTodoList(HttpServletRequest request, HttpServletResponse response) {
		try {
			response.sendRedirect("/todo/Home");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/Home")
	public ModelAndView goToHome() {
		Map<String, List> tasks = null;
		ModelAndView mv = new ModelAndView();
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<TodoList> defList = (List<TodoList>) todolistRepository.getByUserIdAndGroupNameOrderByDateCreated(userDetails.getUsername(),"default");
		List<TodoList> list = (List<TodoList>) todolistRepository.getByUserIdAndGroupNameNotOrderByDateCreated(userDetails.getUsername(),"default");
		defList.addAll(list);
		for (TodoList todoList : defList) {
			if(!"Important".equals(todoList.getListName())) {
				todoList.setTaskCount(Long.valueOf(todoTaskRepository.getByListId(todoList.getListId()).size()));
			}else {
				tasks = taskService.getTasksByListId(todoList.getListId());
				todoList.setTaskCount(Long.valueOf(tasks.get("taskListC").size()+tasks.get("taskListT").size()));
			}
		}
		mv.addObject("taskList", todoTaskRepository.getByListId(defList.get(0).getListId()));
		mv.addObject("todoList", defList);
		mv.setViewName("Home");
		return mv;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/login")
	public ModelAndView Login() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("Login");
		return mv;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/signup")
	public ModelAndView signup(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		try {
			userService.resgisterUser(request);
			mv.addObject("registered", "success");
		} catch (Exception e) {
			mv.addObject("registered", "failed to register");
			mv.addObject("error", e.getMessage());
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

			Exception ex = (Exception) session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
			if (ex != null) {
				errorMessage = ex.getMessage();
				System.out.println("login error: " + errorMessage);
			}

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

	@RequestMapping("/ManageUsers")
	public ModelAndView manageUsers() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("users", userService.getAllUsers());
		mv.setViewName("ManageUsers");
		return mv;
	}

	@RequestMapping("/accessDenied")
	public ModelAndView accessDenied() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("accessDenied");
		return mv;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/user/{userId}")
	public TResponse deleteUser(@PathVariable String userId) {
		TResponse resp = new TResponse();
		try {
			userService.deleteUser(Long.parseLong(userId));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping("/updateUsernameToTask")
	public List<TodoTask> updateUsernameToTask(){
		return persistCSVSerice.updateUserIdToTasks();
	}

}
