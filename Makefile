build-debug: _site html css-debug bin.client-debug bin.server-debug
	@ echo "[build-debug]"

build-release: _site html css-release bin.client-debug bin.server-debug
	@ echo "[build-release]"

clean:
	@- rm -rf _site*

_site:
	@- mkdir _site; echo "[_site]"

html:
	@ echo "[html]"
	@ cp src/*.html _site

css-debug: _site/css src/css/main.css
	@ echo "[css-debug]"
	@ cp src/css/main.css _site/css

css-release: _site/css src/css/main.css
	@ echo "[css-release]"
	@ cp src/css/main.css _site/css
	@ yuicompressor --type css -o _site/css/main.css _site/css/main.css

bin.client-debug: _site/bin src/bin.client/main.js src/bin.client/wrp.girls.client.js
	@ echo "[bin.client-debug]"
	@ cat src/bin.client/* > _site/bin/main.js
	
bin.client-release: _site/bin src/bin.client/main.js src/bin.client/wrp.girls.client.js
	@ echo "[bin.client-release]"
	@ cat src/bin.client/*.js > _site/bin/main.js
	@ yuicompressor --type js -o _site/bin/main.js _site/bin/main.js

_site/bin:
	@- mkdir _site/bin; echo "[_site/bin]"

bin.server-debug: _site.Girls-service
	@ echo "[bin.server-debug]"
	@ cat src/bin.server/*.js > _site.Girls-service/main.js
	
bin.server-release: _site.Girls-service
	@ echo "[bin.server-release]"
	@ cat src/bin.server/*.js > _site.Girls-service/main.js
	@ yuicompressor --type js -o _site.Girls-service/main.js

_site.Girls-service:
	@- mkdir _site.Girls-service; echo "[_site.Girls-service]"

_site/css:
	@- mkdir _site/css; echo "_site/css"

deploy-test:
	@ echo [deploy-test]

deploy:
	@ echo [deploy]

npm-install: \
	npm-install-mongodb\
	npm-install-mongoose\
	npm-install-crypto
	
npm-install-mongodb:
	cd && npm install mongodb --mongodb:native
	
npm-install-mongoose:
	cd && npm install mongoose

npm-install-crypto:
	cd && npm install crypto

