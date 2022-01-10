/**
 * 
 */
 var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 var monthsI = ['01','02','03','04','05','06','07','08','09','10','11','12'];
 var currElem = null;
 $(document).mousedown(function(e) {
    currElem = e.target;
    if(currElem != null 
    	&& currElem.id != ""
    	&& ($("#task-item-add-field").css("display") != "none" || $("#list-item-add-field").css("display") != "none")
    	&& currElem.parentNode.id != "task-item-add-field" 
    	&& currElem.parentNode.parentNode.id != "task-item-add-field" 
    	&& currElem.parentNode.parentNode.parentNode.id != "task-item-add-field"
    	&& currElem.id != "task-item-add-field"
    	//&& $("#list-item-add-field").css("display") != "none" 
    	&& currElem.parentNode.id != "list-item-add-field" 
    	&& currElem.parentNode.parentNode.id != "list-item-add-field" 
    	&& currElem.parentNode.parentNode.parentNode.id != "list-item-add-field"
    	&& currElem.id != "list-item-add-field"
    	) {
			if($("#task-item-add-field").css("display") != "none"){
				toggleAddtaskField();
			}else{
				togglAddListField();
			}
        
    }
});

 function showTasks(listId){
	disableDiv();
	$("#task-item-main").empty();
	$.ajax({
		url:"task/getTasksByListId/"+listId,
		method:"GET",
	}).done(function(response){
		if(response.todoList!=undefined && response.todoList!=null){
			buildTasksDiv(response);
			enableDiv();
		}else{
			hadndleErrorResp(response);
		}
		
	}).fail(function(response)  {
		enableDiv();
		if(response.status!=null){
			alert(response.status+" : "+response.responseJSON.error);
		}else{
			alert("Sorry. Server unavailable. "+response);
		}
	});
}

function togglAddListField(){
	if($("#list-item-add-div").css("display")=="none" && $("#list-add-txt").val()==""){
		$("#list-item-add-div").show();
		$("#list-item-add-field").hide();
		cleanAddTaskField()
	}else{
		$("#list-item-add-div").hide();
		$("#list-item-add-field").show();
		$("#list-add-txt").focus();
	}
}

