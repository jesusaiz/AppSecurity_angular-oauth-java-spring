package com.backend.spring.appCursosProgramacion.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@EnableGlobalMethodSecurity(securedEnabled=true)
@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter{

	//Implementamos UserDetailService
	@Autowired
	private UserDetailsService usuarioService;
	
	//creamos el metodo password encoder con Bcrypt y registramos un bean un metodo k retorna objetos
	//para inyectar en otra class o donde queramos
	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
		
	}
	
	//registramos el servicio
	@Override
	@Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//registramos el UserDetailService
			auth.userDetailsService(this.usuarioService).passwordEncoder(passwordEncoder());
	}
		
	//registramos el authentication manager con Bean para utilizarlo en Auth
	@Bean("authenticationManager")
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		
		return super.authenticationManager();
	}
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
		//cualquier otra pagina es privada
		.anyRequest().authenticated()
		//desabilitar csrf cross origin en formulario
		.and()
		.csrf().disable()
		//manejo de sesion deshabilitado ya que va en el token
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		
		
	}

	
}
