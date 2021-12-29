package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;

@Service
public class TaskService {

	@Autowired
	private TodoTaskRepository todoTaskRepository;
	
	@Autowired
	private TodolistRepository todolistRepository;
	
	public TodoTask getTaskByTaskId(Long taskId) {
		return todoTaskRepository.getByTaskId(taskId);
	}
	
	public List<TodoTask> getByListId(Long listId){
		return todoTaskRepository.getByListId(listId);
	}
	
	public Map<String, List> getTasksByListId(Long listId) {
		List<TodoTask> taskList = (List<TodoTask>) todoTaskRepository.getByListId(listId);
		List<TodoList> todoList = (List<TodoList>) todolistRepository.getByListId(listId);
		Map <String, List> tasksMap = new HashMap<String, List>();
		tasksMap.put("todoList", todoList);
		tasksMap.put("taskList", taskList);
		return tasksMap;
	}
	
	public TodoTask addNewTask(TodoTask task) {
		task.setDateCreated(LocalDate.now());
		task = todoTaskRepository.save(task);
		return task;
	}
	
	public TodoTask save(TodoTask task) {
		return todoTaskRepository.save(task);
	}
	
	public TodoTask updateTask(TodoTask task, Long taskId) {
		LocalDate completedDate = null;
		TodoTask taskD = todoTaskRepository.getByTaskId(taskId);
		if(task.isCompleted()) {
			taskD.setCompleted(task.isCompleted());
			completedDate = LocalDate.now();
			taskD.setDateCompleted(completedDate);
		}else {
			taskD.setCompleted(task.isCompleted());
			taskD.setDateCompleted(completedDate);
		}
		if(task.getNote()!=null) {
			taskD.setNote(task.getNote());
		}
		if(task.getTaskName()!=null && !"".equals(task.getTaskName())) {
			taskD.setTaskName(task.getTaskName());
		}
		taskD = todoTaskRepository.save(taskD);
		
		return taskD;
	}
	
	public void deleteTask(Long taskId) {
		todoTaskRepository.deleteById(taskId);
	}
	
	public void deleteAll(List<TodoTask> tasks) {
		todoTaskRepository.deleteAll(tasks);
	}
}
