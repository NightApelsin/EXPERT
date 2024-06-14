create table usability
(
    id                     serial
        primary key,
    hinge_type             varchar(50),
    hinge_count            integer,
    opening_angle          varchar(20),
    eye_height             varchar(20),
    eye_vision_angle       varchar(20),
    removable_panel_angles boolean,
    electronic_lock        boolean,
    functional_lock        boolean,
    lock_regulation        boolean,
    invisible_lock         boolean,
    night_latch            boolean
);

alter table usability
    owner to postgres;

