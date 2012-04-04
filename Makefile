build-debug: _site html _site/css/main.css _site/bin/main.js bin.server-debug
	@ echo "[build-debug]"

build-release: _site html _site/css/main.css-compress _site/bin/main.js-compress bin.server-debug
	@ echo "[build-release]"

clean:
	@- rm -rf _site*

_site:
	@- mkdir _site; echo "[_site]"

html:
	@ echo "[html]"
	@ cp src/*.html _site

_site/css/main.css: _site/css src/css/main.css
	@ echo "[_site/css]"
	@ cp src/css/main.css _site/css

_site/css/main.css-compress: _site/css/main.css
	@ echo "[_site/css-compress]"
	@ yuicompressor --type css -o _site/css/main.css _site/css/main.css

_site/bin/main.js: _site/bin src/bin.client/main.js src/bin.client/wrp.girls.client.js
	@ echo "[_site/bin/main.js]"
	@ cp src/bin.client/*.js _site/bin
	@ mv _site/bin/main.js _site/bin/main.js.tmp
	@ cat _site/bin/*.js > _site/bin/main.js
	@ cat _site/bin/main.js.tmp >> _site/bin/main.js
	@ rm _site/bin/main.js.tmp

_site/bin/main.js-compress: _site/bin/main.js
	@ echo "[_site/bin/main.js-compress]"
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

tmp:
	@ mkdir tmp

test-darkhttpd:
	@ darkhttpd _site --index main.html

test-darkhttpd-daemon-start: tmp
	@ darkhttpd _site --index main.html --daemon --pidfile tmp/darkhttpd.pid

test-darkhttpd-daemon-stop: tmp/darkhttpd.pid
	@ kill `cat tmp/darkhttpd.pid`

test-darkhttpd-daemon-restart: test-darkhttpd-daemon-stop test-darkhttpd-daemon-start
	

