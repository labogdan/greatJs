/*********************************************************************************************************************
 * greatJS
 * 
 * The purpose of this is to document good coding style, neat tricks, or interesting syntax that I run across while
 * coding.  The intention is to create a master cheat sheet for coding js.
 *
 * Table of Contents
 * 
 * 1. SYNTAX
 * 2. DOM
 * 3. HELPFUL FUNCTONS
 * 4. OOP
 * 5. JQUERY CHEAT SHEET
 *  
 ********************************************************************************************************************/


/*********************************************************************************************************************
 * SYNTAX																											 *
 * 																													 *
 ********************************************************************************************************************/

// ternary notation: if x >  y and z === true o = 10 else if x > y o = 2 else o = 5;
var o = (x > y? (z === true?10: 2): 5);

// if obj exists, turn it into float, else assign it value of 0
obj = (obj)? parseFloat(obj) : 0;

// javascript in css
input { border-width: expression(this.type=="text"? '1px' : '0'); }

// double negative trick
// ! always forces boolean.  !! forces boolean with same value as original expression
// used for feature detection
return !!document.createElement('canvas').getContext;

/*
 * @function listOfFields
 * @return associative array containing all fields in a form
 * 
 * Usage: alert(listofFields()['fieldName']);
 * 
 * Notes on adding and removing elements in an array:
 *	 .push() and .pop() --> end of the array
 *	 .shift() and .unshift() --> beginning of the array
 * 
 */
 
function listofFields () {
	
	var oForm = document.forms['order'],
		hash = [];
	
	for (var i = 0; i < oForm.length; i++) {
		if (oForm[i].title != "") {
			hash.push(oForm[i].name);
			hash[oForm[i].name] = oForm[i].title;
		}
	}
	return hash;
}


/*
 * problem: javascript uses pass by reference.  What if we want to iterate a value, use it for an id,
 * and bind functionality to a button?
 * For example, id = 'cool' + i; If we run a simple function to do this, we end up with every button retrieving the
 * last index of the array, because i has been passed by value.
 * 
 */

var bindButtonsAndDisplay = function() {
	
	 for (var i = 0, len = specials.length; i < len; i++) {
	 	// let's pretend i = 0
	 	$("#specialBtn"+(i)).click(function(num){ 
	 		// we make an anonymous function that retrieves specials[num], whatever that is
			return function() {	retrieveSpecial(specials[num].specialCode)	} 
			}(i));	// here it is: we call the function, passing i as the param.  The function returns the value
					// of i at that moment.  Now #specialBtn0 will return specials[0]
			
	 	$("#specialBtn"+i).show();
	 }
}



/*********************************************************************************************************************
 * DOM																												 *
 * 																													 *
 ********************************************************************************************************************/

// two different functions that load a script asynchronously

(function() {
	var d = document,
		h = d.getElementsByTagName('head')[0],
		s = d.createElement('script');
	
	s.async = true;
	s.src = 'http://www.devlocal.netzero.net/static/start/view/common/js/modules/data1.js';
	h.appendChild(s);
})();

(function() {
	var d = document,
		h = d.getElementsByTagName('script')[0],
		s = d.createElement('script');
		
	s.async = true;
	s.src = 'http://www.devlocal.netzero.net/static/start/view/common/js/modules/data2.js';
	h.parentNode.insertBefore(s, h);
})();

// event bubbling
(function() {
	document.body.addEventListener('click', function (event) {
		var target = event.target || event.srcElement;
		
		var selector = (target.id?'#'+target.id:(target.className?'.'+target.className:'cannot determine'));
		console.log(selector);
		
		var obj = '';
		
		if (selector.match('#')) {
			obj = document.querySelector(selector);
		} else if (selector.match('.')) {
			obj = document.querySelectorAll(selector);
		}
		
		console.log(obj);
	});	
})


/*********************************************************************************************************************
 * HELPFUL FUNCTIONS																								 *
 * 																													 *
 ********************************************************************************************************************/


/*
 * @function gup
 * @param name - takes the name of a url parameter and searches window.location.href
 * @return - the value of the url parameter searched for.  If nothing is found, returns null.
 * 
 */

function gup( name ) {
	
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)",
		regex = new RegExp( regexS ),
		results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

// what if you are using a browser that doesn't have console object?
if (!window.console) {
	window.console = {
		log : function() {}
	};
}

/*********************************************************************************************************************
 * OOP																												 *
 * 																													 *
 ********************************************************************************************************************/

// are these four functionally equivalent?
func = {
	url : 'http://somesite.com',
	goTo : function () {
		console.log(this.url);
	}
};
func.goTo();

func = function() {
	url = 'http://somesite.com';
	goTo = function() {
		console.log(url);
	};
	return {goTo : goTo};
}();
func.goTo();