function addList(){
	disableDiv();
	var listName = $("#list-add-txt").val();
	if(listName=="" || listName==undefined){
		alert("Please provide list name");
		$("#list-add-txt").focus();
		return false;
	}
	var addListPayload = {
		"listName" : listName
	}
	$.ajax({
		url : "list/",
		type: "POST",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(addListPayload)
	}).done(function(response){
		enableDiv();
		if(response.status=="success"){
			$("#list-item-main").append(getListElem(response.todoList));
			cleanAddListField();
			togglAddListField();
			$("#list-item-"+response.todoList.listId).click();
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
}

function getListElem(listObj){
	var listElem = '<div class="row" style="margin-left: 0">';
		listElem += '<div class="col-sm-10 list-item" id="list-item-'+listObj.listId+'" onclick="showTasks('+listObj.listId+')">';
		listElem += '<label>'+listObj.listName+'</label>';
		listElem += '<label class="list-task-count" style="display:none">0</label>';
		listElem += '</div>';
		listElem += '<div class="col-sm-1 list-item-delete" id="list-item-delete-'+listObj.listId+'" onclick="initDelete(this)">';
		listElem += '<label>x</label>';
		listElem += '</div>';
		listElem += '</div>';
	return listElem;
}

function cleanAddListField(){
	$("#list-add-txt").val("")
}



function hideTaskDetails(){
	$("#task-item-"+$('#selectedTaskId').val()).removeClass("selected-task");
	$("#task-delete-label-"+$('#selectedTaskId').val()).removeClass("selected-task-delete");
	$("#selectedTaskId").val("");
	$("#task-detail-div").hide();
	hadndleWidth("remove");
}

function hadndleWidth(action){
	var curListDivWidth = 0;
	if(action=="add"){
		$("#task-div").addClass("col-sm-6");
		$("#task-div").removeClass("col-sm-8");
		curListDivWidth = $(".list-div").css("width");
		curListDivWidth = curListDivWidth.substring(0,curListDivWidth.length-2);
		$("#reducedListDivWidth").val(curListDivWidth);
		$(".list-div").css("width",curListDivWidth-((10/100)*curListDivWidth)+"px");
		$("#task-detail-div,.task-detail-note-txt").css("max-height",$("#task-div").css("height"));
		$(".task-delete-div").addClass("col-sm-3");
		$(".task-delete-div").removeClass("col-sm-2");
		$(".task-dummy-div").addClass("col-sm-3");
		$(".task-dummy-div").removeClass("col-sm-4");
		$(".task-item-add-div").css("margin-right","3em");
	}else{
		$("#task-div").removeClass("col-sm-6");
		$("#task-div").addClass("col-sm-8");
		$(".list-div").css("width",$("#reducedListDivWidth").val()+"px");
		$(".task-delete-div").addClass("col-sm-2");
		$(".task-delete-div").removeClass("col-sm-3");
		$(".task-dummy-div").addClass("col-sm-4");
		$(".task-dummy-div").removeClass("col-sm-3");
		$(".task-item-add-div").css("margin-right","4em");
	}
	
}

function ajaxUtil(url, type, data){
	$.ajax({
		url:url,
		type: type,
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : data
	}).done(function(response){
		// response;
	}).fail(function(response)  {
		// response;
	});
}

function switchListNameLabel(elem){
	var taskId =elem.id;
	taskId = taskId.substring("task-list-name-header-".length,taskId.length);
	$(elem).hide();
	$("#task-list-name-text-"+taskId).val(elem.innerHTML.trim());
	$("#task-list-name-text-"+taskId).show();
	$("#task-list-name-text-"+taskId).focus();
}

function updateListName(elem){
	disableDiv();
	var listId = elem.id;
	listId = listId.substring("task-list-name-text-".length,listId.length);
	var updatedListName = elem.value;
	var updateLNamePayload = {
		"listName" : updatedListName,
		"listId" : parseInt(listId)
	}
	
	$.ajax({
		url:"list/"+listId+"/",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(updateLNamePayload)
	}).done(function(response){
		if(response.status=="success"){
			enableDiv();
			$("#task-list-name-text-"+listId).hide();
			$("#task-list-name-header-"+listId).html(updatedListName);
			$("#list-item-"+listId).html('<label>'+updatedListName+'</label>');
			$("#task-list-name-header-"+listId).show();
		}else{
			alert("Failed to update the List, Error:"+response.error);
		}
	}).fail(function(response)  {
		enableDiv();
		if(response.status!=null){
			alert(response.status+" : "+response.responseJSON.error);
		}else{
			alert("Sorry. Server unavailable. "+response);
		}
	});
}

function deleteList(elem){
	disableDiv();
	var listId = elem.id;
	listId = listId.substring("list-item-delete-".length,listId.length);
	//if(confirm("All associated tasks will also be removed!")){
		$.ajax({
		url:"list/"+listId+"/",
		type: "DELETE",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json"
		}).done(function(response){
			enableDiv();
			if(response.status=="success"){
				$("#list-item-"+listId).parent().remove();
				if($("#task-list-name-header-"+listId).length>0){
					var lists = document.querySelectorAll(".list-item");
					if(lists.length>0){
						lists[0].click();
					}
				}
			}else{
				alert("Failed to update the task Please try again after clearing your browser cache");
			}
		}).fail(function(response)  {
			enableDiv();
			if(response.status!=null){
				alert(response.status+" : "+response.responseJSON.error);
			}else{
				alert("Sorry. Server unavailable. "+response);
			}
		});
	//}
}

function deleteUser(id){
	if(confirm("Are you sure?")){
		$.ajax({
		url:"user/"+id+"/",
		type: "DELETE",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json"
		}).done(function(response){
			if(response.status=="success"){
				$("#table-row-"+id).remove();
			}else{
				alert("Failed to delete the user, Please try again after clearing your browser cache");
			}
		}).fail(function(response)  {
			if(response.status!=null && response.responseJSON.error!=undefined){
				alert(response.status+" : "+response.responseJSON.error);
			}else{
				alert("Sorry. Server unavailable. "+response);
			}
		});
	}
}

function hadndleErrorResp(response){
	if(response!=undefined){
		if(response.indexOf("signin-form")!=-1){
			location.replace("");
		}
	}
}

function convertDateT(date){
	var d = new Date(date);
	
	var today = new Date();
	var tomorrow = new Date(today.getDate()+1);
	
	return cDate = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear();
	//return ;
}

function getTimeFromDate(date){
	var d = new Date(date);
	var merd = "AM";
	var hrs=d.getHours();
	if(hrs>12){
		hrs=hrs-12;
		merd="PM";
	}
	if(hrs==0){
		hrs=12;
	}
	return hrs+":"+d.getMinutes()+" "+merd;
}

function covertDateS(date){
	var d = new Date(date);
	return cDate = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate();
}

function triggerFirstList(){
	$($(".list-item-row")[0]).find(".list-item").click()
}

function disableDiv(){
	$("#disable-div").css("width",$(".list-div").parent().css("width"));
	$("#disable-div").css("height",$(".list-div").parent().css("height"));
	$("#disable-div").css("top",$("#todo-header").css("height"));
	$("#disable-div").show();	
 }
 function enableDiv(){
	$("#disable-div").hide();
}