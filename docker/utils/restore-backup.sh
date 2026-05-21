#!/bin/bash

CONTAINER="mariadb"
MYSQL_USER="root"
MYSQL_PASSWORD="root"

YELLOW="\033[33m"
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

if [ -z "$1" ]; then
  echo -e "\n${YELLOW}○  Usage: $0 <backup-file.sql.gz>${RESET}"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo -e "\n${RED}○  Backup file not found: $BACKUP_FILE${RESET}"
  exit 1
fi

echo -e "\n${YELLOW}○  Restoring from $BACKUP_FILE ...${RESET}"
gunzip < "$BACKUP_FILE" | docker exec -i "$CONTAINER" mariadb -u"$MYSQL_USER" -p"$MYSQL_PASSWORD"

if [ "${PIPESTATUS[0]}" -eq 0 ]; then
  echo -e "\n${GREEN}○  Restore completed successfully.${RESET}"
else
  echo -e "\n${RED}○  Restore failed.${RESET}"
fi
