create table if not exists sessions
(
    sid    varchar(255) not null,
    expire timestamp,
    sess   jsonb,
    primary key (sid)
);

