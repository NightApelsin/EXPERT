create table if not exists furniture
(
    id               serial,
    furniture_color  varchar(50),
    handle_type      varchar(50),
    closer           boolean,
    doorstep         boolean,
    hinge_decoration boolean,
    primary key (id)
);

