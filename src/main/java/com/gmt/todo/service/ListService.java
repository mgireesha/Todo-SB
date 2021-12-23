package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;

@Service
public class ListService {

	@Autowired
	private TodolistRepository todolistRepository;
	
	@Autowired
	private TodoTaskRepository todoTaskRepository;
	
	public TodoList addNewList(TodoList todoList,TodoUserDetails userDetails) {
		todoList.setDateCreated(LocalDate.now());
		todoList.setUserId(userDetails.getUsername());
		todoList = todolistRepository.save(todoList);
		return todoList;
	}
	
	public TodoList updateList(TodoList list, Long listId) {
		List listJ =  todolistRepository.getByListId(listId);
		TodoList listD = (TodoList) listJ.get(0);
		listD.setListName(list.getListName());
		listD = todolistRepository.save(listD);
		return listD;
	}
	
	public void deleteList(Long listId) {
		List<TodoTask> taskList = todoTaskRepository.getByListId(listId);
		todolistRepository.deleteById(listId);
		todoTaskRepository.deleteAll(taskList);
	}
}
