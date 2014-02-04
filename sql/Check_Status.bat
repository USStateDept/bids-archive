@echo off

   set SERVER=
   set PORT=
   set PGSQL_PATH=C:\OpenGeo\pgsql\9.1\bin\
   set DATABASE=geoserver
   set PGUSERNAME=
   set PGPASSWORD=
   set SQL_FILE=C:\OpenGeo\webapps\bids\sql\BIDS_Status_Email.sql

echo on
%PGSQL_PATH%psql -U %PGUSERNAME% -d %DATABASE% -f %SQL_FILE%