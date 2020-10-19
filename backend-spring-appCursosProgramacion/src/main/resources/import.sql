/*Artistas*/
INSERT INTO `cursos` (id, nombre, descripcion, horas) VALUES(1, 'Java', 'Programación Java EE Y framework Spring', 150);
INSERT INTO `cursos` (id, nombre, descripcion, horas) VALUES(2, 'Python', 'Introducción Python y Data cience', 150);




/* Creamos algunos usuarios con sus roles */
INSERT INTO `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('jesus','$2a$10$afmGzLs7v3jrMV2xkEP37.BkTk/BfhAI0OCRqD/XqnNj3f9Nee5yW',1, 'Jesus', 'Saiz','jesusr@gmail.com');
INSERT INTO `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('admin','$2a$10$vzg3qTfsR/..azyZJyubYe7RbF9WWvF6gDO4ScrzyQcN9XMjpFD.u',1, 'John', 'Doe','jhon.doe@gmail.com');

INSERT INTO `roles` (nombre) VALUES ('ROLE_USER');
INSERT INTO `roles` (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (1, 1);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 2);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 1);
