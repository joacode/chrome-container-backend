#ejecuto las migraciones
liquibase --changelog-file=liquibase-config.xml --username=chrome_container_backend --password=postgres --url jdbc:postgresql://0.0.0.0:5332/chrome_container_backend_db update
