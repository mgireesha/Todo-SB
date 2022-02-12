package com.gmt.todo.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		String redirectUrl = "/todo/Home";

		/*
		 * Collection<? extends GrantedAuthority> authorities =
		 * authentication.getAuthorities(); for (GrantedAuthority grantedAuthority :
		 * authorities) { System.out.println("role " + grantedAuthority.getAuthority());
		 * if (grantedAuthority.getAuthority().equals("ROLE_USER")) { redirectUrl =
		 * "/userDashboard"; break; } else if
		 * (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) { redirectUrl =
		 * "/adminDashboard"; break; } } System.out.println("redirectUrl " +
		 * redirectUrl); if (redirectUrl == null) { throw new IllegalStateException(); }
		 */
		new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
	}
}
