package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.gmt.todo.model.TodoList;

public interface TodolistRepository extends CrudRepository<TodoList, Long> {
	
	public TodoList getByListId(Long listId);
	
	public TodoList getByListNameAndUserId(String listName, String userName);
	
	public List<TodoList> getByUserIdOrderByListId(String userName);
	
	public List<TodoList> getByUserIdAndGroupNameOrderByDateCreated(String userName, String groupName);
	
	public List<TodoList> getByUserIdAndGroupNameNotOrderByDateCreated(String userName, String groupName);
	
	@Query("SELECT tl FROM TodoList tl WHERE tl.userId=:userName ORDER BY tl.groupId")
	public List<TodoList> getByUserIdByOrderByGroupId(@Param("userName") String userName);
	
	@Query("SELECT coalesce(max(tl.groupId), 0) FROM TodoList tl")
	public Long getMaxId();

}
