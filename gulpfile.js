'use strict';

const gulp = require('gulp');
const bs = require('browser-sync').create();
const path = require('path');

const src = {
	css: './**/*.css',
	html: 'src/index.html',
};

gulp.task('serve', () => {

	bs.init({
		debugInfo: true,
		open: true,
		port: 8082,
		server: ['./src', './src2'], // multiple roots
		snippetOptions: {
			rule: {
				match: /<\/head>/i,
				fn: (snippet, match) => `\n${snippet}\n${match}`,
			},
		}
	});

	gulp.watch(src.html)
		.on('change', bs.reload);

	gulp.watch(src.css, () => {
		gulp.src(src.css)
			.pipe(bs.reload({stream:true}));
	});

});

gulp.task('default', ['serve']);
