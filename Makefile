.PHONY: all
all:
	find Fkd -name '*.js' -exec echo 'document.write('\''<script type="text/javascript" src="'{}'"></script>'\\n\'');' \; > import.js
