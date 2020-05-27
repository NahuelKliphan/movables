SET /P backup= "Nombre de la copia:"
pg_restore -h localhost -p 5432 -U postgres -d stock -v %backup%
pause