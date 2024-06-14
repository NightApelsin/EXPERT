create table sessions
(
    sid    varchar(255) not null
        primary key,
    expire timestamp,
    sess   jsonb
);

alter table sessions
    owner to postgres;

