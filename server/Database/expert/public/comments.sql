create table if not exists comments
(
    id           integer generated always as identity,
    user_phone   varchar not null,
    grade        integer,
    comment_text text,
    images       text
);

