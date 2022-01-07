<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isELIgnored="false"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
<link href="../static_resources/css/Home.css" rel="stylesheet" />
<script type="text/javascript" src="../static_resources/js/Home.js"></script>

</head>
<body style="background-color: white">
	<div class="container">
		<div class="row">
			<h1 style="font-style: italic;">Manage Users</h1>
		</div>
		<div class="row">
			<table class="table table-striped table-bordered table-hover table-condensed table-responsive">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Roles</th>
						<th>Password</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${users}" var="user">
						<tr id="table-row-${user.getId()}">
							<td>${user.getId()}</td>
							<td>${user.getName()}</td>
							<td>${user.getUserName()}</td>
							<td>${user.getRoles()}</td>
							<td>${user.getPassWord()}</td>
							<td>
								<button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.getId()})">Delete</button>
							</td>
							</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>