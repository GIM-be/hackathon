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
  geometry    text     not null,
  name        varchar(256) not null,
  description text
);
