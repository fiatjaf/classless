all:
	make theme.css

theme.css: src/awsm.min.css src/style.styl
	cat src/awsm.min.css > theme.css
	stylus < src/style.styl >> theme.css
