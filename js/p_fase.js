dataJSON = []

var facSelect = $('#faculdades');
$(document).ready(function() {
  $.getJSON("json/Lista Colocados.json", function(data) {
    $.each(data, function(key, val) {
      if (key <= 74) {
        facSelect.append($("<option></option>").attr("value", (key + 1)).text(val['estabelecimento']));
        dataJSON.push(val)
      } else {
        dataJSON.push(val)
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

var curSelect = $('#curso');
facSelect.on('change', function() {
  curSelect.find('option:not(:first)').remove();
  if (this.value != 0) {
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'].length; i++) {
      curSelect.append($("<option></option>").attr("value", (i + 1)).text(dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][i]['curso']));
    }
  }
});

$("#ver").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome']))
      .append($("<td></td>").text(dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota']))
      .append($("<td></td>").text(dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao'])))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

class Aluno {
  constructor(nome, nota, opcao) {
    this.Nome = nome;
    this.Nota = nota;
    this.Opcao = opcao;
  }
}

$("#alfabeticamente-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        keyB = b.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#alfabeticamente-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        keyB = b.Nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#nota-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nota,
        keyB = b.Nota;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#nota-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Nota,
        keyB = b.Nota;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#opcao-cima").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Opcao,
        keyB = b.Opcao;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});

$("#opcao-baixo").click(function(event) {
  $("#colocados tr").empty();
  if ($('#curso option').filter(':selected').val() != 0) {
    $("#status").removeClass("hide-div").addClass("show-div");
    $("#colocados").append($("<tr></tr>")
    .append($("<th></th>").text("#"))
    .append($("<th></th>").text("Nome"))
    .append($("<th></th>").text("Nota"))
    .append($("<th></th>").text("Opção")))
    $("#sem-curso").addClass("hide-text");
    infoAlunos = []
    for (var i = 0; i < dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'].length; i++) {
      infoAlunos.push(new Aluno(
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nome'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['nota'],
        dataJSON[$('#faculdades option').filter(':selected').val() - 1]['data'][$('#curso option').filter(':selected').val() - 1]['colocados'][i]['opcao']
      ))
    }
    infoAlunos.sort(function(a, b) {
      var keyA = a.Opcao,
        keyB = b.Opcao;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    for (var i = 0; i < infoAlunos.length; i++) {
      $("#colocados").append($("<tr></tr>")
      .append($("<td></td>").text(i + 1))
      .append($("<td></td>").text(infoAlunos[i].Nome))
      .append($("<td></td>").text(infoAlunos[i].Nota))
      .append($("<td></td>").text(infoAlunos[i].Opcao)))
    }
  }
  else {
    $("#status").removeClass("show-div").addClass("hide-div");
    $("#sem-curso").removeClass("hide-text");
  }
});