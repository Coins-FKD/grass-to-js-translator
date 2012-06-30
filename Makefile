.PHONY: all
all:
	find Fkd/Utility -name '*.js' -exec echo 'document.write('\''<script type="text/javascript" src="'{}'"></script>'\\n\'');' \; > import.js
	find Fkd/GrassToJSTranslator -name '*.js' -exec echo 'document.write('\''<script type="text/javascript" src="'{}'"></script>'\\n\'');' \; >> import.js
