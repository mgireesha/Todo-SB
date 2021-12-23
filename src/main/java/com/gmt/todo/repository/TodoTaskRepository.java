package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.TodoTask;

public interface TodoTaskRepository extends CrudRepository<TodoTask, Long> {
	
	List<TodoTask> getByListId(Long listId);
	
	TodoTask getByTaskId(Long taskId);

}
