CREATE SCHEMA test_sch;
SET SEARCH_PATH TO test_sch;
CREATE TABLE test
(
  id serial NOT NULL CONSTRAINT test_pkey PRIMARY KEY,
  description VARCHAR (256) NOT NULL
);
