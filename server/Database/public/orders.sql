create table orders
(
    id               integer generated always as identity,
    user_id          integer not null
        constraint orders_user_id__fk
            references users
        constraint user_id
            references users
            on delete cascade,
    ordered_products jsonb,
    status           varchar(20) default 'регистрируется'::character varying,
    time_of_creation date,
    total_price      integer
);

alter table orders
    owner to postgres;

