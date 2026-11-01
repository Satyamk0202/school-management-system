/* School assistant widget. Works offline from the FAQ below.
   For real AI answers set AI_ENDPOINT to YOUR server URL that calls the Claude API and returns {"reply":"..."}.
   Never put an API key in this file: anything in the browser is public. */
(function () {
  var AI_ENDPOINT = "";
  var FAQ = [
    [/admission|apply|enrol|join/, "You can apply for grades 1 to 12 on the <a href='adm.html'>Admission page</a>. Fill in the form and our team will contact you."],
    [/regist|add student/, "Register a student on the <a href='registration.html'>Registration page</a>. Roll numbers must be unique."],
    [/search|find student|roll/, "Use the <a href='search.html'>Search page</a> to find students by name, roll number or class."],
    [/list|all students|export|csv/, "The <a href='student-list.html'>Student List</a> shows everyone and can export a CSV file."],
    [/achiev|award|won|cup|trophy|gallery/, "See our wins on the <a href='q4.html'>Achievements page</a>: dance, cricket and the English olympiad."],
    [/alumni|graduat|former/, "Meet our graduates on the <a href='q5.html'>Alumni page</a>."],
    [/login|sign in|password/, "Use the <a href='login.html'>Login page</a> to sign in."],
    [/fee|cost|price/, "Fee details are shared by the school office after you submit an admission request."],
    [/contact|phone|email|address|office|hour/, "Please use the <a href='adm.html'>Admission form</a> and leave your phone number. The office will call you back."],
    [/hello|hi\b|hey|good (morning|afternoon|evening)/, "Hello! I can help with admissions, registration, search, achievements and alumni."]
  ];
  function students() { try { return JSON.parse(localStorage.getItem("students")) || []; } catch (e) { return []; } }
  function local(q) {
    q = q.toLowerCase();
    if (/(how many|total|count).*student/.test(q)) return "There are " + students().length + " students registered on this device.";
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i][0].test(q)) return FAQ[i][1];
    return "I'm not sure about that. Try asking about admission, registration, search, achievements or alumni.";
  }
  var box = document.createElement("div");
  box.innerHTML =
    '<button id="cbBtn" class="btn btn-primary" aria-label="Open chat assistant" aria-expanded="false" style="position:fixed;right:18px;bottom:18px;z-index:1050;border-radius:50px;padding:.7rem 1.1rem;box-shadow:0 4px 12px rgba(0,0,0,.3)">Chat</button>' +
    '<div id="cbPanel" role="dialog" aria-label="School assistant" hidden style="position:fixed;right:18px;bottom:72px;z-index:1050;width:min(340px,calc(100vw - 36px));background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.3);overflow:hidden">' +
    '<div class="bg-primary text-white px-3 py-2 d-flex justify-content-between"><strong>School Assistant</strong><button id="cbX" class="close text-white" aria-label="Close">&times;</button></div>' +
    '<div id="cbLog" aria-live="polite" style="height:280px;overflow-y:auto;padding:.75rem;background:#f3f6fb;font-size:.9rem"></div>' +
    '<form id="cbForm" class="d-flex p-2 border-top"><input id="cbIn" class="form-control form-control-sm mr-2" placeholder="Ask a question" aria-label="Your question" autocomplete="off"><button class="btn btn-primary btn-sm">Send</button></form></div>';
  document.body.appendChild(box);
  var $ = function (id) { return document.getElementById(id); }, log = $("cbLog");
  function add(html, me) {
    var d = document.createElement("div");
    d.style.cssText = "margin:.35rem 0;padding:.45rem .7rem;border-radius:10px;max-width:85%;" + (me ? "background:#0b5ed7;color:#fff;margin-left:auto;" : "background:#fff;border:1px solid #dde3ee;");
    if (me) d.textContent = html; else d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function toggle(open) { $("cbPanel").hidden = !open; $("cbBtn").setAttribute("aria-expanded", open); if (open) $("cbIn").focus(); }
  $("cbBtn").onclick = function () { toggle($("cbPanel").hidden); };
  $("cbX").onclick = function () { toggle(false); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  add("Hi! Ask me about admissions, registration, search, achievements or alumni.");
  $("cbForm").onsubmit = function (e) {
    e.preventDefault(); var q = $("cbIn").value.trim(); if (!q) return;
    add(q, true); $("cbIn").value = "";
    if (!AI_ENDPOINT) { add(local(q)); return; }
    var w = add("Typing...");
    fetch(AI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: q }) })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) { w.textContent = j.reply; })
      .catch(function () { w.innerHTML = local(q); });
  };
})();
