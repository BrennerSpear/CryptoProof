# Main entry point
SOURCE = src/index.js

# The target
TARGET = dist/bundle.js

# Binaries
SIMPLIFYIFY = ./node_modules/.bin/simplifyify

.PHONY: build clean watch

build: $(TARGET)

$(TARGET): node_modules
	$(SIMPLIFYIFY) $(SOURCE) -o $(TARGET) --minify

node_modules:
	$(NPM) install

watch:
	$(SIMPLIFYIFY) $(SOURCE) -o $(TARGET) --watch --debug 

clean:
	rm -f dist/*
