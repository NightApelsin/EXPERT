create table tightness
(
    id            serial
        primary key,
    seal_count    integer,
    seal_material varchar(100)
);

alter table tightness
    owner to postgres;

