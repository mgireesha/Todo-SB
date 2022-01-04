package com.gmt.todo.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.gmt.todo.service.CustomAccessDeniedHandler;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	AuthenticationSuccessHandler successHandler;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
        	.authorizeRequests()
            .antMatchers("/static_resources/**","/todo/signup","/todo/runcsv").permitAll()
            .antMatchers("/todo/ManageUsers").hasRole("ADMIN")
   		 	.antMatchers("/todo/**").hasAnyRole("USER","ADMIN")
            .anyRequest().authenticated()
            .and()
            .exceptionHandling().accessDeniedPage("/todo/accessDenied")
            .and()
            .formLogin()
            .loginPage("/todo/login").successHandler(successHandler)
            .permitAll()
            .failureUrl("/todo/login-error")
            .and()
            .logout().permitAll()
            .and()
            .httpBasic().and()
            .csrf()
            .disable();
	}
	
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
	@Bean
	public AccessDeniedHandler accessDeniedHandler(){
	    return new CustomAccessDeniedHandler();
	}

}
