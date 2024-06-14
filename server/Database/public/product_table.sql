create table product_table
(
    id                 serial,
    name               varchar,
    description        varchar,
    image              jsonb,
    price              varchar,
    filters            jsonb,
    main_parameters_id integer
        constraint product_table_general_characteristics_id_fk
            references general_characteristics,
    decoration_id      integer
        constraint product_table_decoration_id__fk
            references decoration,
    furniture_id       integer
        constraint product_table_furniture_id__fk
            references furniture,
    insulation_id      integer
        constraint product_table_insulaton_id__fk
            references insulation,
    security_id        integer
        constraint product_table_security_id__fk
            references security,
    tightness_id       integer
        constraint product_table_tightness_id__fk
            references tightness,
    usability_id       integer
        constraint product_table_usability_id__fk
            references usability
);

alter table product_table
    owner to admin;

