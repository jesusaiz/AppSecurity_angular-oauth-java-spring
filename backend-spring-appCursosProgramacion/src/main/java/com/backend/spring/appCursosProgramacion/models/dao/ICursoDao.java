package com.backend.spring.appCursosProgramacion.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.backend.spring.appCursosProgramacion.models.entity.Curso;

public interface ICursoDao extends CrudRepository<Curso, Long> {

}
