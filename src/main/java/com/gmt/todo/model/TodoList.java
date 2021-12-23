package com.gmt.todo.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class TodoList {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long listId;
	private String listName;
	private String userId;
	private LocalDate dateCreated;
	@Transient
	private List<TodoTask> taskList;
	public long getListId() {
		return listId;
	}
	public void setListId(long listId) {
		this.listId = listId;
	}
	public String getListName() {
		return listName;
	}
	public void setListName(String listName) {
		this.listName = listName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String unserId) {
		this.userId = unserId;
	}
	public List<TodoTask> getTaskList() {
		return taskList;
	}
	public void setTaskList(List<TodoTask> taskList) {
		this.taskList = taskList;
	}
	
	public LocalDate getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(LocalDate dateCreated) {
		this.dateCreated = dateCreated;
	}
	public TodoList(long listId, String listName, String userId, List<TodoTask> taskList) {
		super();
		this.listId = listId;
		this.listName = listName;
		this.userId = userId;
		this.taskList = taskList;
	}
	
	public TodoList(long listId, String listName, String userId) {
		super();
		this.listId = listId;
		this.listName = listName;
		this.userId = userId;
	}
	
	public TodoList(String listName, String userId) {
		super();
		this.listName = listName;
		this.userId = userId;
	}
	
	public TodoList(String listName, String userId, LocalDate dateCreated) {
		super();
		this.listName = listName;
		this.userId = userId;
		this.dateCreated = dateCreated;
	}
	public TodoList() {
		
	}
	@Override
	public String toString() {
		return "TodoList [listId=" + listId + ", listName=" + listName + ", userId=" + userId + ", dateCreated="
				+ dateCreated + ", taskList=" + taskList + "]";
	}
	
	
}
