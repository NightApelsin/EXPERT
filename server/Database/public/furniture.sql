create table furniture
(
    id               serial
        primary key,
    furniture_color  varchar(50),
    handle_type      varchar(50),
    closer           boolean,
    doorstep         boolean,
    hinge_decoration boolean
);

alter table furniture
    owner to postgres;

