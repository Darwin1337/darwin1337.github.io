// dev by darwin1337

class Aluno {
  constructor(nome, nota, opcao) {
    this.Nome = nome;
    this.Nota = nota;
    this.Opcao = opcao;
  }
}

dataJSON = []
infoAlunos = []
var facSelect = $('#faculdades');
var curSelect = $('#curso');

$(document).ready(function() {
  $.getJSON("json/Lista Colocados.json", function(data) {
    $.each(data, function(key, val) {
      dataJSON.push(val)
      if (key <= 74) {
        facSelect.append($("<option></option>").attr("value", (key + 1)).text(val['estabelecimento']));
      }
    });
  });
});

$('#tipo').on('change', function() {
  facSelect.find('option:not(:first)').remove();
  if (this.value == 2) {
    for (var i = 75; i < dataJSON.length; i++) {
      facSelect.append($("<option></option>").attr("value", (i + 1)).text(dataJSON[i]['estabelecimento']));
    }
  } else {
    for (var i = 0; i < 75; i++) {
      facSelect.append($("<option></option>").attr("value", (i + 1)).text(dataJSON[i]['estabelecimento']));
    }
  }
});

facSelect.on('change', function() {
  curSelect.find('option:not(:first)').remove();
  if (this.value != 0) {
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'].length; i++) {
      curSelect.append($("<option></option>").attr("value", (i + 1)).text(dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][i]['curso']));
    }
  }
});

function addHeader() {
  $("#status").removeClass("hide-div").addClass("show-div");
  $("#colocados").append($("<tr></tr>")
  .append($("<th></th>").text("#"))
  .append($("<th></th>").text("Nome"))
  .append($("<th></th>").text("Nota"))
  .append($("<th></th>").text("Opção")))
  $("#sem-curso").addClass("hide-text");
}

function appendToTable(array) {
  for (var i = 0; i < array.length; i++) {
    $("#colocados").append($("<tr></tr>")
    .append($("<td></td>").text(i + 1))
    .append($("<td></td>").text(array[i].Nome))
    .append($("<td></td>").text(array[i].Nota))
    .append($("<td></td>").text(array[i].Opcao)))
  }
}

$("#ver").click(function(event) {
  infoAlunos = []
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    var facOption = $('#faculdades option').filter(':selected').val() - 1
    var curOption = $('#curso option').filter(':selected').val() - 1
    for (var i = 0; i < dataJSON[facOption]['data'][curOption]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[facOption]['data'][curOption]['colocados'][i]['nome'],
        dataJSON[facOption]['data'][curOption]['colocados'][i]['nota'],
        dataJSON[facOption]['data'][curOption]['colocados'][i]['opcao']
      ))
    }
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#alfabeticamente-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        keyB = b.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#alfabeticamente-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        keyB = b.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#nota-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nota,
        keyB = b.Nota;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#nota-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    $("#sem-curso").addClass("hide-text");
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nota,
        keyB = b.Nota;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#opcao-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    $("#sem-curso").addClass("hide-text");
    infoAlunos.sort(function(a, b) {
      var keyA = a.Opcao,
        keyB = b.Opcao;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#opcao-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    addHeader();
    $("#sem-curso").addClass("hide-text");
    infoAlunos.sort(function(a, b) {
      var keyA = a.Opcao,
        keyB = b.Opcao;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    appendToTable(infoAlunos);
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});
