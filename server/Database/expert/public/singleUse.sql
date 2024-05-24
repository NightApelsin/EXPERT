create table if not exists comments
(
    id           integer generated always as identity,
    user_phone   varchar not null,
    grade        integer,
    comment_text text,
    images       text
);

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

create table if not exists furniture
(
    id               serial,
    furniture_color  varchar(50),
    handle_type      varchar(50),
    closer           boolean,
    doorstep         boolean,
    hinge_decoration boolean,
    primary key (id)
);

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

create table if not exists orders
(
    id             integer generated always as identity,
    user_phone     varchar not null,
    order_products json
);



create table if not exists qforconsultation
(
    id                integer generated always as identity,
    "clientPhone"     text,
    "clientCookie"    jsonb,
    date_registration date,
    status            text
);

create table if not exists security
(
    id                    serial,
    metal_sheet_count     integer,
    metal_sheet_thickness varchar(20),
    stiffness_rib_count   integer,
    static_locks_count    integer,
    locks_count           integer,
    locks_mark            varchar(100),
    locks_class           varchar(5),
    armor_lining          boolean,
    armor_package         boolean,
    night_crossbar        boolean,
    primary key (id)
);

create table if not exists tightness
(
    id            serial,
    seal_count    integer,
    seal_material varchar(100),
    primary key (id)
);

create table if not exists usability
(
    id                     serial,
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
    night_latch            boolean,
    primary key (id)
);

create table if not exists users
(
    id       integer generated always as identity,
    email    text not null,
    password text not null,
    name     text not null,
    surname  text,
    session  text,
    constraint users_pk
        primary key (id)
);

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