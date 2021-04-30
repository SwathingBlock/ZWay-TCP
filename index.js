 /** Constructor method:
        this Line is a call of the superconstructor 
        has always to be first line of the constructor:**/
        function ZWAYTCP (id, controller) {
            ZWAYTCP.super_.call(this, id, controller);
        }
        // Inheration call:
        inherits(ZWAYTCP, AutomationModule);
        //definition of the class reference:
        _module = ZWAYTCP;
        /** Initialization method:
        Variable for referenciate to the class in own methods, 
        because this is context dependent in JavaScript
        Here you can register listeners see EventBus **/
        ZWAYTCP.prototype.init = function (config) {
            ZWAYTCP.super_.prototype.init.call(this, config);
            var self = this;
			self.controller.devices.on('change:metrics', function(device) { 
				self.controller.addNotification("critical", deviceId + "" + device.toJSON(), "tcp", "TCP Handler");
				console.log(device.toJSON());
			 });
        };









        /** Destroy method:
        Here you have to unregister Listeners see EventBus **/
        ZWAYTCP.prototype.stop = function () {
            ZWAYTCP.super_.prototype.stop.call(this);
			//this.controller.devices.off('change:metrics', function() {});
        };
        //Own methods: Write your own methods here
        //AppClassName.prototype.handler = function(command, args){
		//	console.log("command: " + command);
		//	console.log("args: " + args);
        //}

		