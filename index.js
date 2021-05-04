 
/**
 * @author Tiago Fernandes
 * @since 03/05/2021
 */

/**
 * 
 * @param {*} id 
 * @param {*} controller 
 */
        function ZWAYTCP (id, controller) {
            console.log("Initializing ZWAYTCP module");
            ZWAYTCP.super_.call(this, id, controller);
        }



        inherits(ZWAYTCP, AutomationModule);
        _module = ZWAYTCP;




        //definition of the class reference:
        // Initialization method:
        ZWAYTCP.prototype.init = function (config) {
            ZWAYTCP.super_.prototype.init.call(this, config);
            var self = this;

            self.callback = _.bind(self.updateDevice, self);
            self.controller.devices.on("change:metrics:level", self.callback);
            
			/*self.controller.devices.on('change:metrics', function(device) { 
				self.controller.addNotification("critical", deviceId + "" + device.toJSON(), "tcp", "TCP Handler");
				console.log(device.toJSON());
			 });*/
        };

        /** Destroy method:
        Here you have to unregister Listeners see EventBus **/
        ZWAYTCP.prototype.stop = function () {
            var self = this;
            self.controller.devices.off("change:metrics:level", self.callback)
            ZWAYTCP.super_.prototype.stop.call(this);
            console.log("ZWAYTP stopped");
        };



        ZWAYTCP.prototype.updateDevice = function (device) {
            var self = this;
            var value = device.get("metrics:level");
            
            // if (device.get("deviceType") == "switchBinary" || device.get("deviceType") == "sensorBinary") {
                // if (value == 0) {
                //     value = "off";
                // } else if (value == 255) {
                //     value = "on";
                // }
            // }
        
            self.get_url(device, value);
        };



        HTZWAYTCPTPGet.prototype.get_url = function (device, value) {

            var url = this.config.url // get url property, defined on module.json, 
            url = url.replace("%DEVICE%",device.id);
            url = url.replace("%VALUE%",value);
        
            console.log(this.config.url+" : "+device.id+" : "+value+" : "+url);
        
            var req = {
                url: url,
                async: true,
                success: function(response) {
                    console.log("Request was successful");
                    },
                error: function(response) {
                    console.log("Can not make request: " + response.statusText); // don't add it to notifications, since it will fill all the notifcations on error
                    } 
                };
        
        // With authorization - untested
        //        if (self.config.user !== undefined && self.config.password !== undefined) {
        //            req.auth = {
        //                    login: self.config.login,
        //                    password: self.config.password
        //            };
        //        }

            http.request(req);
        };

		