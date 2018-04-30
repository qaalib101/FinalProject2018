var language = document.getElementById("language");

var addLanguage = document.getElementById("addLanguage");

addLanguage.addEventListener("click", function () {
    if(language.value == null || language.value == ""){

    }else{
        var languageBox = document.getElementById("languageBox");
        var opt = document.createElement("option");
        opt.text = language.value;
        opt.value = language.value;
        languageBox.appendChild(opt);
    }
});
var deleteLanguage = document.getElementById("deleteLanguage");
deleteLanguage.addEventListener("click", function(){
    var index = languageBox.selectedIndex;
    languageBox.remove(index);
});

var skill = document.getElementById("skill");
var addSkill = document.getElementById("addSkill");
var deleteSkill = document.getElementById("deleteSkill");

addSkill.addEventListener("click", function () {
    if(skill.value == null || skill.value == ""){

    }else{
        var skillBox = document.getElementById("skillBox");
        var opt2 = document.createElement("option");
        opt2.text = skill.value;
        opt2.value = skill.value;
        skillBox.appendChild(opt2);
    }
});

deleteSkill.addEventListener("click", function () {
   var index = skillBox.selectedIndex;
   skillBox.remove(index);
});
