/**
 * 
 */
 function buildTasksDiv(response){
	var taskObjC = response.taskListC;
	var taskObjT = response.taskListT;
	var listObj = response.todoList[0];
		getTDListHeader(listObj)
		$("#task-item-main").empty();
		var taskDiv=$("#task-item-main");
		var ncTasks= $('<div class="tasks-n-cmptd-div">');
		for(var i = 0; i<taskObjT.length;i++){
			ncTasks.append(getTaskElem(taskObjT[i],false));
		}
		taskDiv.append(ncTasks);
	var compDiv = '<div class="row" style="margin:0;color: beige;margin-left: 10px;">';
		compDiv+='<label style="width: auto;border-radius: 4px;background-color: rgb(46, 39, 41);padding-bottom: 2px;cursor:pointer;" onclick="hideShowCTasks()">';
		compDiv+='<span style="display: none;" class="com-tsk-right-arr">&#x232A; </span>';
		compDiv+='<span class="com-tsk-down-arr">&#x2228; </span >';
		compDiv+='<span style="font-style: italic;">Completed&nbsp;</span>';
		compDiv+='<span class="tasks-cmptd-nbr">'+taskObjC.length+'</span>';
		compDiv+='</label>';
		compDiv+='</div>';
		$(taskDiv).append(compDiv);
		var cTasks= $('<div class="tasks-cmptd-div">');
		for(var i = 0; i<taskObjC.length;i++){
			cTasks.append(getTaskElem(taskObjC[i],true));
		}
		taskDiv.append(cTasks);
		if($("#selectedTaskId").val()!=="" && $("#selectedTaskId").val()!=undefined){
			hideTaskDetails();
		}
 }
 
 function hideShowCTasks(){
	if($(".com-tsk-down-arr").css("display")!="none"){
		$(".completed,.com-tsk-down-arr").hide();
		$(".com-tsk-right-arr").show();
	}else{
		$(".completed,.com-tsk-down-arr").show();
		$(".com-tsk-right-arr").hide();
	}
 }
 
 function getTDListHeader(listObj){
	var onclickList = "";
	if(listObj.groupName!="default"){
		onclickList = "switchListNameLabel(this)";
	}
	$("#listName").val(listObj.listName);
	$("#listId").val(listObj.listId);
	$(".task-list-name").empty().append('<h2 class="task-list-name-header" onclick="'+onclickList+'" id="task-list-name-header-'+listObj.listId+'">'+listObj.listName+'</h2>')
	$(".task-list-name").append('<input type="text" id="task-list-name-text-'+listObj.listId+'" class="task-list-name-text form-control" style="background-color: rgb(64, 58, 58); display: none;" onblur="updateListName(this)">');
 }

 function getTaskElem(taskObj,isCmptd){
	var isDotRequired = false;
	var taskClass = 'row';
	if(isCmptd){
		taskClass = 'row completed';
	}
	var taskChid = '<div class="row">';
		taskChid+='<label class="col-sm-1" style="width: 1.5em"></label>';
		taskChid+='<div class="col-sm-11">';
		if($("#listName").val()=="Important"){
			taskChid+='<div class="tc-row tc-tn-row">';
			taskChid+='<label style="font-size: 12px">&nbsp;'+taskObj.listName+'</label>';
			taskChid+='</div>';
			isDotRequired = true;
		}
		taskChid+='<div class="tc-row tc-dd-row" id="tc-dd-row-'+taskObj.taskId+'">';
		if(taskObj.dueDate!=null){
			if(isDotRequired){
				taskChid+='<img alt="." src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
			}
			taskChid+='<img alt="due date" src="../static_resources/images/calender-blue.png" style="height: 0.8em">';
			taskChid+='<label style="font-size: 12px">&nbsp;'+convertDateT(taskObj.dueDate)+'</label>';
			isDotRequired = true;
		}
		taskChid+='</div>';
		taskChid+='<div class="tc-row tc-rem-row" id="tc-rem-row-'+taskObj.taskId+'">';
		if(taskObj.remindMe==true){
			if(isDotRequired){
				taskChid+='<img alt="." src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
				isDotRequired = false;
			}
			taskChid+='<img alt="due date" src="../static_resources/images/bell-blue.png" style="height: 0.8em">';
			taskChid+='<label style="font-size: 12px">&nbsp;'+convertDateT(taskObj.remindTime)+'</label>';
			isDotRequired = true;
		}
		taskChid+='</div>';
		taskChid+='<div class="tc-row tc-note-row" id="tc-note-row-'+taskObj.taskId+'">';
		if(taskObj.note!=null && taskObj.note!=""){
			if(isDotRequired){
				taskChid+='<img alt="black dot" src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
				isDotRequired = false;
			}
			taskChid+='<img alt="note" src="../static_resources/images/note-blue-s1.png" style="height: 0.8em">';
		}
		taskChid+='</div>';
		taskChid+='</div>';
		/*taskChid+='<div class="col-sm-4 task-dummy-div"></div>';
		taskChid+='<div class="col-sm-2 task-delete-div">';
		taskChid+='<label class="task-delete-label" id="task-delete-label-'+taskObj.taskId+'" onclick="deleteTask(this)">Remove task </label>';
		taskChid+='</div>';*/
		
		taskChid+='</div>';
	
	var taskDelChild ='<div class="col-sm-1 task-item-delete" id="task-delete-label-'+taskObj.taskId+'" onclick="initDelete(this)" title="Delete Task">';
	taskDelChild+='<img alt="black dot" src="../static_resources/images/delete-grey-20x26.png" style="height: 1.8em;">';
	taskDelChild+='</div>';
	
	//var taskElem = $('<div class="row" style="margin: 0">');
	var taskElem = $('<div class="col-sm-10 task-item" id="task-item-'+taskObj.taskId+'" onclick="showTaskDetails(this)">');
	taskElem.append('<input type="checkbox" id="task-chkbx-'+taskObj.taskId+'" class="task-item-chkbx" "task-chkbx-'+taskObj.taskId+'" onClick="completeTask(this)"> </input>');
	taskElem.append('<label class="task-item-label" id="task-label-'+taskObj.taskId+'" >'+taskObj.taskName+'</label>');
	taskElem.append(taskChid);
	taskElem.append('</div>');
	
	if(taskObj.completed==true){
		$(taskElem).find("#task-chkbx-"+taskObj.taskId).attr("checked","checked");
		$(taskElem).find("#task-label-"+taskObj.taskId).addClass("strike-line");
	}
	
	
	var taskRow = $('<div class="'+taskClass+'" style="margin: 0">');
	taskRow.append(taskElem);
	taskRow.append(taskDelChild);
	taskRow.append('</div>');
	
	
	return taskRow;
}

