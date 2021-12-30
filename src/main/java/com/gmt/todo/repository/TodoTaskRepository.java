package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.TodoTask;

public interface TodoTaskRepository extends CrudRepository<TodoTask, Long> {
	
	List<TodoTask> getByListId(Long listId);
	
	List<TodoTask> getByListIdAndIsCompleted(Long listId, boolean isCompleted);
	
	TodoTask getByTaskId(Long taskId);

}
