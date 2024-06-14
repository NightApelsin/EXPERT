create sequence "queueForConsultation_id_seq";

alter sequence "queueForConsultation_id_seq" owner to postgres;

alter sequence "queueForConsultation_id_seq" owned by qforconsultation.id;

