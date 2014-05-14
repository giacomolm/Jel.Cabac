define(["jquery", "underscore", "backbone", "ractive", "xsdAttr", "text!templates/properties.html", "text!templates/propertyHeader.html"],
    function ($, _, Backbone, Ractive, xsdAttr, template, header) {

    var propertiesView = Backbone.View.extend({
	
	events :{
		"keyup input" : "updateProps",
        "click .add" : "addProperty"
	},
	    
        initialize: function (shapeId){
            this.render();
        },

        updateProps: function(ev){
            var i,curr_path = ev.target.id.split(","), curr_attr = this.model.props;
            for(i=0; i<curr_path.length-1; i++){
                if(curr_attr) curr_attr = curr_attr[curr_path[i]];
            }
            
            if(curr_attr && curr_path[i])
                curr_attr[curr_path[i]] = ev.target.value;
           // else if(this.model.updateProp) this.model.updateProp(ev.target.name, ev.target.value);
        },

        addProperty: function(ev){
            var i,curr_path = ev.target.id.split(","), curr_attr = this.model.props;
            for(i=0; i<curr_path.length-1; i++){
                if(curr_attr) curr_attr = curr_attr[curr_path[i]];
            }

            var new_el = _.clone(curr_attr[curr_attr.length-1]);
            curr_attr.push(new_el);
            this.render();
        },
	
        render: function (eventName) {
            $(this.el).empty();
            for(var propName in this.model.props){
                if(this.model.props.hasOwnProperty(propName)){
                    var curr_prop = new Object();
                    curr_prop.id = propName;
                    curr_prop.name = propName;
                    if(this.model.props[propName] instanceof Array){
                        if(this.model.props[propName].type) console.log('ciao');
                        this.template = new Ractive({el : $(this.el), template: header, data: curr_prop, append:true});
                    } 
                    else if(this.model.props[propName] instanceof Object){
                        this.template = new Ractive({el : $(this.el), template: header, data: curr_prop, append:true});
                        this.subRender(this.model.props[propName], propName);
                    } 
                    else{
                        curr_prop = _.clone(this.model.props);
                        curr_prop.id = propName;
                        curr_prop.name = propName;
                        curr_prop.value = this.model.props[propName];
                        this.template = new Ractive({el : $(this.el), template: template, data : curr_prop, append:true});
                    }
                }
            }
            //console.log(this.el.parentNode)

            return this;
        },

        subRender: function(model, parentName){
            for(var propName in model){
                if(model.hasOwnProperty(propName)){
                    //model.name = propName;
                    if(model[propName] instanceof Array){
                        if(model[propName].unbounded){
                            var curr_prop = new Object();
                            curr_prop.id = parentName+","+propName+",0";
                            curr_prop.name = propName;
                            curr_prop.unbounded = model[propName].unbounded;
                            
                            this.template = new Ractive({el : $(this.el), template: header, data: curr_prop, append:true});
                            this.subRender(model[propName], parentName+","+propName);
                        }
                        else{
                            if(model[propName].length == 0){
                                //there must be at least one element
                                model[propName][0] = undefined;
                                var curr_prop = new Object();
                                curr_prop.id = parentName+","+propName+",0";
                                curr_prop.name = propName;
                                curr_prop.value = model[propName];
                                curr_prop.unbounded = model[propName].unbounded;

                                this.template = new Ractive({el : $(this.el), template: template, data : curr_prop, append:true});
                            }
                            else{
                                //enumerate elements
                                var k, curr_prop = new Object();

                                for(k=0; k<model[propName].length; k++){
                                    curr_prop.id = parentName+","+propName+","+k;
                                    curr_prop.name = propName;
                                    curr_prop.value = model[propName][k];
                                    if(k==model[propName].length-1) curr_prop.unbounded = model[propName].unbounded;
                                    this.template = new Ractive({el : $(this.el), template: template, data : curr_prop, append:true});
                                }
                            }
                        }
                    }
                    else if(model[propName] instanceof Object){
                        var curr_prop = new Object();
                        curr_prop.id = parentName+","+propName+",0";
                        curr_prop.name = propName;
                        curr_prop.unbounded = model[propName].unbounded;
                        //if(model[propName].unbounded) attr_head+="+<br>";
                        this.template = new Ractive({el : $(this.el), template: header, data: curr_prop, append:true});
                        this.subRender(model[propName], parentName+","+propName);
                    } 
                    else if(propName !='unbounded'){
                        var curr_prop = new Object();
                        curr_prop.id = parentName+","+propName;
                        curr_prop.name = propName;
                        curr_prop.value = model[propName];
                        this.template = new Ractive({el : $(this.el), template: template, data : curr_prop, append:true});
                    }
                }
            }
        }
       
      });

    return propertiesView;

  });
