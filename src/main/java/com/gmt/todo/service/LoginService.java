package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.UserRepository;

@Service
public class LoginService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ListService listService;
	
	@Autowired
	private TaskService taskService;
	
	public User resgisterUser(HttpServletRequest request) {
		User user = new User();
		user.setName(request.getParameter("name"));
		user.setUserName(request.getParameter("email"));
		user.setPassWord(request.getParameter("confirmPwd"));
		user.setRoles("ROLE_USER");
		user.setActive(true);
		user = userRepository.save(user);
		TodoList todoList = new TodoList("Tasks",user.getUserName(),LocalDate.now(),listService.generateGroupId(),"default");
		todoList = listService.addNewList(todoList, new TodoUserDetails(user));
		TodoTask todoTask = new TodoTask("Get up early!", "", false, "Go to work", todoList.getListId(), todoList.getListName());
		taskService.addNewTask(todoTask);
		return user;
	}
	
	public List<User> getAllUsers() {
		return (List<User>) userRepository.findAll();
	}
}
