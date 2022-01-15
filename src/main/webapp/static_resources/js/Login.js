/**
 * 
 */
 function slideSignIn(){
		$("#signup-form").slideUp();
		$("#reset-pwd-form").slideUp();
		$("#signin-form").slideDown(1000);
		$("#username").focus();
		$("#success-signup").hide();
	}
	function slideSignUp(){
		$("#signin-form").slideUp();
		$("#signup-form").slideDown(1000);
		$("#name").focus();
	}
	function slideInRPD(){
		$("#signin-form").slideUp();
		$("#reset-pwd-form").slideDown(1000);
	}
	
	function initRPD(){
		$("#init-rpd-error").hide();
		var userName=$("#username-resetP").val();
		var url = "/todo/init-reset-pwd";
		var reqPayload ={
				"userName":userName
		}
		$.ajax({
			url:url,
			type:"POST",
			contentType: "application/json; charset=utf-8",
	    	dataType: "json",
	    	data : JSON.stringify(reqPayload)
		}).done(function (response){
			if(response.status=="MESSAGE_SENT"){
				$("#reset-pwd-checkOTP-div").slideDown(1000);
				$("#userName-reset").val(response.user.userName);
				$("#reset-pwd-div").hide();
				//$("#reset-pwd-cp-div").slideDown(1000);
			}else if(response.status=="failed"){
				$("#init-rpd-error").html(response.error);
				$("#init-rpd-error").show();
			}
		}).fail(function (response){
			
		});
	}
	
	function resetPassword(){
		var userName = $("#userName-reset").val();
		var url = "/todo/reset-pwd";
		var createPwd = $("#createPwd-reset").val();
		var confirmPwd = $("#confirmPwd-reset").val();
		var reqPayload ={
				"userName":userName,
				"passWord":confirmPwd,
				"otp":$("#otp-resetP").val()
		}
		if(createPwd==confirmPwd){
			$.ajax({
				url:url,
				type:"POST",
				contentType: "application/json; charset=utf-8",
	    		dataType: "json",
	    		data : JSON.stringify(reqPayload)
			}).done(function(response){
				if(response.status=="success"){
					$("#message").html("Password reset successful. Please sign in to continue.");
					$("#reset-pwd-cp-div,#go-back-to-login").hide();
					$("#success-signup").slideDown(1000);
				}else if(response.status=="otpNotFound"){
					$("#reset-pwd-checkOTP-div").slideDown(1000);
					$("#verify-otp-error").show();
					$("#verify-otp-error").html(response.error);
					$("#reset-pwd-cp-div").hide();
				}
			}).fail(function(response){
				
			});
		}else{
			alert("Passwords dont match!");
		}
	}
	
	function verifyOTP(){
		var userName=$("#username-resetP").val();
		var url = "/todo/reset-pwd-checkOTP";
		var reqPayload ={
				"userName":userName,
				"otp":$("#otp-resetP").val()
		}
		$.ajax({
			url:url,
			type:"POST",
			contentType: "application/json; charset=utf-8",
	    	dataType: "json",
	    	data : JSON.stringify(reqPayload)
		}).done(function (response){
			if(response.status=="success"){
				//$("#reset-pwd-checkOTP-div").slideDown(1000);
				//$("#userName-reset").val(response.user.userName);
				//$("#reset-pwd-div").hide();
				$("#reset-pwd-checkOTP-div").hide()
				$("#reset-pwd-cp-div").slideDown(1000);
				$("#otp-resetP").val(response.user.otp);
			}else{
				$("#verify-otp-error").show();
				$("#verify-otp-error").html(response.error);
			}
		}).fail(function (response){
			
		});
	}