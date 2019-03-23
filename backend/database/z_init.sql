CREATE SCHEMA test_sch;
SET SEARCH_PATH TO test_sch, public;
CREATE TABLE test
(
  id serial NOT NULL CONSTRAINT test_pkey PRIMARY KEY,
  description VARCHAR (256) NOT NULL
);




create table proposal
(
  id          serial       not null
    constraint proposal_pkey
    primary key,
  geometry    geometry     not null,
  name        varchar(256) not null,
  description text,
  CONSTRAINT parcel_srid_geometry CHECK ((st_srid(geometry) = 3857))
);

CREATE INDEX proposal_geometry_idx ON proposal USING gist (geometry);


CREATE TABLE "user"
(
    id serial PRIMARY KEY,
    login varchar(64) NOT NULL
);
CREATE UNIQUE INDEX user_login_uindex ON "user" (login);

CREATE TABLE notification_zone
(
    id serial PRIMARY KEY,
    id_user integer not null,
    geometry geometry,
    name varchar(64) NOT NULL,
    CONSTRAINT notification_zone_id_user_fk FOREIGN KEY (id_user) REFERENCES "user"(id),
    CONSTRAINT parcel_srid_geometry CHECK ((st_srid(geometry) = 3857))
);

create index notification_zone_id_user_index on notification_zone (id_user);
CREATE INDEX notification_zone_geometry_idx ON notification_zone USING gist (geometry);
