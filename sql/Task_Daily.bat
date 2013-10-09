@echo off

   set BATCH_01=C:\PostgresqlBack\Backup_Database.bat
   set BATCH_02=C:\PostgresqlBack\Update_Metrics.bat

echo on
call %BATCH_01%
call %BATCH_02%