create table if not exists orders
(
    id               integer generated always as identity,
    user_id          integer not null,
    ordered_products jsonb,
    status           varchar(20) default 'регистрируется'::character varying,
    time_of_creation date,
    total_price      integer,
    constraint orders_user_id__fk
        foreign key (user_id) references users,
    constraint user_id
        foreign key (user_id) references users
            on delete cascade
);

