create table if not exists tightness
(
    id            serial,
    seal_count    integer,
    seal_material varchar(100),
    primary key (id)
);

