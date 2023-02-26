docker build -t json-view .
docker tag json-view:latest 193464637155.dkr.ecr.ap-northeast-1.amazonaws.com/json-view:latest
docker push 193464637155.dkr.ecr.ap-northeast-1.amazonaws.com/json-view:latest