let extractedData = [],
  matchingStudents = [];

$(document).ready(function() {
  try {
    if ($(location).attr('href').indexOf("pesquisa")) {
      if ($(location).attr('href').split("pesquisa")[1] != "") {
        if ($(location).attr('href').indexOf("name") != -1 && $(location).attr('href').indexOf("page") != -1) {
          $.getJSON("./json/primeira-fase/Detalhes Alunos.json", function(data) {
            $.each(data, function(key, val) {
              extractedData.push(val);
            });
            URLValidated();
          });
        } else {
          location.replace("pesquisa");
        }
      } else {
        $(".se-pre-con").fadeOut("slow");
      }
    }
  } catch (err) {
    location.replace("pesquisa");
  }
});

function AppendStudent(a, b, c) {
  $("#colocados").append($("<tr></tr>")
    .append($("<td></td>").text(a))
    .append($("<td></td>").text(b).attr("onClick", "ViewStudentDetails(" + a + ", " + c + ")").attr("class", "link").attr("id", a)));
}

function ViewStudentDetails(idx, id) {
  if ($(location).attr('href').indexOf("#") >= 0) {
    window.history.pushState({}, document.title, "/" + "pesquisa" + $(location).attr('href').split("pesquisa")[1].split("#")[0] + "#" + idx);
  } else {
    window.history.pushState({}, document.title, "/" + "pesquisa" + $(location).attr('href').split("pesquisa")[1] + "#" + idx);
  }
  window.location = "aluno?a=" + id;
}

function GeneratePageNavigation(a, b) {
  // a = current page
  // b = total no of pages
  $("#page-navigation").empty();
  if (b <= 4) {
    for (let i = 0; i < b; i++) {
      if ((i + 1) == a) {
        $("#page-navigation").append($("<div></div>").text(i + 1).attr("class", "current"));
      } else {
        $("#page-navigation").append($("<div></div>").text(i + 1).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (i + 1) + "'"));
      }
    }
  } else {
    if (a == 1) {
      $("#page-navigation").append($("<div></div>").text(1).attr("class", "current"));
      $("#page-navigation").append($("<div></div>").text(2).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + 2 + "'"));
      $("#page-navigation").append($("<div></div>").text(3).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + 3 + "'"));
      $("#page-navigation").append($("<div></div>").text(b).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + b + "'"));
    } else {
      if (a + 2 <= b) {
        $("#page-navigation").append($("<div></div>").text(a - 1).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 1) + "'"));
        $("#page-navigation").append($("<div></div>").text(a).attr("class", "current"));
        $("#page-navigation").append($("<div></div>").text(a + 1).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a + 1) + "'"));
        $("#page-navigation").append($("<div></div>").text(b).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + b + "'"));
      } else if (a + 2 == b + 1) {
        $("#page-navigation").append($("<div></div>").text(a - 2).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 2) + "'"));
        $("#page-navigation").append($("<div></div>").text(a - 1).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 1) + "'"));
        $("#page-navigation").append($("<div></div>").text(a).attr("class", "current"));
        $("#page-navigation").append($("<div></div>").text(b).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + b + "'"));
      } else if (a + 2 == b + 2) {
        $("#page-navigation").append($("<div></div>").text(a - 3).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 3) + "'"));
        $("#page-navigation").append($("<div></div>").text(a - 2).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 2) + "'"));
        $("#page-navigation").append($("<div></div>").text(a - 1).attr("onClick", "window.location='pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=" + (a - 1) + "'"));
        $("#page-navigation").append($("<div></div>").text(a).attr("class", "current"));
      }
      if (a > 2) {
        $("#first-page").append($("<a></a>").text("voltar à primeira página").attr("href", "pesquisa" + decodeURI($(location).attr('href')).split("pesquisa")[1].split("page")[0] + "page=1").css("color", "black"))
      }
    }
  }
}

