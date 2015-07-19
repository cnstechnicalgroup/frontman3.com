var assemble = require( 'assemble' );
var fsUtils = require( 'fs-utils' );
var less = require( 'gulp-less' );
var debug = require( 'gulp-debug' );
var extname = require( 'gulp-extname' );
var engine = require('engine-assemble');
var layouts = require('handlebars-layouts');
var config = fsUtils.readYAMLSync( './assemble-config.yml' );

// ****************************************************************************************
// Basic assemble configuration
// ****************************************************************************************

assemble.engine('hbs', engine);
assemble.helpers(layouts(engine.Handlebars));
assemble.layouts( config.assemble.layouts);
assemble.partials( config.assemble.partials);
assemble.pages( config.assemble.pages );

// Set Options
assemble.option('layout', config.assemble.layout);
assemble.option( 'assets', config.assemble.assets);

// ****************************************************************************************
// Content configuration
// ****************************************************************************************

assemble.task( 'site', function () {
  assemble.src( config.assemble.pages )
    .pipe(extname())
    .pipe( debug())
    .pipe( assemble.dest( config.assemble.destination ) );
} );

assemble.task('assets', function () {
  return assemble.copy( config.assemble.assets, config.assemble.destination + '/assets' );
});

// ****************************************************************************************
// Task configuration
// ****************************************************************************************
assemble.task( 'default', ['site', 'assets'] );
