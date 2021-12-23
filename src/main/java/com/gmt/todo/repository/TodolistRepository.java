package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.TodoList;

public interface TodolistRepository extends CrudRepository<TodoList, Long> {
	
	public List<TodoList> getByListId(Long lstId);
	
	public List<TodoList> getByUserId(String userName);
	
}
