all-debug:

all:

deploy-test:

deploy:

npm-install: \
	npm-install-express\
	npm-install-ejs\
	npm-install-mongodb\
	npm-install-mongoose
	
npm-install-express:
	cd && npm install express

npm-install-ejs:
	cd && npm install ejs

npm-install-mongodb:
	cd && npm install mongodb --mongodb:native
	
npm-install-mongoose:
	cd && npm install mongoose

