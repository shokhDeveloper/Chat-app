CREATE DATABASE socket_app;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id BIGSERIAL primary key ,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    confirmPassword VARCHAR(200) NOT NULL  
);

DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE groups(
    group_id BIGSERIAL primary key,
    group_name VARCHAR(50) not null unique,
    user_id INT references users(user_id)
);

DROP TABLE IF EXISTS groups_users CASCADE;
CREATE TABLE group_users(
    group_id INT references groups(group_id),
    user_id INT references users(user_id)
);  