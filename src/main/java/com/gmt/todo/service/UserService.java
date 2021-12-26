package com.gmt.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.User;
import com.gmt.todo.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ListService listService;
	
	public void deleteUser(Long userId) {
		try {
			listService.deleteListsOfUser(userRepository.findById(userId).map(User::new).get());
			userRepository.deleteById(userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
