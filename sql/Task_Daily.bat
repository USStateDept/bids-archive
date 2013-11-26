@echo off

   set BATCH_01=C:\pg_backups\Backup_Database.bat
   set BATCH_02=C:\pg_backups\Update_Metrics.bat

echo on
call %BATCH_01%
call %BATCH_02%