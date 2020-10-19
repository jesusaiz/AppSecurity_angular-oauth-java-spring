package com.backend.spring.appCursosProgramacion.models.service;

import java.util.List;

import com.backend.spring.appCursosProgramacion.models.entity.Curso;

public interface ICursoService {
	
	public List<Curso> findAll();
	
	public Curso findById(Long id);
	
	public Curso save(Curso curso);
	
	public void delete(Long id);
	
	

}
