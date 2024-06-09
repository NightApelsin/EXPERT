create table if not exists comments
(
    id           integer generated always as identity,
    user_id      integer not null,
    grade        integer,
    comment_text text,
    doors_id     integer,
    constraint comments_user_id__fk
        foreign key (user_id) references users
);

