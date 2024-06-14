create table decoration
(
    id                   serial
        primary key,
    coating_type         varchar(100),
    coating_color        varchar(50),
    exterior_finish      varchar(100),
    interior_finish      varchar(100),
    decorative_threshold boolean
);

alter table decoration
    owner to postgres;

