define(["jquery", "underscore", "backbone", "ractive", "raphael", "jel", "text!templates/menu.html"],
    function ($, _, Backbone, Ractive, Raphael, Jel, template) {

    var menuView = Backbone.View.extend({
	    
        events : {
            "mouseover #fileMenu" : "showFileOpt",
		    "mouseout #fileMenu" : "hideFileOpt",
		    "click #fileMenu" : "toggleFileOpt",
		    "click #saveOpt" : "save",
		    "mouseover #editMenu" : "showEditOpt",
		    "mouseout #editMenu" : "hideEditOpt",
		    "click #editMenu" : "toggleEditOpt",
		    "click #convertOpt" : "convert",
		    "click .openOpt" : "openFile",
		    "mouseover #aboutMenu" : "showAboutOpt",
		    "mouseout #aboutMenu" : "hideAboutOpt",
		    "click #infoOpt": "openInfo",
		    "mouseover #importOpt" : "showImportOpts",
		    "mouseout #importOpt" : "hideImportOpts",
		    "mouseover #exportOpt" : "showExportOpts",
		    "mouseout #exportOpt" : "hideExportOpts",
		    "click #importXML" : "importXML", 
		    "click #exportSVG" : "exportSVG",
		    "click #exportXML" : "exportXML"

        },	
	
        initialize: function (shapes, connections){
        	if(window.FileReader){
		        	this.reader = new FileReader();
		    }
			this.shapes = shapes;
			this.connections = connections;
			this.render();
        },	
	
		showFileOpt: function(){
			$('#fileOpts').show();
		},
		
		hideFileOpt: function(){
			$('#fileOpts').hide();
		},
		
		toggleFileOpt: function(){
		
		},
		
		showEditOpt: function(){
			$('#editOpts').show();
		},
		
		hideEditOpt: function(){
			$('#editOpts').hide();
		},
		
		toggleEditOpt: function(){
		
		},

		showAboutOpt: function(){
			$('#aboutOpts').show();
		},
		
		hideAboutOpt: function(){
			$('#aboutOpts').hide();
		},

		showImportOpts: function(){
			$('#importOpts').show();
		},

		hideImportOpts: function(){
			$('#importOpts').hide();
		},

		showExportOpts: function(){
			$('#exportOpts').show();
		},

		hideExportOpts: function(){
			$('#exportOpts').hide();
		},

		openFile: function(){
			$("#fileOpts").hide();
			this.reader.onload = this.readerHandler(this);
			$("#fileOpen").trigger('click');
		},

		openHandler: function(event){
			var file;
			if(event.target.files && (file = event.target.files[0]))
				event.data.context.reader.readAsText(file); 
		},

		readerHandler:function(context){
			return function(){
				//Here we convert the loaded object
				Jel.input = JSON.parse(context.reader.result)[0];
				Backbone.history.navigate('load', {trigger: true});
			};
		},
		
		convert: function(){
			Backbone.history.navigate('text', {trigger: true});
		},
		
		save : function(){
			$('#fileOpts').hide();
			Backbone.history.navigate('save', {trigger: true});
		},

		openInfo : function(){
			Backbone.history.navigate('notificate/'+"info", {trigger: true});
		},

		exportSVG: function(){
			Backbone.history.navigate('exportSVG', {trigger: true});
		},

		importXML: function(){
			//$("#importXML").hide();
			this.reader.onload = this.xmlHandler(this);
			$("#xmlImport").trigger('click');
		},

		importHandler: function(event){
			var file;
			if(event.target.files && (file = event.target.files[0]))
				event.data.context.reader.readAsText(file); 
		},

		xmlHandler:function(context){
			return function(){
				//Here we convert the loaded object
				Jel.importValue = context.reader.result;
				Backbone.history.navigate('import', {trigger: true});
			};
		},

		exportXML: function(){
			Backbone.history.navigate('exportXML', {trigger: true});
		},

        render: function (eventName) {
		    this.template = new Ractive({el : $(this.el), template: template});
		    //Attaching file open handler
		    $(this.template.el.querySelector('#fileOpen')).on("change", {context: this},this.openHandler);
		     $(this.template.el.querySelector('#xmlImport')).on("change", {context: this},this.importHandler);
		    return this;
        }
       
      });

    return menuView;

  });
