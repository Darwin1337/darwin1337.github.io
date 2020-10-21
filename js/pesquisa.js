var dataJSON = []
var result = []
var isScrollNeeded = false
var isFinished = false
var appendLeft = 0
var totalAppended = 0

$(document).ready(function() {
  $.getJSON("json/primeira-fase/Detalhes Alunos.json", function(data) {
    $.each(data, function(key, val) {
      dataJSON.push(val)
    });
  });
});

function appendToTable(a, b, c) {
  $("#colocados").append($("<tr></tr>")
    .append($("<td></td>").text(a))
    .append($("<td></td>").text(b).attr("onClick", "window.location='aluno?a=" + c + "'").attr("id", "link")))
}

function pesquisar() {
  if ($("#texto").val().length > 3) {
    isScrollNeeded = true
    isFinished = false
    $("#colocados tr").empty();
    result = []
    var count = 0
    let keyword = $("#texto").val().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ");
    for (var i = 0; i < dataJSON.length; i++) {
      var howManyMatch = 0
      for (var j = 0; j < keyword.length; j++) {
        if (dataJSON[i]['nome'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(keyword[j]) >= 0) {
          howManyMatch++;
        }
      }
      if (howManyMatch == keyword.length) {
        count++;
        result.push(count + ";" + dataJSON[i]['nome'] + ";" + i)
      }
    }
    $("#encontrados").text("ENCONTRADOS " + count + " RESULTADOS")
    appendLeft = count;
    totalAppended = 0;
    if (result.length > 20) {
      isScrollNeeded = true
      for (var i = 0; i < 20; i++) {
        appendToTable(result[i].split(";")[0], result[i].split(";")[1], result[i].split(";")[2])
      }
      totalAppended += 20
      appendLeft -= 20;
    }
    if (result.length <= 20) {
      for (var i = 0; i < result.length; i++) {
        appendToTable(result[i].split(";")[0], result[i].split(";")[1], result[i].split(";")[2])
      }
      totalAppended += result.length
      appendLeft = 0
      isFinished = true
      isScrollNeeded = false
    }
  } else {
    // Tem que ter pelo menos 4 caracteres
  }
}

$(document.body).on('touchmove', onScroll);
$(window).on('scroll', onScroll);

function onScroll() {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    if (!isFinished && isScrollNeeded) {
      if (appendLeft > 20) {
        for (var i = 0; i < 20; i++) {
          appendToTable(result[totalAppended].split(";")[0], result[totalAppended].split(";")[1], result[totalAppended].split(";")[2])
          totalAppended++;
          appendLeft--;
        }
      } else {
        let left = appendLeft
        for (var i = 0; i < left; i++) {
          appendToTable(result[totalAppended].split(";")[0], result[totalAppended].split(";")[1], result[totalAppended].split(";")[2])
          totalAppended++;
          appendLeft--;
        }
        isFinished = true
        isScrollNeeded = false
      }
    }
  }
}