func = function() {
	url = 'http://somesite.com';
	return {
		goTo : function () {
			console.log(url);
		}
	};
};
f = new func();
f.goTo();

function func () {
	url = 'http://somesite.com';
}
func.prototype.goTo = function() {
	console.log(url);
}
f = new func();
f.goTo();

// You could just do this - using an anonymous function
(function () {
	url = 'http://somesite.com';
	console.log(url);
})(); // the extra () at the end instantiates the function

// you could use an operator at the beginning of the function to acheive the same thing
+function () {
	url = 'http://somesite.com';
	console.log(url);
}();

// check out this. getting a bit more complicated
var func = function () {
	return {};
};

func.goTo = function () {
	
	url = 'http://somesite.com';
	
	return {
		getUrl : function () {
			console.log(url);
		}
	};
}();

func.goTo.getUrl();

// here is the same function, with a print() method added.
// two interesting things are going on here - 1. we can call methods after the () when we instantiate the function
// 2. we are chaining them, just like in jQuery.  We can do so by returning this in each method.

func = function() {
	url = 'http://somesite.com';
	goTo = function() {
		console.log(url);
		return this;
	};
	print = function () {
		console.log('hello');
		return this;
	};
	return {goTo : goTo, print : print};
}().goTo().print();

func.goTo().print();

/*
 * revealing module pattern
 * showing how to declare, use, extend public and private methods and data
 * also demonstrates using apply() to implement a controller, based on calling context
 * 
 */


var Main = Main || function() {
    
    var privateVar = 1234;
    
    var map = { // used to map variable to the method that will be called
        'key1' : _pageOneController,
        'key2' : _pageTwoController
    };
    
    var _pageOneController = function () { // the _ preceding the method name is a cue that it is private
        
    };

    var _pageTwoController = function () {
        
    };
    
    var init = function (argument) {
        
        map[argument].apply(); // calls the method that maps to argument
        
    };
    
    return {
        init : init // make public to the outside world
    }

}(); // instantiate the object

Main.init('key1'); // run init(), which picks the method to run

var extendMain = extendMain || function (Main) {
    
    var myProp = 'something'; // this is a private variable in Main()
    
    Main.doDomethingElse = function () { // this is a public method in Main()
      
    };
    
    return Main;
}(Main || {});

// hijinx to redefine console.log, to only print if global (ugh) var debug is set to true
// uses proxy pattern

(function () {
    var proxy = console.log;
    if (typeof (debug) != 'undefined' && debug == true) {
        console.log = function (arg) {
            proxy.apply (this, arguments);
        }
    } else {
        console.log = function () {};
    }
})();


/*********************************************************************************************************************
 * JQUERY CHEAT SHEET																								 *
 * 																													 *
 ********************************************************************************************************************/

// simple ajax call in jQuery
$.ajax({
	url: "calculateSalesTax.do?city="+city+"&state="+state+"&zip="+zip+"&asessionid="+asessionid,
	context: document.body,
	success: function(data){
		data = data.replace(/[a-z,A-Z,:]/g,'');

		$('#ajaxSalesTax').html('$'+salesTax)
		$('#ajaxTodaysTotal').html('$'+newPrice);
	}
});

// simple ajax call without jQuery
function ajaxCall() {
	
	var xmlhttp = (window.XMLHttpRequest?new XMLHttpRequest():new ActiveObject("Microsoft.XMLHTTP"));

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.response);
		}
  	}
  	
	var uri = '';
	uri += 'http://${environment.wwwServer}/start/www.do';
	xmlhttp.open("GET",uri,true);
	xmlhttp.send();
}

ajaxCall();


/*
 * @plugin defaultPwd
 * 
 * Written to solve the issue where we had a password form field (text is masked with *), but we had default text that
 * we wanted to have in there, before the user typed anyting in.
 * 
 * Solution was to have a text field with the default text in it.  If it got focus, it would hide() and show() the actual
 * password field.
 * 
 * @param real - the id of the real form field
 * @param imposter - the id of the substitute form field
 * 
 */

(function($){
    $.defaultPwd = function(real,imposter) {
    $('#'+real).hide();
    $('#'+imposter).focus(function(){
    	$('#'+real).show().focus();
    	$('#'+imposter).hide();
    })
    $('#'+real).blur(function(){
    	if(!($('#'+real).val())) {
    		$('#'+real).hide();
    		$('#'+imposter).show();
    	}
    })
    if(!($('#'+real).val())) {
    	$('#'+real).hide();
    	$('#'+imposter).show();
    } else {
    	$('#'+real).show();
    	$('#'+imposter).hide();
    }
    }
})(jQuery);


