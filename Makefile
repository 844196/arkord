
.PHONY: check
check:
	source .env && serverless invoke local --function check \
	  -e SERVER_IP=$$SERVER_IP \
	  -e SERVER_PORT=$$SERVER_PORT \
	  -e DISCORD_TOKEN=$$DISCORD_TOKEN