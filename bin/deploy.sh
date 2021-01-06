echo 'start';
docker start 7b5a &&
docker exec -it 7b5a bash &&
psql -U blog &&
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8' &&

cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch;
yarn compile &&
yarn migration:run &&
git reset --hard HEAD &&
docker build -t ying/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d ying/node-web-app &&
echo 'OK!'