create table administration_table
(
    login      text,
    password   text,
    session_id text
);

alter table administration_table
    owner to postgres;

