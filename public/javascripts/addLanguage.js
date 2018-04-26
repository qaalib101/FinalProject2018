var language = document.getElementById("language");
var opt = document.createElement("option");
var button = document.getElementById("addLanguage");

button.addEventListener("click", function () {
    if(skill.text == null){

    }else{
        opt.text = language.value;
        opt.value = language.value;
        document.getElementById("languageBox").options.add(opt);
    }
});
var skill = document.getElementById("skill");
var button2 = document.getElementById("addSkill");

button2.addEventListener("click", function () {
    if(skill.text == null){

    }else{
        opt.text = language.value;
        opt.value = language.value;
        document.getElementById("skillBox").options.add(opt);
    }
});