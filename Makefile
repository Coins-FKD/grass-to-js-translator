.PHONY: all
all:
	find Fkd -name '*.js' -exec echo '<script type="text/javascript" src="'{}'" />' \; > import.js
