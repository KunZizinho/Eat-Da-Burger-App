drop database if exists burgers_db;
create database burgers_db;
use burgers_db;

CREATE TABLE burgers (
id int(5) auto_increment not null,
burger_name VARCHAR(20),
devoured boolean default false,
primary key (id)
);