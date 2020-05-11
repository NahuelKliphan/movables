@echo off
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "fullstamp=%YYYY%-%MM%-%DD%"
echo el nombre es copia_%fullstamp%.backup
set BACKUP_FILE=D:/Copias/copia_%fullstamp%.backup 
SET PGPASSWORD=postgres
echo on

pg_dump -h localhost -p 5432 -U postgres -F c stock > %BACKUP_FILE% 

SET PGPASSWORD= postgres

pause

