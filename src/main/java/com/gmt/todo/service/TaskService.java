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
	
	public Map<String, Object> getTasksByListId(Long listId) {
		List<TodoTask> taskListC = null;
		List<TodoTask> taskListT = null;
		List<TodoList> todoList = null;
		Map <String, Object> tasksMap = new HashMap<String, Object>();
		todoList = (List<TodoList>) todolistRepository.getByListId(listId);
		if(!todoList.isEmpty() && null!= todoList.get(0).getListName() 
				&&  "Important".equals(todoList.get(0).getListName())) {
			taskListC = (List<TodoTask>) todoTaskRepository
					.getByUserIdAndIsCompletedAndIsImportant(todoList.get(0).getUserId(),true, true);
			taskListT = (List<TodoTask>) todoTaskRepository
					.getByUserIdAndIsCompletedAndIsImportant(todoList.get(0).getUserId(),false, true);
		}else {
			taskListC = (List<TodoTask>) todoTaskRepository.getByListIdAndIsCompleted(listId,true);
			taskListT = (List<TodoTask>) todoTaskRepository.getByListIdAndIsCompleted(listId,false);
		}
		tasksMap.put("todoList", todoList);
		tasksMap.put("taskListC", taskListC);
		tasksMap.put("taskListT", taskListT);
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
	
	public List<TodoTask> save(List<TodoTask> task) {
		return (List<TodoTask>) todoTaskRepository.saveAll(task);
	}
	
	public TodoTask updateTask(TodoTask task, Long taskId, String action) {
		LocalDate completedDate = null;
		TodoTask taskD = todoTaskRepository.getByTaskId(taskId);
		if(null!=action && "complete".equals(action)) {
			taskD.setCompleted(task.isCompleted());
			if(task.isCompleted()) {
				taskD.setDateCompleted(LocalDate.now());
			}
		}
		if(null!=action && "note".equals(action)) {
			taskD.setNote(task.getNote());
		}
		if(null!=action && "important".equals(action)) {
			taskD.setImportant(task.isImportant());
		}
		if(null!=action && "taskName".equals(action)) {
			taskD.setTaskName(task.getTaskName());
		}
		/*
		 * if(task.isCompleted() || task.isImportant()) {
		 * taskD.setImportant(task.isImportant());
		 * taskD.setCompleted(task.isCompleted()); completedDate = LocalDate.now();
		 * taskD.setDateCompleted(completedDate); }else {
		 * taskD.setImportant(task.isImportant());
		 * taskD.setCompleted(task.isCompleted());
		 * taskD.setDateCompleted(completedDate); } if(task.getNote()!=null) {
		 * taskD.setNote(task.getNote()); } if(task.getTaskName()!=null &&
		 * !"".equals(task.getTaskName())) { taskD.setTaskName(task.getTaskName()); }
		 */
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
