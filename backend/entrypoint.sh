#!/usr/bin/env sh
set -e

# Run DB migrations if alembic is configured
if [ -f "migrations/env.py" ]; then
  echo "Running migrations..."
  flask db upgrade || true
fi

echo "Starting server..."
exec gunicorn --bind 0.0.0.0:${PORT:-5555} app:app

