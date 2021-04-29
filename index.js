 /** Constructor method:
        this Line is a call of the superconstructor 
        has always to be first line of the constructor:**/
        function AppClassName (id, controller) {
            AppClassName.super_.call(this, id, controller);
        }
        // Inheration call:
        inherits(AppClassName, AutomationModule);
        //definition of the class reference:
        _module = AppClassName;
        /** Initialization method:
        Variable for referenciate to the class in own methods, 
        because this is context dependent in JavaScript
        Here you can register listeners see EventBus **/
        AppClassName.prototype.init = function (config) {
            AppClassName.super_.prototype.init.call(this, config);
            var self = this;
			self.controller.devices.on({deviceId}, {event}, function() { 
				self.controller.addNotification("critical", deviceId + "" + event, "tcp", "TCP Handler");
			 });
        };









        /** Destroy method:
        Here you have to unregister Listeners see EventBus **/
        AppClassName.prototype.stop = function () {
            AppClassName.super_.prototype.stop.call(this);
			this.controller.devices.off({deviceId}, {event}, function() {});
        };
        //Own methods: Write your own methods here
        AppClassName.prototype.handler = function(command, args){
			console.log("command: " + command);
			console.log("args: " + args);
        }

		