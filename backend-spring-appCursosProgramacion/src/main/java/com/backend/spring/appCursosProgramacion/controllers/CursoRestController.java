package com.backend.spring.appCursosProgramacion.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.spring.appCursosProgramacion.models.entity.Curso;
import com.backend.spring.appCursosProgramacion.models.service.ICursoService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class CursoRestController {
	
	@Autowired
	private ICursoService cursoService;
	
	@GetMapping("/cursos")
	public List<Curso> index(){
		return cursoService.findAll();
		
	}
	
	//Show
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/cursos/{id}")
	public ResponseEntity<?> show(@PathVariable Long id){
		
		Curso cursoId = null;
		Map<String, Object> response = new HashMap<>();
					
		
		try {
			cursoId = cursoService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		if(cursoId == null) {
			response.put("mensaje", "El curso por  ID: "
					.concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Curso>(cursoId, HttpStatus.OK);
				
	}
	
	
	//Create
	@Secured("ROLE_ADMIN")
	@PostMapping("/cursos")
	public ResponseEntity<?> crear(@RequestBody Curso curso, BindingResult result){
		
		Curso cursoNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("error", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			
		}
		try {
			cursoNew = cursoService.save(curso);
			
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente ha sido creado con éxito!");
		response.put("curso", cursoNew);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
	}
	
	
	//Update
	@Secured("ROLE_ADMIN")
	@PutMapping("/cursos/{id}")
	public ResponseEntity<?> update(@RequestBody Curso curso, BindingResult result,
									@PathVariable Long id){
		
		Curso cursoActual = cursoService.findById(id);
		Curso cursoUpdate = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()){
			List<String> error = result.getFieldErrors()
					.stream()
					.map(err -> "El campo'" + err.getField() + "'" + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("error", error);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
				
		}
		if(cursoActual == null) {
			response.put("mensaje", "Error: no se pudo editar, el cliente ID: "
					.concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			
		} try {
			
			cursoActual.setId(curso.getId());
			cursoActual.setNombre(curso.getNombre());
			cursoActual.setDescripcion(curso.getDescripcion());
			cursoActual.setHoras(curso.getHoras());
			
			cursoUpdate = cursoService.save(cursoActual);
			
			
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El curso ha sido actualizado con éxito!");
		response.put("curso", cursoUpdate);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/cursos/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){

		Map<String, Object> response = new HashMap<>();
		
		try {
			cursoService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el curso de la base de datos");
			response.put("error", e.getMessage()
					.concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El curso eliminado con éxito!");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		
	}
	

}
