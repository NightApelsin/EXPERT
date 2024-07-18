create table if not exists decoration
(
    id                   serial,
    coating_type         varchar(100),
    coating_color        varchar(50),
    exterior_finish      varchar(100),
    interior_finish      varchar(100),
    decorative_threshold boolean,
    primary key (id)
);

