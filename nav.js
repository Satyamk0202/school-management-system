/* Shared header, navbar and footer. Edit links here once; every page updates. */
(function () {
  var links = [
    ["index.html", "Home"], ["registration.html", "Registration"], ["login.html", "Login"],
    ["student-list.html", "Student List"], ["search.html", "Search"], ["adm.html", "Admission"],
    ["q4.html", "Achievements"], ["q5.html", "Alumni"]
  ];
  var here = location.pathname.split("/").pop().toLowerCase() || "index.html";
  var title = document.body.getAttribute("data-title") || "School Management System";
  var items = links.map(function (l) {
    var on = l[0] === here || (l[0] === "q4.html" && /^page\d\.html$/.test(here));
    return '<li class="nav-item' + (on ? " active" : "") + '"><a class="nav-link" href="' + l[0] + '"' + (on ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>";
  }).join("");
  document.getElementById("site-header").outerHTML =
    '<header class="site-header"><h1>' + title + "</h1></header>" +
    '<nav class="navbar navbar-expand-lg navbar-dark" aria-label="Main"><a class="navbar-brand" href="index.html">ABC School</a>' +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>' +
    '<div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav ml-auto">' + items + "</ul></div></nav>";
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = '<footer class="site-footer"><small>&copy; ' + new Date().getFullYear() + " ABC School. All rights reserved.</small></footer>";
})();
