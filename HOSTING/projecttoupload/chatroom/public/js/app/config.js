require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "vendor/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../vendor/jquery",
        "underscore":"../vendor/lodash",
        "backbone":"../vendor/backbone",
        "marionette":"../vendor/backbone.marionette",
        "handlebars":"../vendor/handlebars",
        "hbs":"../vendor/hbs",
        "i18nprecompile":"../vendor/i18nprecompile",
        "json2":"../vendor/json2",
        "bootstrap":"../vendor/bootstrap",
        "text":"../vendor/text",
        "socketio":"../socket.io-client/socket.io",
        "bootstrapValidator":"../vendor/bootstrapValidator"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        // Twitter Bootstrap jQuery plugins
        "bootstrap":["jquery"],
         // Backbone
        "backbone":{
            // Depends on underscore/lodash and jQuery
            "deps":["underscore", "jquery"],
            // Exports the global window.Backbone object
            "exports":"Backbone"
        },
        //Marionette
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        },
        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
        },
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",
	   compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});