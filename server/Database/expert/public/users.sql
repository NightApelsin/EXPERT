create table if not exists users
(
    id       integer generated always as identity,
    email    text not null,
    password text not null,
    name     text not null,
    surname  text,
    session  text,
    constraint users_pk
        primary key (id)
);

