create table if not exists general_characteristics
(
    id                      serial,
    creator                 varchar(100),
    product_name            varchar(100),
    open_side               varchar(50),
    door_width              integer,
    door_direction          text,
    door_box_type           varchar(50),
    sound_insulation        varchar(20),
    individual_width_range  varchar(50),
    individual_height_range varchar(50),
    door_weight_min         varchar(20),
    primary key (id)
);

