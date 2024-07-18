create table if not exists users
(
    id       integer generated always as identity,
    email    text not null,
    password text not null,
    name     text not null,
    surname  text,
    session  text,
    cart     jsonb default '{"doorsId": [], "optionalProducts": {"locks": [], "handles": [], "armorShield": [], "videoSecurity": []}}'::jsonb,
    constraint users_pk
        primary key (id)
);

