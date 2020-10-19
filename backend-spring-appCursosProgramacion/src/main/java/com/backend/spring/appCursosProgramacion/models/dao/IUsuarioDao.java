package com.backend.spring.appCursosProgramacion.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.backend.spring.appCursosProgramacion.models.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{
	
	public Usuario findByUsername(String username);

}
