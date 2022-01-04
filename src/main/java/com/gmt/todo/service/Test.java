package com.gmt.todo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Test {
	public static void main(String[] args) {
		LocalDateTime localDateTime = LocalDateTime.now();
		System.out.println(LocalDate.now());
		System.out.println(localDateTime);
		System.out.println(localDateTime.getHour());
		localDateTime = localDateTime.plusHours(4);
		System.out.println(localDateTime);
		System.out.println(localDateTime.getHour());
		System.out.println(localDateTime.withDayOfYear(5));
		LocalDateTime dateTime = LocalDateTime.of(LocalDate.now(), LocalTime.now());
		System.out.println(dateTime);
		System.out.println(LocalDate.of(2022, 1, 4));
		System.out.println(LocalTime.of(9, 30));
		System.out.println(LocalDateTime.of(LocalDate.of(2022, 1, 4), LocalTime.of(9, 30)));
		
	}
}
