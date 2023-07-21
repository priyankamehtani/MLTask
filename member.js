function skillsMember() {
  var skills = document.getElementById("skills");
  var skillsMember = document.getElementById("skills-member");
  var skillsMemberClose = document.getElementById("skills-member-close");
  var skillsMemberContent = document.getElementById("skills-member-content");
  var skillsMemberContentClose = document.getElementById(
    "skills-member-content-close"
  );

  skills.addEventListener("click", function() {
    skillsMember.style.display = "block";
  });

  skillsMemberClose.addEventListener("click", function() {
    skillsMember.style.display = "none";
  });

  skillsMemberContentClose.addEventListener("click", function() {
    skillsMemberContent.style.display = "none";
  });
}
  