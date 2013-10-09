@echo off
   for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set dow=%%i
     set month=%%j
     set day=%%k
     set year=%%l
   )
   set datestr=%month%_%day%_%year%
   echo datestr is %datestr%
    
   set SERVER=
   set PORT=
   set PGSQL_PATH=C:\OpenGeo\pgsql\9.1\bin\
   set DATABASE=geoserver
   set BACKUP_FILE=%DATABASE%_%dow%.backup
   set PGUSERNAME=
   set PGPASSWORD=
   
   echo backup file name is %BACKUP_FILE%
   echo on
   %PGSQL_PATH%pg_dump -i -h %SERVER% -p %PORT% -U %PGUSERNAME% %PGPASSWORD% -F c -b -v -f %BACKUP_FILE% %DATABASE%