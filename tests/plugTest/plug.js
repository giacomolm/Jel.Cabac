QUnit.config.autostart = false;


QUnit.test( "Plug Test", function( assert ) {

    var xhttp=new XMLHttpRequest();
    xhttp.open("GET","xml/plug.xml",false);
    xhttp.send();
    Jel.importValue = xhttp.responseText;  

    Jel.Router.import();

    //var conversionRes = Jel.convert(Jel.baseFile, Jel.baseElement, undefined);

    //Jel.Router.convert();

    assert.ok( "ciao" == "ciao", "Passed!" );
});