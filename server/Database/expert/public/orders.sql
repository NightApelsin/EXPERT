create table if not exists orders
(
    id             integer generated always as identity,
    user_phone     varchar not null,
    order_products json
);