function URLValidated() {
  let nameInURL = $(location).attr('href').split("name=")[1].split("&")[0],
    keyword = "",
    pageInURL = 1,
    nameToShow = "";
  if (nameInURL.indexOf("+") >= 0) {
    keyword = nameInURL.split("+").join(" ");
  } else {
    keyword = nameInURL;
  }
  nameToShow = decodeURI(keyword).trim().split(" ");
  keyword = decodeURI(keyword).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ");

  if (keyword[0].length >= 3) {
    for (let i = 0; i < extractedData.length; i++) {
      let howManyMatch = 0;
      for (let j = 0; j < keyword.length; j++) {
        if (extractedData[i]['nome'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(keyword[j]) >= 0) {
          howManyMatch++;
        }
      }
      if (howManyMatch == keyword.length) {
        matchingStudents.push((matchingStudents.length + 1) + ";" + extractedData[i]['nome'] + ";" + i);
      }
    }

    if (parseInt(matchingStudents.length) > 0) {
      $("#encontrados").text("ENCONTRADOS " + matchingStudents.length + " RESULTADOS")
      for (let i = 0; i < nameToShow.length; i++ ) {
        nameToShow[i] = nameToShow[i].charAt(0).toUpperCase() + nameToShow[i].slice(1).toLowerCase();
      }
      $("#texto").val(nameToShow.join(" "))
      pageInURL = $(location).attr('href').split("page=")[1]
      anchorInURL = -1;
      if (pageInURL.indexOf("#")) {
        pageInURL = $(location).attr('href').split("page=")[1].split("#")[0];
        anchorInURL = $(location).attr('href').split("page=")[1].split("#")[1];
        try {
          if (!isNaN(parseInt(anchorInURL))) {
            anchorInURL = parseInt(anchorInURL);
          } else {
            anchorInURL = -1;
          }
        } catch {
          anchorInURL = -1;
        }
      }
      try {
        if (!isNaN(parseInt(pageInURL))) {
          pageInURL = parseInt(pageInURL);
        } else {
          pageInURL = 1;
        }
      } catch {
        pageInURL = 1;
      }

      let currentPage = 0,
        pageLoaded = false;

      for (let i = 0; i < matchingStudents.length; i += 20) {
        currentPage++;
        if (currentPage == pageInURL) {
          for (let j = i; j < i + 20; j++) {
            try {
              AppendStudent(matchingStudents[j].split(";")[0], matchingStudents[j].split(";")[1], matchingStudents[j].split(";")[2])
              if (anchorInURL != -1) {
                if (parseInt(matchingStudents[j].split(";")[0]) == anchorInURL) {
                  $("#" + anchorInURL).parent().addClass("teste")
                  $('html, body').animate({
                    scrollTop: $("#" + anchorInURL).offset().top
                  }, 250);
                }
              }
              if (j == (i + 20) - 1) {
                pageLoaded = true;
                break;
              }
            } catch {
              pageLoaded = true;
              break;
            }
          }
        }
        if (pageLoaded) {
          break;
        }
      }
      if (!pageLoaded) {
        location.replace($(location).attr('href').replace(pageInURL, currentPage));
      } else {
        $(".se-pre-con").fadeOut("slow");
        GeneratePageNavigation(currentPage, Math.ceil(matchingStudents.length / 20));
      }
    }
    else {
      $(".se-pre-con").fadeOut("slow");
    }
  } else {
    // Throw an error due to the name not having the needed amount of characters.
  }
}

function SearchByName() {
  let keyword = $("#texto").val().trim();

  if (keyword.indexOf(" ") >= 0) {
    if (keyword.split(" ")[0].length >= 3) {
      location.replace("pesquisa?name=" + keyword.split(" ").join("+") + "&page=1");
    }
  } else {
    if (keyword.length >= 3) {
      location.replace("pesquisa?name=" + keyword + "&page=1");
    }
  }
}
