create table general_characteristics
(
    id                      serial
        primary key,
    creator                 varchar(100),
    product_name            varchar(100),
    open_side               varchar(50),
    door_width              integer,
    door_direction          text,
    door_box_type           varchar(50),
    sound_insulation        varchar(20),
    individual_width_range  varchar(50),
    individual_height_range varchar(50),
    door_weight_min         varchar(20)
);

alter table general_characteristics
    owner to postgres;

