create table if not exists product_table
(
    id                 serial,
    name               varchar,
    description        varchar,
    image              jsonb,
    price              varchar,
    filters            jsonb,
    main_parameters_id integer,
    decoration_id      integer,
    furniture_id       integer,
    insulation_id      integer,
    security_id        integer,
    tightness_id       integer,
    usability_id       integer,
    constraint product_table_general_characteristics_id_fk
        foreign key (main_parameters_id) references general_characteristics,
    constraint product_table_decoration_id__fk
        foreign key (decoration_id) references decoration,
    constraint product_table_furniture_id__fk
        foreign key (furniture_id) references furniture,
    constraint product_table_insulaton_id__fk
        foreign key (insulation_id) references insulation,
    constraint product_table_security_id__fk
        foreign key (security_id) references security,
    constraint product_table_tightness_id__fk
        foreign key (tightness_id) references tightness,
    constraint product_table_usability_id__fk
        foreign key (usability_id) references usability
);

