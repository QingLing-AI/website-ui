all:

dev:
	pnpm dev

build:
	rm -rf dist
	pnpm build

deploy: build
	scp -r dist/* qingling-ai.com:/qingling-ai/webui
	ssh qingling-ai.com "chmod -R o+r /qingling-ai/webui"
	ssh qingling-ai.com "docker compose -f /clouddream/nginx-proxy-manage/docker-compose.yml  up -d"