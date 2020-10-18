$(document).ready(function() {
  $.getJSON("json/primeira-fase/Detalhes Alunos.json", function(data) {
    $.each(data, function(key, val) {
      if (key == $(location).attr('href').split("=")[1]) {
        $("#nome-text").text(val['nome']);
        $("#nota1-text").text(val['nota_10ano_11ano']);
        $("#nota2-text").text(val['nota_12ano']);
        $("#total-opcoes-text").text(val['opcoes'].length + " DE 6");
      }
      opcoes = []
      for(var i = 0; i < val['opcoes']; i++) {
        opcoes.push(val['opcoes'][i]);
      }
    });
  });
});
