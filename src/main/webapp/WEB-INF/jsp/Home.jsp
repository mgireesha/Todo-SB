<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isELIgnored="false"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Todo App</title>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<script type="text/javascript" src="../static_resources/js/Home.js"></script>
<script type="text/javascript" src="../static_resources/js/Task.js"></script>
<link href="../static_resources/css/Home.css" rel="stylesheet" />

<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
</head>
<body onload="triggerFirstList()">
<%boolean isDotRequired = false; %>
	<div class="container-fluid">
	<div class="row">
		<h4 class="col-sm-10" style="margin-left: 0.4em;color: beige"><i>ToDo</i></h4>
		<a class="col-sm-1" href="/logout">Logout</a>
	</div>
		<div class="row">
			<div class="col-sm-3 list-div">
				<div class="list-item-main" id="list-item-main">
					<c:forEach items="${todoList}" var="tl">
					<div class="row list-item-row" style="margin: 0">
						<div class="col-sm-10 list-item" id="list-item-${tl.getListId()}" onClick="showTasks(${tl.getListId()})">
							<label>${tl.getListName()}</label>
						</div>
						<div class="col-sm-1 ${tl.getGroupName() ne 'default' ? 'list-item-delete' : 'list-item-delete-def'}" id="list-item-delete-${tl.getListId()}" onclick="${tl.getGroupName() ne 'default' ? 'deleteList(this)' : ''}">
							<label style="display:${tl.getGroupName() ne 'default' ? 'block' : 'none'}">x</label>
						</div>
					</div>
				</c:forEach>
				</div>
				
				<div class="list-item-add">
					<div class="list-item-add-div" id="list-item-add-div" onclick="togglAddListField()">
						<label class="list-add-new-lbl">+ Add New List</label>
					</div>
					<div class="row list-item-add-field" id="list-item-add-field" style="display: none;">
						<div class="col-sm-10 list-add-txt-div">
							<input type="text" class="form-control list-add-txt" id="list-add-txt" name="" placeholder="List Name" style="background-color: darkkhaki;"  />
						</div>
						<div class="col-sm-2 list-add-button-div">
							<button class="list-add-button" onclick="addList()">Add</button>
						</div>
					</div>
				</div>

			</div>
			<div class="col-sm-8 task-div" id="task-div">
				<div class="row task-list-name">
					<h2 class="task-list-name-header" id="task-list-name-header-${todoList[0].getListId()}" onclick="switchListNameLabel(this)">
						${todoList[0].getListName()}
					</h2>
					<input type="text" id="task-list-name-text-${taskList[0].getListId()}" class="task-list-name-text form-control" style="background-color: rgb(64, 58, 58); display: none;" onblur="updateListName(this)">
				</div>
				<div id="task-item-main">
					<%isDotRequired = false; %>
					<c:forEach items="${taskList}" var="tk">
						<div class="row" style="margin: 0">
								
								
								<div class="col-sm-10 task-item" id="task-item-${tk.getTaskId()}" onclick="showTaskDetails(this)">
							<input type="checkbox" id="task-chkbx-${tk.getTaskId()}" ${tk.isCompleted() eq true ? 'checked' : ''}
								onClick="completeTask(this)" class="task-item-chkbx"
								name="task-chkbx-${tk.getTaskId()}"> 
							<label class="task-item-label ${tk.isCompleted() eq true ? 'strike-line' : ''}" id="task-label-${tk.getTaskId()}">
								${tk.getTaskName()}
							</label>
							<span class="glyphicon glyphicon-search"></span>
							
							<div class="row">
								<label class="col-sm-1" style="width: 1.5em"></label>
							<div class="col-sm-6">
								<c:if test="${tk.getDueDate()!= null}">
								<%isDotRequired = true; %>
									<img alt="due date" src="../static_resources/images/calender-blue.png" style="height: 0.8em">
									<label style="font-size: 12px">Tomorrow</label>
								</c:if>
								<%if(isDotRequired){ %>
								<%isDotRequired = false; %>
									<img alt="black dot" src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">
								<%} %>
								<c:if test="${tk.isRemindMe() eq true}">
								<%isDotRequired = true; %>
									<img alt="due date" src="../static_resources/images/bell-blue.png" style="height: 0.8em">
									<label style="font-size: 12px">Tomorrow</label>
								</c:if>
								<%if(isDotRequired){ %>
								<%isDotRequired = false; %>
									<img alt="black dot" src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">
								<%} %>
								<c:if test="${tk.getNote()!= null}">
									<img alt="due date" src="../static_resources/images/note-blue-s1.png" style="height: 0.8em">
								</c:if>
								
								
							</div>
							<div class="col-sm-3 task-dummy-div"></div>
							<div class="col-sm-2 task-delete-div">
								<%-- <label class="task-delete-label" id="task-delete-label-${tk.getTaskId()}" onclick="deleteTask(this)">Remove task </label> --%>
							</div>
							</div>
							
							
						</div>
						<div class="col-sm-1 task-item-delete" id="task-delete-label-${tk.getTaskId()}" onclick="deleteTask(this)" title="Delete Task">
							<img alt="black dot" src="../static_resources/images/delete-grey-20x26.png" style="height: 1.8em;">
						</div>	
								
						</div>
					</c:forEach>
				</div>
				<div class="row  task-item-add-div" id="task-item-add-div" style="" onclick="toggleAddtaskField()">
					<label class="col-sm-11">Add New Task </label><label
						class="col-sm-1">+</label>
				</div>
				<div class="row task-item-add-div task-item-add-field" id="task-item-add-field" style="display: none;">
					<div class="col-sm-8">
						<input type="text" placeholder="Enter task name" id="task-item-add-txt" class="form-control"  />
					</div>
					<div class="task-add-button-div col-sm-1">
						<button class="task-add-button" id="task-add-button" onclick="addNewTask()">Add</button>
					</div>
					<div class="task-add-due-date-div col-sm-2">
						<input type="date" class="task-add-due-date" id="dueDate" name="dueDate" title="Add due date" />
					</div>
					<div class="task-remind-button-div col-sm-1">
						<button class="task-remind-button" onclick="remindMe()">
							<img alt="Remind Me" id="task-remind-img" name="task-remind-img" class="task-remind-img" src="../static_resources/images/Alarm.png" title="Remind Me">
						</button>
						<input type="hidden" name="remindMe" id="remindMe" />
					</div>
					
					
					<input type="hidden" name="listName" id="listName" value="${taskList[0].getListName()}" />
					<input type="hidden" name="listId" id="listId" value="${taskList[0].getListId()}" />
				</div>

			</div>
			<div class="col-sm-3 task-detail-div" id="task-detail-div" style="display: none;">
				
			</div>
		<input type="hidden" name="reducedListDivWidth" id="reducedListDivWidth" />
		<input type="hidden" name="selectedTaskId" id="selectedTaskId" />
		</div>
	</div>
</body>
</html>