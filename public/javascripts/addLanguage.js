addLanguage = document.getElementById("addLanguage");
language = document.getElementById("language");
languages = document.getElementById("languageBox");
deleteLanguage = document.getElementById("deleteLanguage");

addLanguage.addEventListener("click", function () {
    if(language.value == ""){

    }else{
        console.log(language.value);
        var opt = document.createElement('option');
        opt.text = language.value;
        languages.add(opt);
    }
});

deleteLanguage.addEventListener("click", function(){
    languages.remove(languages.selectedIndex);
});
//skills
addSkill = document.getElementById("addSkill");
skill = document.getElementById("skill");
skillBox = document.getElementById("skillBox");
deleteSkill = document.getElementById("deleteSkill");

addSkill.addEventListener("click", function () {
    if(skill.value == ""){

    }else{
        console.log(skill.value);
        var opt = document.createElement('option');
        opt.text = skill.value;
        skillBox.add(opt);
    }

});

deleteSkill.addEventListener("click", function(){
    skillBox.remove(skillBox.selectedIndex);
});
