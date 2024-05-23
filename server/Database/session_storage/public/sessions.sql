create table if not exists sessions
(
    sid     varchar(255) not null,
    expires bigint,
    data    bytea,
    expire  timestamp,
    sess    jsonb,
    primary key (sid)
);

