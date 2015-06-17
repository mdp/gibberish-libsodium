OUT_DIR=./dist
TMP_DIR=./tmp

all: clean setup fetch_libsodium_js build

setup:
	mkdir -p tmp dist
	npm install

fetch_libsodium_js:
	@echo
	wget https://raw.githubusercontent.com/jedisct1/libsodium.js/master/dist/browsers/combined/sodium.min.js -O $(TMP_DIR)/libsodium.min.js

build:
	@echo
	./node_modules/.bin/browserify browser-wrapper.js -d -o $(TMP_DIR)/bundle.js
	cat $(TMP_DIR)/libsodium.min.js $(TMP_DIR)/bundle.js > $(OUT_DIR)/gibberish-libsodium.js

clean:
	rm -rf $(TMP_DIR) $(OUT_DIR)

