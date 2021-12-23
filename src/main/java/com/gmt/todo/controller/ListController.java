package com.gmt.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.service.ListService;

@RestController
@CrossOrigin 
@RequestMapping("/todo")
public class ListController {
	
	@Autowired
	private ListService listService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/list/")
	public TResponse addNewList(@RequestBody TodoList todoList) {
		TResponse resp = new TResponse();
		try {
			TodoUserDetails userDetails = (TodoUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			todoList = listService.addNewList(todoList,userDetails);
			resp.setStatus("success");
			resp.setTodoList(todoList);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setStatus(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/list/{listId}")
	public TResponse updateList(@RequestBody TodoList list, @PathVariable String listId) {
		TResponse resp = new TResponse();
		try {
			list = listService.updateList(list, Long.parseLong(listId));
			resp.setStatus("success");
			resp.setTodoList(list);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/list/{listId}")
	public TResponse deleteList(@PathVariable String listId) {
		TResponse resp = new TResponse();
		try {
			listService.deleteList(Long.parseLong(listId));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
}
