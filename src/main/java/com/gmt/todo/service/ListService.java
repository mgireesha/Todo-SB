package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;

@Service
public class ListService {

	@Autowired
	private TaskService taskService;
	
	@Autowired
	private TodolistRepository todolistRepository;
	
	public List<TodoList> getAllLists(){
		System.out.println(todolistRepository.getByUserIdByOrderByGroupId("aditya"));
		return (List<TodoList>) todolistRepository.findAll();
	}
	
	public List<TodoList> getListById(Long listId){
		return (List<TodoList>) todolistRepository.getByListId(listId);
	}
	
	public TodoList addNewList(TodoList todoList,TodoUserDetails userDetails) {
		todoList.setDateCreated(LocalDate.now());
		todoList.setUserId(userDetails.getUsername());
		if(null == todoList.getGroupName() || "".equals(todoList.getGroupName())) {
			todoList.setGroupId(generateGroupId());
			todoList.setGroupName("common");
		}
		todoList = todolistRepository.save(todoList);
		return todoList;
	}
	
	public TodoList save(TodoList todoList) {
		return todolistRepository.save(todoList);
	}
	public List<TodoList> save(List<TodoList> todoList) {
		return (List<TodoList>) todolistRepository.saveAll(todoList);
	}
	public TodoList updateList(TodoList list, Long listId) {
		List listJ =  todolistRepository.getByListId(listId);
		TodoList listD = (TodoList) listJ.get(0);
		listD.setListName(list.getListName());
		listD = todolistRepository.save(listD);
		return listD;
	}
	
	public void deleteList(Long listId) {
		List<TodoTask> taskList = taskService.getByListId(listId);
		todolistRepository.deleteById(listId);
		taskService.deleteAll(taskList);
	}
	
	public void deleteListsOfUser(User user) {
		List<TodoList> userList = todolistRepository.getByUserId(user.getUserName());
		List<TodoTask> usertaks = new ArrayList<TodoTask>();
		for (TodoList tList : userList) {
			usertaks.addAll(taskService.getByListId(tList.getListId()));
		}
		todolistRepository.deleteAll(userList);
		taskService.deleteAll(usertaks);
	}
	
	public Long generateGroupId(){
		return todolistRepository.getMaxId()+1;
	}

	public List<TodoList> getListByUserId(String userName) {
		return todolistRepository.getByUserId(userName);
	}
}
