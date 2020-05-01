@echo off
for /f "tokens=1-3 delims=/ " %%i in ("%date%") do (
    set day=%%i
  set month=%%j
  set year=%%k
 )
set datestr=%day%_%month%_%year%
echo datestr is %datestr%
set BACKUP_FILE=D:/copia_%datestr%.backup  
SET PGPASSWORD=postgres
echo on

pg_dump -h localhost -p 5432 -U postgres -F c stock > %BACKUP_FILE% 

SET PGPASSWORD= postgres
