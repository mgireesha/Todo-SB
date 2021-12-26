<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" isELIgnored="false" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
<link href="../static_resources/css/SignIn.css" rel="stylesheet" />
    <title>ToDo App : Login</title>
</head>
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
						<input class="form-control signup-input" type="password" name="createPwd" id="createPwd" placeholder="Create password" required />
					</div>
					<div class="row row-label">
						<label for="confirmPwd" class="signup-label">Confirm password</label>
						<input class="form-control signup-input" type="password" name="confirmPwd" id="confirmPwd" placeholder="Confirm password" required />
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
