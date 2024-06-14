create table users
(
    id       integer generated always as identity
        constraint users_pk
            primary key,
    email    text not null,
    password text not null,
    name     text not null,
    surname  text,
    session  text,
    cart     jsonb default '{"doorsId": [], "optionalProducts": {"locks": [], "handles": [], "armorShield": [], "videoSecurity": []}}'::jsonb
);

alter table users
    owner to postgres;

