var language = document.getElementById("language");
var opt = document.createElement("option");
var addLanguage = document.getElementById("addLanguage");
var deleteLanguage = document.getElementById("deleteLanguage");
var languageBox = document.getElementById("languageBox");
addLanguage.addEventListener("click", function () {
    if(skill.text == null){

    }else{
        opt.text = language.value;
        opt.value = language.value;
        languageBox.options.add(opt);
    }
});
deleteLanguage.addEventListener("click", function(){
    var index = languageBox.selectedIndex;
    languageBox.remove(index);
});

var skill = document.getElementById("skill");
var addSkill = document.getElementById("addSkill");
var deleteSkill = document.getElementById("deleteSkill");
var skillBox = document.getElementById("skillBox");
addSkill.addEventListener("click", function () {
    if(skill.text == null){

    }else{
        opt.text = language.value;
        opt.value = language.value;
        skillBox.options.add(opt);
    }
});

deleteSkill.addEventListener("click", function () {
   var index = skillBox.selectedIndex;
   skillBox.remove(index);
});
