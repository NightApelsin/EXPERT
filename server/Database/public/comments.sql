create table comments
(
    id           integer generated always as identity,
    user_id      integer not null
        constraint comments_user_id__fk
            references users
        constraint user_id
            references users
            on delete cascade,
    grade        integer,
    comment_text text,
    doors_id     integer
);

alter table comments
    owner to postgres;

