window.onload = function (){
	document.forms[0].onsubmit = validForm;
}

function validForm(){
	var allGood = true;
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i=0; i<allTags.length; i++){
		if(!validTag(allTags[i])){
			allGood = false;
		}
	}
	return allGood;

	function validTag(thisTag){
		var outClass = "";
		var allClasses =  thisTag.className.split(" ");

		for (var j=0; j<allClasses.length; j++){
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}
		thisTag.className = outClass;

		if(outClass.indexOf("invalid") > -1){
            invalidLabel(thisTag.parentNode);
			thisTag.focus();
			if(thisTag.nodeName == "INPUT"){
				thisTag.select();
			}
			return false;
		}
		return true;

		function validBasedOnClass(thisClass){
			var classBack = "";

			switch(thisClass){
				case "":
				case "invalid":
					break;
				case "reqd":
					if(allGood && thisTag.value == ""){
						classBack = "invalid ";
					}
					classBack += thisClass;
                    break;
                case "email":
                    if(allGood && !validEmail(thisTag.value)){
                        classBack = "invalid ";
                    }
                    classBack += thisClass;
                    break;
                case "pwd":
                    if(allGood && !validPassword(thisTag.value)){
                        classBack = "invalid ";
                    }
                    classBack += thisClass;
                    break;
				default:
					if(allGood && !crossClass(thisTag,thisClass)){
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;

			function crossClass(inTag,otherFieldID){
				if(!document.getElementById(otherFieldID)){
					return false;
				}
				return (inTag.value == document.getElementById(otherFieldID).value);
            }
            
            function validEmail(email){
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		 	    return re.test(email);
            }

            function validPassword(password){
                var re = /^.*(?=.{8,45})(?=.*[A-Z])(?=.*[a-z])((?=.*\d)|(?=.*[!£ \$\?])).*$/;

		 	    return re.test(password);
			}
		}
	}
	function invalidLabel(parentTag){
		if(parentTag.nodeName == "LABEL"){
			parentTag.className += " invalid";
		}
	}
}