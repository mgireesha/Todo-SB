package com.gmt.todo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.TodoTaskRepository;
import com.gmt.todo.repository.TodolistRepository;
import com.gmt.todo.repository.UserRepository;

@Service
public class PersistCSVSerice {
	
	private static final Logger log = LoggerFactory.getLogger(PersistCSVSerice.class);
	
	@Autowired
	private TodolistRepository todolistRepository;
	
	@Autowired
	private TodoTaskRepository todoTaskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	//@PostConstruct
	public void processCSVData() {
		System.out.println("processCSVData");
		Resource todoList_testData = new ClassPathResource("todoList_testData.csv");
		Resource taskList_testData = new ClassPathResource("taskList_testData.csv");
		Resource userF = new ClassPathResource("user.csv");
		try (BufferedReader br = new BufferedReader(new InputStreamReader(todoList_testData.getInputStream()))){
			String line = null;
			String[] todoListArr = null;
			TodoList todoList = null;
			long groupId = todolistRepository.getMaxId();
			while((line = br.readLine())!=null) {
				todoListArr = line.split(",");
				groupId=groupId+1;
				//todoList = new TodoList(Long.parseLong(todoListArr[0]), todoListArr[1], todoListArr[2]);
				todoList = new TodoList(todoListArr[0], todoListArr[1], LocalDate.parse(todoListArr[2]),groupId,todoListArr[3]);
				if(null!=todoList)
					todoList =todolistRepository.save(todoList);
				System.out.println(todoList);
			}
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(taskList_testData.getInputStream()))){
			String line = null;
			String[] taskListArr = null;
			TodoTask todoTasK = null;
			line = br.readLine();//To skip first line
			LocalDate dateCompleted = null;
			LocalDate dueDate = null;
			while((line = br.readLine())!=null) {
				taskListArr = line.split(",");
				//todoTasK = new TodoTask(Long.parseLong(taskListArr[0]), taskListArr[2], taskListArr[3], Boolean.parseBoolean(taskListArr[4]), taskListArr[5],Long.parseLong(taskListArr[1]),taskListArr[6]);
				if(null!=taskListArr[6] && !"".equals(taskListArr[6])) {
					dateCompleted = LocalDate.parse(taskListArr[6]);
				}
				if(null!=taskListArr[7] && !"".equals(taskListArr[7])) {
					dueDate = LocalDate.parse(taskListArr[7]);
				}
				todoTasK = new TodoTask( taskListArr[0],  taskListArr[1],  Boolean.parseBoolean(taskListArr[2]),  taskListArr[3],
						 Boolean.parseBoolean(taskListArr[4]),  LocalDate.parse(taskListArr[5]),  dateCompleted,  dueDate, Boolean.parseBoolean(taskListArr[8]), Long.parseLong(taskListArr[9]),  taskListArr[10]);
				//System.out.println(todoTasK);
				if(null!=todoTasK) {
					todoTaskRepository.save(todoTasK);
					//System.out.println(todoTaskRepository.findAll());
				}
					
				
			}
			
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(userF.getInputStream()))){
			String line = null;
			String[] userArr = null;
			User user = null;
			while((line = br.readLine())!=null) {
				userArr = line.split(",");
				String[] rolesArr = userArr[3].split(">>");
				String roles="";
				for(int i=0;i<rolesArr.length;i++) {
					roles+=rolesArr[i];
					if(i<rolesArr.length-1)
						roles+=",";
				}
				System.out.println(roles);
				user = new User(userArr[0], userArr[1], Boolean.parseBoolean(userArr[2]),roles);
				if(null!=user)
					userRepository.save(user);
			}
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
	}
	
}
