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

