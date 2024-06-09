create table if not exists insulation
(
    id                       serial,
    filler_type              varchar(100),
    filler_thickness         integer,
    filler_fire_class        varchar(50),
    filler_using_temperature varchar(50),
    door_frame_insulation    boolean,
    primary key (id)
);

