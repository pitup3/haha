 
 
 (function(ua, w, d, undefined) {
		  // App Environment
            // ---------------
            //  Tip: Set to true to turn on "production" mode
            var production = false;
            
            var filesToLoad;
           
            //BoilerplateMVC Helper Methods to load files
            
            var boilerplateMVC = {
                       
                        loadCSS: function(url, callback) {
                            var link = d.createElement("link");
                            link.type = "text/css";
                            link.rel = "stylesheet";
                            link.href = url;
                            d.getElementsByTagName("head")[0].appendChild(link);
                            if(callback) {
                                callback();
                            }
                        },
                         
                        loadJS: function(file, callback) {
                            var script = d.createElement("script");
                            script.type = "text/javascript";
                         
                            if (script.readyState) {  // IE
                                script.onreadystatechange = function() {
                                    if (script.readyState == "loaded" || script.readyState == "complete") {
                                        script.onreadystatechange = null;
                                        callback();
                                    }
                                };
                            } 
                            else {  // Other Browsers
                                script.onload = function() {
                                    callback();
                                };
                            }
                            
                            if(((typeof file).toLowerCase()) === "object" && file["data-main"] !== undefined) 
                            {
                                script.setAttribute("data-main", file["data-main"]);
                                script.async = true;
                                script.src = file.src;
                            } 
                            else 
                            {
                                script.src = file;
                            }
                            d.getElementsByTagName("head")[0].appendChild(script);
                        },
                         
                        loadFiles: function(production, obj, callback) {
                            var self = this;
                             if(production) 
                             {
                               	 // Loads the production CSS file(s)
                               	 self.loadCSS(obj["prod-css"], function() {
                                  		  // If there are production JavaScript files to load
                                  		  if(obj["prod-js"]) {
                                  			  // Loads the correct initialization file (which includes Almond.js)
                                  			  self.loadJS(obj["prod-js"], callback);
                             			  }
                               	 });
                             } 
                             else
                             {
                               	 // Loads the development CSS file(s)
                               	  self.loadCSS(obj["dev-css"], function() {
                                    // If there are development Javascript files to load
                                  	  if(obj["dev-js"]) {
                                        // Loads Require.js and tells Require.js to find the correct intialization file
                                        self.loadJS(obj["dev-js"], callback);
                                    }
                                });
                            }
                        }
            };
           
                // Desktop CSS and JavaScript files to load
                filesToLoad = {
                    // CSS file that is loaded when in development mode
                    "dev-css": "css/app/common.css",
                    // CSS file that is loaded when in production mode
                    "prod-css": "css/app/common.css",
                    // Require.js configuration file that is also loaded when in development mode
                    "dev-js": { "data-main": "js/app/config.js", "src": "js/vendor/require.js" },
                    // JavaScript initialization file that is loaded when in development mode
                    "dev-init": "js/app/init/app.init.js",
                    // JavaScript file that is loaded when in production mode
                    "prod-init": "js/app/init/app.init.min.js",
                    "prod-js": { "data-main": "js/app/config.js", "src": "js/vendor/require.js" }
                };

              boilerplateMVC.loadFiles(production, filesToLoad, function() {
                 if(!production && window.require) {
                   	 require([filesToLoad["dev-init"]]);
                 } else if ( production ) {
               	 require([filesToLoad["prod-init"]])
                }
            });

        })(navigator.userAgent || navigator.vendor || window.opera, window, document);

 