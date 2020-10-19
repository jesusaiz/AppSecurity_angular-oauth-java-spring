package com.backend.spring.appCursosProgramacion.models.service;

import com.backend.spring.appCursosProgramacion.models.entity.Usuario;

public interface IUsuarioService {
	
	public Usuario findByUsername(String username);
	
	

}
