create table if not exists qforconsultation
(
    id                integer generated always as identity,
    "clientPhone"     text,
    "clientCookie"    jsonb,
    date_registration date,
    status            text
);

