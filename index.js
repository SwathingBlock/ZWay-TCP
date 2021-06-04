 
/**
 * @author Tiago Fernandes
 * @since 03/05/2021
 */

/**
 * 
 * @param {*} id 
 * @param {*} controller 
 */
        // function ZWAYTCP (id, controller) {
        //     debugPrint("Initializing ZWAYTCP module");
        //     ZWAYTCP.super_.call(this, id, controller);
        // }

        function ZWAYTCP (id, controller) {
            debugPrint("Initializing ZWAYTCP module");
            ZWAYTCP.super_.call(this, id, controller);
        }

        inherits(ZWAYTCP, AutomationModule);
        _module = ZWAYTCP;




        //definition of the class reference:
        // Initialization method:
        ZWAYTCP.prototype.init = function (config) {
	    debugPrint("####################ZWAYTCP Started######################");
        ZWAYTCP.super_.prototype.init.call(this, config);
        var self = this;

        self.callback = _.bind(self.updateDevice, self);
	    self.callbackZwaveRegister = _.bind(self.zwaveRegister, self);
	    self.callbackZwaveUnregister = _.bind(self.zwaveUnregister, self);
        self.callbackDataBind = _.bind(self.dataBind, self);
        self.callbackDataUnbind = _.bind(self.dataBind, self);
        
        
        self.controller.devices.on("change:metrics:level", self.callback);
	    self.controller.on("ZWave.register", self.callbackZwaveRegister);
 	    self.controller.on("ZWave.unregister", self.callbackZwaveUnregister);
         self.controller.on("ZWave.dataBind", self.callbackDataBind);
         self.controller.on("ZWave.dataUnbindBind", self.callbackDataUnbind);
            
			/*self.controller.devices.on('change:metrics', function(device) { 
				self.controller.addNotification("critical", deviceId + "" + device.toJSON(), "tcp", "TCP Handler");
				debugPrint(device.toJSON());
			 });*/
        };

        /** Destroy method:
        Here you have to unregister Listeners see EventBus **/
        ZWAYTCP.prototype.stop = function () {
            var self = this;
            self.controller.devices.off("change:metrics:level", self.callback)
            ZWAYTCP.super_.prototype.stop.call(this);
            debugPrint("######################ZWAYTP stopped#####################");
        };



    ZWAYTCP.prototype.dataBind = function (data) {
        var self = this;
        debugPrint("####dataBind");
        debugPrint("####" + data);
    };
    
	ZWAYTCP.prototype.dataUnbind = function (data) {
		var self = this;
		debugPrint("####dataUnbind");
        debugPrint("####" + data);
	};

    ZWAYTCP.prototype.zwaveRegister = function (data) {
		var self = this;
        debugPrint("####zwaveRegister");
        debugPrint("####" + data);
	};

    ZWAYTCP.prototype.zwaveUnregister = function (data) {
		var self = this;
        debugPrint("####zwaveUnregister");
        debugPrint("####" + data);
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



        ZWAYTCP.prototype.get_url = function (device, value) {

            var url = this.config.url // get url property, defined on module.json, 
            url = url.replace("%DEVICE%",device.id);
            url = url.replace("%VALUE%",value);
        
            debugPrint(this.config.url+" : "+device.id+" : "+value+" : "+url);
        
            var req = {
                url: url,
                async: true,
                success: function(response) {
                    debugPrint("Request was successful");
                    },
                error: function(response) {
                    debugPrint("Can not make request: " + response.statusText); // don't add it to notifications, since it will fill all the notifcations on error
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

		
