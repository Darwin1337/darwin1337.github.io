$(document).ready(function() {
  if ($(location).attr('href').indexOf("=") >= 0) {
    $.getJSON("json/primeira-fase/Detalhes Alunos.json", function(data) {
      let foundStudent = false
      $.each(data, function(key, val) {
        if (key == $(location).attr('href').split("=")[1]) {
          foundStudent = true
          $("#nome-text").text(val['nome']);
          $("#nota1-text").text(val['nota_10ano_11ano']);
          $("#nota2-text").text(val['nota_12ano']);
          $("#total-opcoes-text").text(val['opcoes'].length + " DE 6");
          opcoes = val['opcoes'].sort(function(a,b) { return (a.opcao < b.opcao) ? -1 : ((a.opcao > b.opcao) ? 1 : 0); })
          for (var i = 0; i < opcoes.length; i++) {
            main = $("#append-here");
            if (opcoes[i]['colocado'] == "true") {
              main.append($('<div id="opcoes-colocado" class="container mt-5 mb-5"><div class="card-titulo text-center"><p class="m-0 p-0">COLOCADO</p></div><div class="container-fluid"><div class="row"><div class="col-md-2 text-center my-auto"><p style="font-size: 64px; color: white;">' + opcoes[i]['opcao'] + '</p></div>  <div class="col-md-10"><div class="row card-details mt-2"><div class="col-md-12"><p id="faculdade-result"><span id="codigo-faculdade">[' + opcoes[i]['cod_faculdade'] + ']</span> ' + opcoes[i]['nome_faculdade'] + '</p><p id="curso-result"><span id="codigo-curso">[' + opcoes[i]['cod_curso'] + ']</span> ' + opcoes[i]['nome_curso'] + '</p><p id="pi-result"><span>PROVA DE INGRESSO:</span> ' + opcoes[i]['prova_ingresso'] + '</p><p id="nota-result"><span>NOTA DE CANDIDATURA:</span> ' + opcoes[i]['nota_candidatura'] + '</p></div></div></div></div></div></div>'))
            } else {
              main.append($('<div id="opcoes-nao-colocado" class="container mt-5 mb-5"><div class="card-titulo text-center"><p class="m-0 p-0">NÃO COLOCADO</p></div><div class="container-fluid"><div class="row"><div class="col-md-2 text-center my-auto"><p style="font-size: 64px; color: white;">' + opcoes[i]['opcao'] + '</p></div>  <div class="col-md-10"><div class="row card-details mt-2"><div class="col-md-12"><p id="faculdade-result"><span id="codigo-faculdade">[' + opcoes[i]['cod_faculdade'] + ']</span> ' + opcoes[i]['nome_faculdade'] + '</p><p id="curso-result"><span id="codigo-curso">[' + opcoes[i]['cod_curso'] + ']</span> ' + opcoes[i]['nome_curso'] + '</p><p id="pi-result"><span>PROVA DE INGRESSO:</span> ' + opcoes[i]['prova_ingresso'] + '</p><p id="nota-result"><span>NOTA DE CANDIDATURA:</span> ' + opcoes[i]['nota_candidatura'] + '</p></div></div></div></div></div></div>'))
            }
          }
        }
      });
      if (!foundStudent) {
        window.location.replace("error");
      }
    });
  } else {
    window.location.replace("error");
  }
});
