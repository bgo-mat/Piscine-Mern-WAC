#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 {save|restore}"
  exit 1
fi

DB_NAME="mern-pool"
COLLECTION_NAME="students"
BACKUP_DIR="backup"
MONGO_PORT=27042

if [ "$1" == "save" ]; then
  mkdir -p $BACKUP_DIR
  mongodump --db $DB_NAME --collection $COLLECTION_NAME --out $BACKUP_DIR --port $MONGO_PORT
  if [ $? -eq 0 ]; then
    echo "Backup saved in folder $BACKUP_DIR."
  else
    echo "Failed to save backup."
    exit 1
  fi

elif [ "$1" == "restore" ]; then
  if [ ! -d "$BACKUP_DIR" ]; then
    echo "Backup directory $BACKUP_DIR does not exist."
    exit 1
  fi
  mongo --port $MONGO_PORT $DB_NAME --eval "db.$COLLECTION_NAME.drop()"
  mongorestore --db $DB_NAME --collection $COLLECTION_NAME $BACKUP_DIR/$DB_NAME/$COLLECTION_NAME.bson --port $MONGO_PORT
  if [ $? -eq 0 ]; then
    echo "Database restored from backup folder."
  else
    echo "Failed to restore database."
    exit 1
  fi

else
  echo "Invalid argument: $1"
  echo "Usage: $0 {save|restore}"
  exit 1
fi

exit 0
