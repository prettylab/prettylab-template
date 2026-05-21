#!/bin/bash

CONTAINER="mariadb"
BACKUP_DIR="./backup/db"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

REMOVE_OLDER=""
for arg in "$@"; do
  case "$arg" in
    --remove-older=*)
      REMOVE_OLDER="${arg#*=}"
      ;;
  esac
done

YELLOW="\033[33m"
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

mkdir -p "$BACKUP_DIR"

echo -e "\n${YELLOW}○  Dumping all databases...${RESET}"
docker exec "$CONTAINER" mariadb-dump \
  --user="$MYSQL_USER" \
  --password="$MYSQL_PASSWORD" \
  --all-databases \
  --single-transaction \
  --routines \
  --events \
  --triggers \
  --flush-logs \
  --hex-blob \
  | gzip > "${BACKUP_DIR}/mariadb-${TIMESTAMP}.sql.gz"

if [ "${PIPESTATUS[0]}" -ne 0 ]; then
  echo -e "\n${RED}○  Backup FAILED${RESET}"
  exit 1
fi

echo -e "\n${YELLOW}○  Backup created: ${BACKUP_DIR}/mariadb-${TIMESTAMP}.sql.gz${RESET}"

if [ -n "$REMOVE_OLDER" ]; then
  echo -e "\n${RED}○  Deleting backups older than ${REMOVE_OLDER} days...${RESET}"
  find "$BACKUP_DIR" -type f -name "mariadb-*.sql.gz" -mtime +$REMOVE_OLDER -delete
fi

echo -e "\n${GREEN}○  Done.${RESET}"
