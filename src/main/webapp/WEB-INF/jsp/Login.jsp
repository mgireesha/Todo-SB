<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Design by foolishdeveloper.com -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
<link href="../static_resources/css/SignIn.css" rel="stylesheet" />
    <title>ToDo App</title>
 
    <!-- <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"> -->
    <!--Stylesheet-->
<!--     <style media="screen">
      *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #080710;
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

.login-label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}

    </style> -->
</head>
<%-- <body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form action="/todo/login" method="post">
        <h3>Login Here</h3>

        <label class="login-label" for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" name="username" required>

        <label class="login-label" for="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" required>
		<c:if test="${not empty errorMessage}">
			<label style="color: #c9300d">${errorMessage }</label>
		</c:if>
		
        <button>Log In</button>
        <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
</body> --%>






<body style="background-color: #2e2729;" class="body-signin">

	<div class="container">
		<div class="row row-main">
			<div class="col-sm-3"></div>
			<div class="col-sm-5 middle-span">
				<form action="/todo/login" method="post" class="signup-form" id="signin-form" style="display:${action eq 'signup' ? 'none' : 'block'}">
					<h1 class="signup-header">Sign In</h1>
					<div class="row row-label">
						<label for="username" class="signup-label">User Name</label>
						<input class="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
					</div>
					<div class="row row-label">
						<label for="password" class="signup-label">Password</label>
						<input class="form-control signup-input" type="password" name="password" id="password" placeholder="Create password" required />
						<c:if test="${not empty errorMessage}">
							<label style="color: #c9300d" class="signup-label">${errorMessage }</label>
						</c:if>
						<label for="password" class="signup-label"><a style="color: #0d6efd;cursor: pointer;font-size: 12px">Forgot password ?</a></label>
					</div>
					<div class="row row-btn">
						<button type="submit" class="btn-signup">Sign In</button>
					</div>
					<div class="row row-label">
						<label for="confirmPwd" class="signup-label">New user ? <a onclick="slideSignUp()" style="color: #0d6efd;text-decoration: underline;cursor: pointer;">sign up</a> here</label>
					</div>
					</form>
					<form action="/todo/signup" method="post" class="signup-form" id="signup-form" style="display: none;">
					<h1 class="signup-header">Sign Up</h1>
					<div class="row row-label">
						<label for="name" class="signup-label">Name</label>
						<input class="form-control signup-input" name="name" id="name" placeholder="Your name" required />
					</div>
					<div class="row row-label">
						<label for="email" class="signup-label">Email</label>
						<input class="form-control signup-input" name="email" id="email" placeholder="Your email" required />
					</div>
					<div class="row row-label">
						<label for="createPwd" class="signup-label">Create new password</label>
						<input class="form-control signup-input" name="createPwd" id="createPwd" placeholder="Create password" required />
					</div>
					<div class="row row-label">
						<label for="confirmPwd" class="signup-label">Create new password</label>
						<input class="form-control signup-input" name="confirmPwd" id="confirmPwd" placeholder="Confirm password" required />
					</div>
					<div class="row row-btn">
						<button type="submit" class="btn-signup">Sign Up</button>
					</div>
					<div class="row row-label">
						<label for="confirmPwd" class="signup-label">Already a user ? <a onclick="slideSignIn()" style="color: #0d6efd;text-decoration: underline;cursor: pointer;">sign in</a></label>
					</div>
				</form>
				<div id="success-signup" style="display:${action ne 'signup' ? 'none' : 'block'}">
					<h1 class="signup-header" style="color: green">Success!</h1>
					<div class="row row-label">
						<h4>You have registered successfully. Please sign in to continue.</h4>
					</div>
					<div class="row row-btn">
						<button type="button" class="btn-signup" onclick="slideSignIn()">Sign In</button>
					</div>
				</div>
			</div>
			<div class="col-sm-3"></div>
		</div>
	</div>
<script type="text/javascript">
	function slideSignIn(){
		$("#signup-form").slideUp();
		$("#signin-form").slideDown(1000);
		$("#username").focus();
		$("#success-signup").hide();
	}
	function slideSignUp(){
		$("#signin-form").slideUp();
		$("#signup-form").slideDown(1000);
		$("#name").focus();
	}
</script>
</body>
</html>
