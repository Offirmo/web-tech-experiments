#! /bin/bash

## launch me with sudo rights on a ci node !

echo "* cleaning npm-pkgr..."
rm -rf /var/lib/jenkins/.npm-pkgr
rm -rf ~/.npm-pkgr
echo "* cleaning jenkins workspace..."
rm -rf ~/jenkins-slave-root/workspace/*

echo "* cleaning /tmp..."
rm -rf /tmp/e2e
rm -rf /tmp/d-*
rm -rf /tmp/npm-*

echo "* cleaning postgres..."
su - postgres -c 'for db in `psql -A -t -c "SELECT datname FROM pg_database" | egrep "^e2e_"`; do psql -c "DROP DATABASE $db"; done'

echo "* cleaning OSS..."
for idx in `curl -XGET http://localhost:9090/services/rest/index | jq -r -c '.indexList[]' | egrep '^e2e_'`; do
  curl -XDELETE "http://localhost:9090/services/rest/index/$idx";
done

echo "* Done."
