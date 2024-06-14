create table qforconsultation
(
    id                integer generated always as identity,
    "clientPhone"     text,
    "clientCookie"    jsonb,
    date_registration date,
    status            text
);

alter table qforconsultation
    owner to postgres;

