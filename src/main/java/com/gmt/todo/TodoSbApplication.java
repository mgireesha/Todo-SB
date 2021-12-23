package com.gmt.todo;

import java.util.Collections;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.google.common.base.Predicate;

import springfox.documentation.RequestHandler;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class TodoSbApplication {

	private static final Logger log = LoggerFactory.getLogger(TodoSbApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TodoSbApplication.class, args);
	}

	@Bean
	public Docket swaggerConfiguration() {
		return new Docket(DocumentationType.SWAGGER_2).select().paths(PathSelectors.ant("/todo/**"))
				.apis(RequestHandlerSelectors.basePackage("com.gmt.todo")).apis(customRequestHandlers()).build()
				.apiInfo(apiDetails());
	}

	private Predicate<RequestHandler> customRequestHandlers() {
		return new Predicate<RequestHandler>() {
			@Override
			public boolean apply(RequestHandler input) {
				Set<RequestMethod> methods = input.supportedMethods();
				return methods.contains(RequestMethod.GET) || methods.contains(RequestMethod.POST)
						|| methods.contains(RequestMethod.PUT) || methods.contains(RequestMethod.DELETE);
			}
		};
	}

	private ApiInfo apiDetails() {
		return new ApiInfo("Todo Appication", "MS Todo recreation", "1.0", "Free to use",
				new springfox.documentation.service.Contact("Gireesh M T", "https://linktr.ee/mgireesha",
						"gmt@gamil.com"),
				"API License", "https://example.com", Collections.emptyList());
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/todo").allowedOrigins("http://localhost:8080");
			}
		};
	}

}
