# Main entry point
JS_SOURCE = src/index.js
CSS_SOURCE = src/style.css

# The target
JS_TARGET = dist/bundle.min.js
CSS_TARGET = dist/style.min.css

# Binaries
SIMPLIFYIFY = ./node_modules/.bin/simplifyify
UGLIFYCSS = ./node_modules/.bin/uglifycss

UNAME := $(shell uname)

ifeq ($(UNAME), Darwin)
    stream_editor = gsed
endif
ifeq ($(UNAME), Linux)
    stream_editor = sed
endif

.PHONY: build clean watch

build: $(JS_TARGET) $(CSS_TARGET)

$(JS_TARGET): node_modules
	$(SIMPLIFYIFY) $(JS_SOURCE) -o $(JS_TARGET) --minify

$(CSS_TARGET):
	$(UGLIFYCSS) $(CSS_SOURCE) --output $(CSS_TARGET)
	$(stream_editor) -i 's/src\/style.css/dist\/style.min.css/' index.html

node_modules:
	$(NPM) install

watch:
	$(stream_editor) -i 's/dist\/style.min.css/src\/style.css/' index.html
	$(SIMPLIFYIFY) $(JS_SOURCE) -o $(JS_TARGET) --watch --debug 

clean:
	$(stream_editor) -i 's/dist\/style.min.css/src\/style.css/' index.html
	rm -f dist/*