function completeTask(elem){
	disableDiv()
	var tkId = $(elem).attr('id');
	if(elem.id.indexOf("task-detail-")==-1){
		tkId = elem.id.substring("task-chkbx-".length, elem.id.length);
		/*if(elem.checked==true){
			$("#task-detail-chkbx-"+tkId).prop("checked",true);
		}else{
			$("#task-detail-chkbx-"+tkId).prop('checked', false);
		}*/
		
	}else{
		tkId = elem.id.substring("task-detail-chkbx-".length, elem.id.length);
		/*if(elem.checked==true){
			$("#task-chkbx-"+tkId).prop("checked",true);
		}else{
			$("#task-chkbx-"+tkId).prop('checked', false);
		}*/
	}
	var completed = elem.checked;
	var reqPayload = {
		"completed" : completed,
		"taskId" : parseInt(tkId)
	}
	$.ajax({
		url:"task/"+tkId+"/complete",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(reqPayload)
	}).done(function(response){
		if(response.status=="success"){
			enableDiv();
		switchTaskPlace(tkId,completed);
		if (elem.checked == true) {
			$("#task-detail-chkbx-" + tkId).prop("checked", true);
			$("#task-chkbx-" + tkId).prop("checked", true);
			$("#sound-completed")[0].play();
		} else {
			$("#task-detail-chkbx-" + tkId).prop('checked', false);
			$("#task-chkbx-" + tkId).prop('checked', false);
		}
			
			callStrike(elem);
			
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
}

function addNewTask(){
	var taskName = $("#task-item-add-txt").val();
	if(taskName=="" || taskName==undefined){
		alert("Please provide task name");
		$("#task-item-add-txt").focus();
		return false;
	}
	if($("#remindMe").val()=="true" && $("#remindTime").val() == ""){
		alert("Please select a date to remind");
		$("#remindTime").focus();
		return false;
	}
	disableDiv();
	var listName = $("#listName").val();
	var listId = $("#listId").val();
	var addTaskPayload = {
		"taskName" : taskName,
		"listId" : listId,
		"listName" : listName
	}
	var remindMeDate = $("#remindMeDate").val();
	var remindMe = $("#remindMe").val();
	if(remindMeDate!="" && remindMeDate!=undefined){
		addTaskPayload.remindTime = remindMeDate;
	}
	if(remindMe!="" && remindMe!=undefined){
		addTaskPayload.remindMe = remindMe;
	}
	$.ajax({
		url : "task/",
		type: "POST",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(addTaskPayload)
	}).done(function(response){
		if(response.status=="success"){
			$(".tasks-n-cmptd-div").append(getTaskElem(response.todoTask));
			cleanAddTaskField();
			if($("#selectedTaskId").val()!=="" && $("#selectedTaskId").val()!=undefined){
				hideTaskDetails();
			}
			updateTotalTasks(listId,"add");
			if("Important"==listName){
				updateTotalTasks(response.todoTask.listId,"add");
			}
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
		enableDiv();
	}).fail(function(response)  {
		enableDiv();
		if(response.status!=null){
			alert(response.status+" : "+response.responseJSON.error);
		}else{
			alert("Sorry. Server unavailable. "+response);
		}
	});
}

function cleanAddTaskField(){
	$("#task-item-add-txt").val("");
	$("#remindTime").val("");
	$("#remindMe").val(false);
	$("#task-remind-img").attr("src","../static_resources/images/Alarm.png");
}

function showTaskDetails(elem){
	if($(currElem).hasClass("task-item-chkbx") || $(currElem).hasClass("task-delete-label")){
		currElem = null;
		return false;
	}
	$(elem).addClass("selected-task");
	$(elem).parent().find(".task-item-delete").addClass("selected-task-delete");
	var tkId = $(elem).attr('id');
	tkId = tkId.substring("task-item-".length, tkId.length);
	var selectedTaskId = $("#selectedTaskId").val();
	if(selectedTaskId == undefined || selectedTaskId == ""){
		$("#selectedTaskId").val(tkId);
		$("#task-detail-div").show();
		hadndleWidth("add");
		getAndBuildTaskDetails(tkId);
	}else if(selectedTaskId != tkId){
		$("#task-item-"+selectedTaskId).removeClass("selected-task");
		$("#task-item-"+selectedTaskId).parent().find(".task-item-delete").removeClass("selected-task-delete");
		$("#selectedTaskId").val(tkId);
		getAndBuildTaskDetails(tkId);
	}else if(selectedTaskId == tkId){
		hideTaskDetails();
		$(elem).removeClass("selected-task");
		$(elem).parent().find(".task-item-delete").removeClass("selected-task-delete");
	}
}

function getAndBuildTaskDetails(tkId){
	disableDiv();
	$.ajax({
		url : "task/"+tkId+"/",
		type : "GET",
		contentType: "application/json; charset=utf-8"
    	
	}).done(function(response){
		buildTaskDetails(response);
		enableDiv();
	}).fail(function(response)  {
    	alert("Sorry. Server unavailable. "+response);
	});
}

function buildTaskDetails(taskObj){
	
	var taskDetailDiv = $("#task-detail-div").empty();
	var taskDetailMain = $('<div class="task-detail-main">');
	var taskDName = $('<div class="row task-item-detail-name" id="task-item-detail-name">');
		taskDName.append('<input type="checkbox" id="task-detail-chkbx-'+taskObj.taskId+'" onClick="completeTask(this)" class="task-item-chkbx-detail task-item-chkbx " name="task-detail-chkbx-'+taskObj.taskId+'">')
		taskDName.append('<label id="task-detail-label-'+taskObj.taskId+'" class="task-item-label" onclick="switchTaskNameLabel(this)">'+taskObj.taskName+'</label>');
		taskDName.append('<input type="text" id="task-detail-label-text-'+taskObj.taskId+'" class="task-detail-label-text form-control" style="background-color: #403a3a;display: none;" onchange="updateTaskName(this)" />');
		taskDName.append('<input id="task-detail-star-'+taskObj.taskId+'" class="task-detail-star" type="checkbox" title="Important" onclick="markTaskImp(this)" />');
		taskDName.append('</div>');
		
		if(taskObj.completed==true){
			$(taskDName).find("#task-detail-chkbx-"+taskObj.taskId).attr("checked","checked");
			$(taskDName).find("#task-detail-label-"+taskObj.taskId).addClass("strike-line");
		}
		if(taskObj.important){
			$(taskDName).find("#task-detail-star-"+taskObj.taskId).attr("checked","checked");
		}
		taskDetailMain.append(taskDName);
		
		taskDetailMain.append(getTDDueDate(taskObj));
		if(taskObj.dueDate=="" || taskObj.dueDate==null){
			$(taskDetailMain).find("#task-detail-dueDate-del").hide();
		}
		taskDetailMain.append(getRemindSelElem(taskObj,"dueDate"));
		
	/*var taskDRemindMe = $('<div class="row task-item-detail-remindMe task-item-detail-elem" id="task-item-detail-remindMe" onclick="showRemDSel()">');
	
	var taskDetailRemindImgDiv = '<div class="col-sm-1 task-detail-remind-div">';
	var remindImgClass= "task-detail-remind-img";
	var remindMeLblClass = "";
	if(taskObj.remindMe==true){
		remindImgClass= "task-detail-remind-img task-detail-remind-img-sld";
		remindMeLblClass = "task-detail-remind-lbl-sld";
	}
		taskDetailRemindImgDiv += '<img alt="remind" class="'+remindImgClass+'" id="task-detail-remind-img" src="../static_resources/images/Alarm-blue-bb-20x21.png" onclick="remindMeTD()">';
		taskDetailRemindImgDiv += '</div>'
		
		taskDRemindMe.append(taskDetailRemindImgDiv);
	
	var taskDetailRemindDiv	 = '<div class="col-sm-10 task-detail-font-size">';
		taskDetailRemindDiv	 += '<label class="'+remindMeLblClass+'" id="task-detail-remind-lbl">Remind Me';
		if(taskObj.remindMe==true){
			taskDetailRemindDiv	 += ' at 9 AM';
		}
		taskDetailRemindDiv	 += '</label><br>';
		if(taskObj.remindMe==true){
			taskDetailRemindDiv	 += '<label>'+convertDateT(taskObj.remindTime)+'</label>';
		}
		taskDetailRemindDiv	 += '</div>';
		
		taskDRemindMe.append(taskDetailRemindDiv);
		if(taskObj.remindMe){
			var taskRemindDel = '<div class="col-sm-1 task-detail-remind-div task-detail-remind-del">';
			taskRemindDel+= '<label id="task-detail-remind-del-lbl-'+taskObj.taskId+'" onclick="removeRemindMe(this)">X</label>';
			taskRemindDel+= '</div>';
			
		taskDRemindMe.append(taskRemindDel);
		}
		taskDRemindMe.append('</div>');*/
		taskDetailMain.append(getTDRemindMe(taskObj,"new"));
		
		taskDetailMain.append(getRemindSelElem(taskObj,"remind"));
		
		var taskDetailNoteDiv = '<div class="row task-item-detail-elem">';
			taskDetailNoteDiv += '<label class="task-detail-font-size	task-detail-note-lbl">Note</label>';
			taskDetailNoteDiv += '<textarea rows="3" cols="2" placeholder="Add Note" class="task-detail-note-txt" id="task-detail-note-txt-'+taskObj.taskId+'" onblur="addNote(this)">';
			if(taskObj.note!=null && taskObj.note !=""){
				taskDetailNoteDiv += taskObj.note;
			}
			taskDetailNoteDiv += '</textarea>';
			taskDetailNoteDiv += '</div>';
		taskDetailMain.append(taskDetailNoteDiv);
		
		if($("#listName").val()!="Important"){
			taskDetailMain.append(getMoveTaskDetails(taskObj));
			taskDetailMain.append(getMoveListSelElem());
		}
		
		var taskDetailDelete = $('<div class="row task-detail-delete">');
		
		var taskDetailCrtd ='<div class="col-sm-10" style="text-align: center;margin-top: 0.7em;">';
			taskDetailCrtd+='<label class="task-detail-crtd-lbl">Created on '+convertDateT(taskObj.dateCreated)+'</label>';
			taskDetailCrtd+='</div>';
		var taskDetailDltImg ='<div class="col-sm-2" style="margin-top: 0.7em;">';
			taskDetailDltImg+='<img alt="delete" class="task-detail-delete-label" id="task-delete-label-'+taskObj.taskId+'" src="../static_resources/images/delete-red-20x27.png" onclick="initDelete(this)">';
			taskDetailDltImg+='</div>';
		
		taskDetailDelete.append(taskDetailCrtd);
		taskDetailDelete.append(taskDetailDltImg);
		
		/*var taskDDeleteDiv = '<div class="row task-item-detail-elem">';
			taskDDeleteDiv += '<label class="task-delete-label task-detail-delete-label" id="task-delete-label-'+taskObj.taskId+'" onclick="deleteTask(this)">Remove task </label>';
			taskDDeleteDiv += '</div>';
		taskDetailDiv.append(taskDDeleteDiv);*/
		taskDetailDiv.append(taskDetailMain);
		taskDetailDiv.append(taskDetailDelete);
		
		return $(taskDetailDiv).html();
}

function getTDRemindMe(taskObj,action){
	var taskDRemindMe ="";
	if(action!="update"){
		taskDRemindMe = '<div class="row task-item-detail-remindMe task-item-detail-elem" id="task-item-detail-remindMe" onclick="showRemDSel(\'remindMe\')">';
	}
	
	var taskDetailRemindImgDiv = '<div class="col-sm-1 task-detail-remind-div">';
	var remindImgClass= "task-detail-remind-img";
	var remindMeLblClass = "";
	if(taskObj.remindMe==true){
		remindImgClass= "task-detail-remind-img task-detail-remind-img-sld";
		remindMeLblClass = "task-detail-remind-lbl-sld";
	}
		taskDetailRemindImgDiv += '<img alt="remind" class="'+remindImgClass+'" id="task-detail-remind-img" src="../static_resources/images/Alarm-blue-bb-20x21.png" onclick="">';
		taskDetailRemindImgDiv += '</div>'
		
		taskDRemindMe+=taskDetailRemindImgDiv;
		
	
	var taskDetailRemindDiv	 = '<div class="col-sm-10 task-detail-font-size">';
		taskDetailRemindDiv	 += '<label class="'+remindMeLblClass+'" id="task-detail-remind-lbl">Remind Me';
		if(taskObj.remindMe==true){
			taskDetailRemindDiv	 += ' '+getTimeFromDate(taskObj.remindTime);
		}
		taskDetailRemindDiv	 += '</label><br>';
		if(taskObj.remindMe==true){
			taskDetailRemindDiv	 += '<label>'+convertDateT(taskObj.remindTime)+'</label>';
		}
		taskDetailRemindDiv	 += '</div>';
		
		taskDRemindMe+=taskDetailRemindDiv;
		//taskDRemindMe+='</div>';
		if(taskObj.remindMe){
			var taskRemindDel = '<div class="col-sm-1 task-detail-remind-div task-detail-remind-del">';
			taskRemindDel+= '<label id="task-detail-remind-del-lbl-'+taskObj.taskId+'" onclick="removeRemindMe(this,\'remindMe\')">X</label>';
			taskRemindDel+= '</div>';
			
		taskDRemindMe+=taskRemindDel;
		}
		if(action!="update"){
			taskDRemindMe+='</div>';
		}
		return taskDRemindMe;
}

function remindMeTD(){
	if($("#task-detail-remind-img").hasClass("task-detail-remind-img-sld")){
		$("#task-detail-remind-img").removeClass("task-detail-remind-img-sld");
		$("#task-detail-remind-img").addClass("task-detail-remind-img");
	}else{
		$("#task-detail-remind-img").addClass("task-detail-remind-img-sld");
		$("#task-detail-remind-img").removeClass("task-detail-remind-img");
	}
}

function addNote(elem){
	disableDiv();
	var taskId = elem.id;
	taskId = taskId.substring("task-detail-note-txt-".length,taskId.length);
	var note = elem.value;
	var addNotePayload = {
		"note" : note,
		"taskId" : parseInt(taskId)
	}
	$.ajax({
		url:"task/"+taskId+"/note",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(addNotePayload)
	}).done(function(response){
		enableDiv();
		if(response.status=="success"){
			if(response.todoTask.note!=""){
				$("#tc-note-row-"+taskId).empty().append(getNoteTskChild(response.todoTask));
			}else{
				$("#tc-note-row-"+taskId).empty()
			}
			
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
	
}

function switchTaskNameLabel(elem){
	var taskId =elem.id;
	taskId = taskId.substring("task-detail-label-".length,taskId.length);
	$(elem).hide();
	$("#task-detail-label-text-"+taskId).val(elem.innerHTML);
	$("#task-detail-label-text-"+taskId).show();
	$("#task-detail-label-text-"+taskId).focus();
}

function updateTaskName(elem){
	disableDiv();
	var taskId = elem.id;
	taskId = taskId.substring("task-detail-label-text-".length,taskId.length);
	var updatedTaskName = elem.value;
	var updateTNamePayload = {
		"taskName" : updatedTaskName,
		"taskId" : parseInt(taskId)
	}
	
	$.ajax({
		url:"task/"+taskId+"/taskName",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(updateTNamePayload)
	}).done(function(response){
		if(response.status=="success"){
			enableDiv();
			$("#task-detail-label-text-"+taskId).hide();
			$("#task-detail-label-"+taskId+",#task-label-"+taskId).html(updatedTaskName);
			$("#task-detail-label-"+taskId).show();
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		if(response.status!=null){
			alert(response.status+" : "+response.responseJSON.error);
		}else{
			alert("Sorry. Server unavailable. "+response);
		}
	});
}
function initDelete(elem){
	var title="";
	if(elem.id.indexOf("list-item-delete-")!=-1){
		title="Delete List";
		$(".todo-dg-content").html("<label>Are you sure to delete this list ? </label></br><label>All the associated tasks will be deleted. </label>");
	}else if(elem.id.indexOf("task-delete-label-")!=-1){
		title="Delete Task";
		$(".todo-dg-content").html("<label>Are you sure to delete this task ?</label>");
	}
	$( function() {
    $( "#importDiv" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      title : title,
      content:"Are you sure to delete this task ?",
      buttons: [
            {
               text: "delete",
               priority: 'secondary',
               "class": 'dialog-red-btn',
               click: function() {                     
                  $(this).dialog("close");
                  	if(elem.id.indexOf("list-item-delete-")!=-1){
						deleteList(elem);
					}else if(elem.id.indexOf("task-delete-label-")!=-1){
						deleteTask(elem);
					}
               }
            },
            {
               text: "Cancel",
               "class":'dialog-cancel-btn',
               click: function() { 
                  $(this).dialog("close"); 
               }
            }
          ]
    });
  } );
}
function deleteTask(elem){
	var taskId = elem.id;
	taskId = taskId.substring("task-delete-label-".length,taskId.length);
	//if(confirm("Are you sure ?")){
		disableDiv();
		$.ajax({
		url:"task/"+taskId+"/",
		type: "DELETE",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json"
		}).done(function(response){
			if(response.status=="success"){
				if($("#task-chkbx-"+taskId).prop("checked")){
					updateComptdTskCount("remove");
				}
				$("#task-item-"+taskId).parent().remove();
				if($("#task-detail-div").css("display")!="none"){
					$("#task-detail-div").empty();
					$("#selectedTaskId").val("");
					hadndleWidth("remove");
				}
				updateTotalTasks($("#listId").val(),"remove");
				if(response.todoTask.important==true){
					updateTotalTasks($("#hdn-inp-Important").val(),"remove");
				}
				enableDiv();
			}else{
				alert("Failed to delete the task. Error: "+response.error);
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

function remindMe(){
	var isRemindMe = $("#remindMe").val();
	if(isRemindMe=="true"){
		$("#remindMe").val("false");
		$("#task-remind-img").attr("src","../static_resources/images/Alarm.png");
		$("#task-remind-img").css("height","1.4em");
	}else{
		$("#remindMe").val("true");
		$("#task-remind-img").attr("src","../static_resources/images/Alarm-ringing.png");
		$("#task-remind-img").css("height","1.8em");
	}
}

function toggleAddtaskField(){
	if($("#task-item-add-div").css("display")=="none" && $("#task-item-add-txt").val()==""){
		$("#task-item-add-div").show();
		$("#task-item-add-field").hide();
		cleanAddTaskField()
	}else{
		$("#task-item-add-div").hide();
		$("#task-item-add-field").show();
		$("#task-item-add-txt").focus();
	}
}

function callStrike(elem){
	var id = $(elem).attr('id');
	var taskPrefix = "";
	if(id.indexOf("task-detail-")!=-1){
		taskPrefix = "task-detail-";
	}else{
		taskPrefix = "task-";
	}
	var idNum = id.substring((taskPrefix+"chkbx-").length, id.length);
	var lbl = "task-label-"+idNum;
	var lblD = "task-detail-label-"+idNum;
	if (elem.checked) {
		$("#"+lbl).addClass("strike-line");
		if($("#task-detail-div").css("display")!="none"){
			$("#"+lblD).addClass("strike-line");
		}
	}else{
		$("#"+lbl).removeClass("strike-line");
		if($("#task-detail-div").css("display")!="none"){
			$("#"+lblD).removeClass("strike-line");
		}
	}
}

function switchTaskPlace(taskId,checked){
	if(checked){
		var temp = $("#task-item-"+taskId).parent().html();
		var divRow=$('<div class="row completed" style="margin: 0">');
		divRow.append(temp);
		$("#task-item-"+taskId).parent().remove();
		$(".tasks-cmptd-div").append(divRow);
		if($(".com-tsk-down-arr").css("display")=="none"){
			$("#task-item-"+taskId).parent().hide();
		}
		updateComptdTskCount("add");
		
	}else{
		var temp = $("#task-item-"+taskId).parent().html();
		var divRow=$('<div class="row" style="margin: 0">');
		divRow.append(temp);
		$("#task-item-"+taskId).parent().remove();
		$(".tasks-n-cmptd-div").append(divRow);
		updateComptdTskCount("remove");
	}
}

function markTaskImp(elem){
	disableDiv();
	var tkId = elem.id.substring("task-detail-star-".length, elem.id.length);
	var marked = elem.checked;
	var reqPayload = {
		"important" : marked,
		"taskId" : parseInt(tkId)
	}
	$.ajax({
		url:"task/"+tkId+"/important",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(reqPayload)
	}).done(function(response){
		if(response.status=="success"){
			enableDiv();
			if(!elem.checked){
				if($("#listName").val()=="Important"){
					$("#task-item-"+tkId).parent().remove();
					hideTaskDetails();
					if(response.todoTask.completed){
						updateComptdTskCount("remove");
					}
				}
				updateTotalTasks($("#hdn-inp-Important").val(),"remove");
			}else{
				updateTotalTasks($("#hdn-inp-Important").val(),"add");
			}
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
}
function updateComptdTskCount(action){
		var cmptTasks = parseInt($(".tasks-cmptd-nbr").html().trim());
		if("remove"==action)
			cmptTasks=cmptTasks-1;
		else{
			cmptTasks=cmptTasks+1;
		}
		$(".tasks-cmptd-nbr").html(cmptTasks);
	}
	
	function updateTotalTasks(listId,action){
		var curTasks = parseInt($("#list-item-"+listId).parent().find(".list-task-count").html().trim());
		if("add"==action){
			curTasks = curTasks+1;
		}else{
			curTasks = curTasks-1;
		}
		$("#list-item-"+listId).parent().find(".list-task-count").html(curTasks);
		if(curTasks==1){
			$("#list-item-"+listId).parent().find(".list-task-count").show();
		}else if(curTasks==0){
			$("#list-item-"+listId).parent().find(".list-task-count").hide();
		}
	}
	
	function removeRemindMe(elem,action){
		disableDiv();
		var tkId = elem.id;
		if(action=="remindMe"){
			tkId = tkId.substring("task-detail-remind-del-lbl-".length, elem.id.length);
		}else{
			tkId = tkId.substring("task-detail-dueDate-del-lbl-".length, elem.id.length);
		}
		var reqPayload = {
		"taskId" : parseInt(tkId)
	}
	if(action=="remindMe"){
		reqPayload.remindMe = false;
	}else{
		reqPayload.dueDate = null;
	}
	$.ajax({
		url:"task/"+tkId+"/"+action+"",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(reqPayload)
	}).done(function(response){
		enableDiv();
		if(response.status=="success"){
			if(action=="remindMe"){
				$(elem).parent().parent().find("#task-detail-remind-lbl").parent()
				.empty().append('<label class="" id="task-detail-remind-lbl">Remind Me</label>');
				$("#task-detail-remind-img").removeClass("task-detail-remind-img-sld");
				$(elem).parent().remove();
				$("#tc-rem-row-"+tkId).empty();
			}else{
				$("#task-detail-dueDate-span").html("Select a due date");
				$("#task-detail-dueDate-del").hide();
				$("#tc-dd-row-"+tkId).empty();
			}
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
 }
 
 function showRemDSel(obj){
	if(currElem!=undefined){
		try{
			if(currElem.id.indexOf("task-detail-remind-del-lbl-")!=-1 || $(currElem).hasClass("task-detail-remind-del")
				|| $(currElem).hasClass("task-detail-dueDate-del") || currElem.id.indexOf("task-detail-dueDate-del-lbl")!=-1){
				return false;
			}
		}catch(exception){
			//Nothing to catch
		}
	}
	if(obj=="close"){
		$("#selRem").slideUp(500);
		$("#selDue").slideUp(500);
		return false;
	}
	if(obj=="remindMe"){
		if($("#selRem").css("display")!="none"){
			$("#selRem").slideUp(500);
		}else{
			$("#selRem").css("width",$("#task-item-detail-remindMe").css("width"));
			$("#selRem").slideDown(500);
		}
	}else{
		if($("#selRem").css("display")!="none"){
			$("#selRem").slideUp(500);
		}
		if($("#selDue").css("display")!="none"){
			$("#selDue").slideUp(500);
		}else{
			$("#selDue").css("width",$("#task-item-detail-remindMe").css("width"));
			$("#selDue").slideDown(500);
		}
	}
	
}

 function getRemindSelElem(taskObj,tdElem){
	var merd="AM";
	var lth = getLTH();
	if(lth>12){
		lth=lth-12;
		merd="PM";
	}
	if(lth==0){
		lth=12;
	}
	var nwd = new Date();
	nwd.setDate(nwd.getDate()+7);
	nwDay = days[nwd.getDay()];
	var divId="selRem";
	var dateTId="pick-td-rem-date";
	if(tdElem=="dueDate"){
		divId="selDue";
		dateTId="pick-td-dd-date";
	}
	var taskRemSel = '<div class="row task-item-detail-elem task-detail-remind-sel" id="'+divId+'" style="z-index: 100;">';
		taskRemSel+='<div class="row sel-remind-row" onclick="updateRemindMeDate('+taskObj.taskId+',\'lth\',\''+tdElem+'\')">';
		taskRemSel+='<label>Later Today at '+lth+' '+merd+'</label>';
		taskRemSel+='</div>';
		taskRemSel+='<div class="row sel-remind-row" onclick="updateRemindMeDate('+taskObj.taskId+',\'tmr\',\''+tdElem+'\')">';
		taskRemSel+='<label >Tomorrow,&nbsp;&nbsp;9 AM</label>';
		taskRemSel+='</div>';
		taskRemSel+='<div class="row sel-remind-row" onclick="updateRemindMeDate('+taskObj.taskId+',\'nwd\',\''+tdElem+'\')">';
		taskRemSel+='<label >Next Week  '+nwDay+',&nbsp;&nbsp;9 AM</label>';
		taskRemSel+='</div>';
		taskRemSel+='<div class="row sel-remind-row">';
		taskRemSel+='<label class="col-sm-5">Pick A Date</label>';
		taskRemSel+='<input class="col-sm-7 pick-td-rem-date" type="datetime-local" id="'+dateTId+'" onblur="updateRemindMeDate('+taskObj.taskId+',\'pick\',\''+tdElem+'\')">';
		taskRemSel+='</div>';
		taskRemSel+='<div class="task-detail-rd-sel-close" onclick="showRemDSel(\'close\')">';
		taskRemSel+='<label>Close</label>';
		taskRemSel+='</div>';
		
		
		return taskRemSel;
 }
 
 function getLTH(){
	var today = new Date();
	var lth = today.getHours()+4;
	if(lth>=24){
		lth = lth-24;
	}
	return lth;
}

function updateRemindMeDate(tkId,when,tdElem){
	disableDiv();
	var remindTime;
	var action ="dueDate";
	if(when=="pick"){
		if(tdElem=="remind"){
			remindTime = $("#pick-td-rem-date").val();
		}else{
			remindTime = $("#pick-td-dd-date").val();
		}
	}else{
		remindTime = getDateTime(when);
	}
	var reqPayload = {
		"taskId" : parseInt(tkId)
	}
	if(tdElem=="remind"){
		reqPayload.remindTime=remindTime;
		reqPayload.remindMe=true;
		action = "remindMeDate";
	}else{
		reqPayload.dueDate=remindTime;
	}
	
	$.ajax({
		url:"task/"+tkId+"/"+action+"",
		type: "PUT",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		data : JSON.stringify(reqPayload)
	}).done(function(response){
		enableDiv();
		if(response.status=="success"){
			if(tdElem=="remind"){
				$("#task-item-detail-remindMe").empty().append(getTDRemindMe(response.todoTask,"update"));
				$("#selRem").slideUp();
				$("#tc-rem-row-"+tkId).empty().append(getRemTskChild(response.todoTask));
			}else{
				$("#task-detail-dueDate-span").html("Due "+convertDateT(response.todoTask.dueDate));
				$("#task-detail-dueDate-del").show();
				$("#selDue").slideUp();
				$("#tc-dd-row-"+tkId).empty().append(getDDTskChild(response.todoTask));
			}
			
		}else{
			alert("Failed to update the task Please try again after clearing your browser cache");
		}
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
}

function getDateTime(when){
	var tDate = new Date();
	var lth = "09";
	if(when=="lth"){
		lth = getLTH();
		if(lth<5){
			tDate.setDate(tDate.getDate()+1);
		}
		if(lth<10){
			lth="0"+lth;
		}
	}else if(when=="tmr"){
		tDate.setDate(tDate.getDate()+1);
	}else if(when=="nwd"){
		tDate.setDate(tDate.getDate()+7);
	}
	day=tDate.getDate();
	if(day<10){
		day="0"+day;
	}
	return remindTime = tDate.getFullYear()+"-"+monthsI[tDate.getMonth()]+"-"+day+"T"+lth+":00";
}

function getRemTskChild(taskObj){
	var remTskChild = '';
	if(($("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!="" && $("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!=undefined )
		|| $("#task-item-"+taskObj.taskId).find(".tc-dd-row").html()!=""){
		remTskChild+='<img alt="." src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
	}
		remTskChild+= '<img alt="remind date" src="../static_resources/images/bell-blue.png" style="height: 0.8em">';
		remTskChild+= '<label style="font-size: 12px">&nbsp;'+convertDateT(taskObj.remindTime)+'</label>';
		return remTskChild;
}
function getDDTskChild(taskObj){
	var ddTskChild = '';
	if(($("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!="" && $("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!=undefined )){
		ddTskChild+='<img alt="." src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
	}
	    ddTskChild+= '<img alt="due date" src="../static_resources/images/calender-blue.png" style="height: 0.8em">';
		ddTskChild+= '<label style="font-size: 12px">&nbsp;'+convertDateT(taskObj.dueDate)+'</label>';
		return ddTskChild;
}

function getNoteTskChild(taskObj){
	var ntTskChild = '';
	if(($("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!="" && $("#task-item-"+taskObj.taskId).find(".tc-tn-row").html()!=undefined )
		|| $("#task-item-"+taskObj.taskId).find(".tc-dd-row").html()!="" || $("#task-item-"+taskObj.taskId).find(".tc-rem-row").html()!=""){
		ntTskChild+='<img alt="." src="../static_resources/images/dot-blue.png" style="height: 0.2em;margin: 5px;">';
	}
		ntTskChild+= '<img alt="note" src="../static_resources/images/note-blue-s1.png" style="height: 0.8em">';
		return ntTskChild;
}

function getTDDueDate(taskObj){
	var dueDate = '<span id="task-detail-dueDate-span">Select a due date</span>';
	if(taskObj.dueDate!=undefined && taskObj.dueDate!=null){
		dueDate = '<span id="task-detail-dueDate-span">Due '+convertDateT(taskObj.dueDate)+'</span>';
	}
	var taskDDDChild = '<div class="row task-item-detail-dueDate task-item-detail-elem" id="task-item-detail-dueDate" onclick="showRemDSel(\'dueDate\')">';
		taskDDDChild+='<div class="col-sm-1 task-detail-dueDate-div">';
		taskDDDChild+='<img alt="due date" class="task-detail-dueDate-img" id="task-detail-remind-img" src="../static_resources/images/calender-blue.png">';
		taskDDDChild+='</div>';
		taskDDDChild+='<div class="col-sm-10 task-detail-font-size" style="padding: 10px;">';
		taskDDDChild+='<label>'+dueDate+'</label>';
		taskDDDChild+='</div>';
		taskDDDChild+='<div class="col-sm-1 task-detail-remind-div task-detail-dueDate-del" id="task-detail-dueDate-del">';
		taskDDDChild+='<label id="task-detail-dueDate-del-lbl-'+taskObj.taskId+'" onclick="removeRemindMe(this,\'dueDate\')">X</label>';
		taskDDDChild+='</div>';
		taskDDDChild+='</div>';
		return taskDDDChild;
}

function isDotReq(elemCls){
	
}

function getListMove(elem){
	if($("#task-item-detail-move-sel").css("display")!="none"){
		$(".task-detail-mve-close").hide();
		$("#task-item-detail-move-sel").slideUp(500);
		return false;
	}
	disableDiv();
	var tkId = elem.id.substring("task-item-detail-move-".length, elem.id.length);
	$.ajax({
		url : "task/getListsOfUsers/"+tkId,
		type : "GET",
		contentType: "application/json; charset=utf-8"
	}).done(function(response){
		$(".task-detail-mve-close").show();
		buildMoveListSel(response);
		enableDiv();
	}).fail(function(response)  {
		enableDiv();
    	alert("Sorry. Server unavailable. "+response);
	});
}

function buildMoveListSel(listObj){
	var selMoveRow = '';
	$("#task-item-detail-move-sel").css("width",$(".task-item-detail-elem").css("width"));
	var tidMoveSel = $("#task-item-detail-move-sel").empty();
	for(var i=0;i<listObj.length;i++){
		if(listObj[i].listName=="Important" || listObj[i].listName==$("#listName").val()){
			continue;
		}
		selMoveRow ='<div class="row sel-move-row" id="sel-move-row-'+listObj[i].listId+'" onclick="moveTask(this)">';
		selMoveRow+='<label>'+listObj[i].listName+'</label>';
		selMoveRow+='</div>';
		tidMoveSel.append(selMoveRow);
	}
	 $("#task-item-detail-move-sel").slideDown(500);
	
}

function moveTask(elem){
	var listId = elem.id.substring("sel-move-row-".length, elem.id.length);
	var tkId = $("#selectedTaskId").val();
	disableDiv();
	$.ajax({
		url: "task/moveTask/" + tkId + "/" + listId,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		dataType: "json"
	}).done(function(response) {
			enableDiv();
			if (response.status == "success") {
				//$("#list-item-"+response.todoList.listId).click();
				if($("#task-chkbx-"+tkId).prop("checked")){
					updateComptdTskCount("remove");
				}
				$("#task-item-"+tkId).parent().remove();
				if($("#task-detail-div").css("display")!="none"){
					$("#task-detail-div").empty();
					$("#selectedTaskId").val("");
					hadndleWidth("remove");
				}
				updateTotalTasks($("#listId").val(),"remove");
				updateTotalTasks(listId,"add");
				
			} else {
				alert("Failed to move the task Please try again after clearing your browser cache");
			}
	}).fail(function(response) {
		enableDiv();
		alert("Sorry. Server unavailable. " + response);
	});
	
}

function getMoveTaskDetails(taskObj){
	var taskDM='<div class="row task-item-detail-move task-item-detail-elem" id="task-item-detail-move-'+taskObj.taskId+'" onclick="getListMove(this)" style="">';
		taskDM+='<div class="col-sm-1 task-detail-dueDate-div">';
		taskDM+='<img alt="due date" class="task-detail-move-img" id="task-detail-remind-img" src="../static_resources/images/move-blue_20x18.png">';
		taskDM+='</div>';
		taskDM+='<div class="col-sm-8 task-detail-font-size" style="padding: 10px;">';
		taskDM+='<label><span id="task-detail-dueDate-span">Move Task</span></label>';
		taskDM+='</div>';
		taskDM+='<div class="col-sm-3 task-detail-font-size task-detail-mve-close">';
		taskDM+='<label>close</label>';
		taskDM+='</div>';
		taskDM+='</div>';
		return taskDM;
}
function getMoveListSelElem(){
	listSelElem = '<div class="row task-item-detail-elem task-item-detail-move-sel" id="task-item-detail-move-sel" style="display:none;">'
	listSelElem+='</div>';
	return listSelElem;
}
function showSelMoveList(){
	
}
