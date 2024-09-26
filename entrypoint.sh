#!/bin/bash
set -e

# Verificar si el archivo de changelog existe en la ruta montada
if [ ! -f /liquibase/changelog/db.changelog-master.yaml ]; then
  echo "El archivo /liquibase/changelog/db.changelog-master.yaml no existe."
  exit 1
fi

# Ejecutar Liquibase
/liquibase/liquibase "$@"