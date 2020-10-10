var initialSrc = "img/logo-branco.png";
var scrollSrc = "img/logo.png";

$(window).scroll(function() {
  var value = $(this).scrollTop();
  if (value > 1) {
    $(".nav-logo").attr("src", scrollSrc);
    $(".navbar").css("background", "white");
    $(".navbar").css("box-shadow", "0 4px 4px rgba(0, 0, 0, 0.4)");
    $('.item').css({
      'cssText': 'color: #313740 !important'
    });
    if (window.innerWidth < 768) {
      $('.fa-bars').css({
        'cssText': 'color: #313740 !important'
      });
    }
  } else {
    $(".nav-logo").attr("src", initialSrc);
    $(".navbar").css("background", "none");
    $(".navbar").css("box-shadow", "none");
    if (window.innerWidth >= 768) {
      $('.item').css({
        'cssText': 'color: white !important'
      });
    } else {
      $('.fa-bars').css({
        'cssText': 'color: white !important'
      });
    }
  }
});

$('.btn-header').click(function() {
  $('html, body').animate({
    scrollTop: ($('.parte-dois').offset().top - 85)
  }, 1000);
});

$('.carro').click(function() {
  $.confirm('<b>Do Porto:</b> 181Km – duração aprx. 2h.<br><br><b>1.</b> A4 Vila Real/Bragança<br><b>2.</b> IC5 Miranda do Douro/Alijó<br><b>3.</b> Saída 27 – Miranda do Douro/Alfandega da Fé<br><b>4.</b> IP2 direção Torre de Moncorvo<br><b>5.</b> Foz do Sabor<br><br><b>De Lisboa:</b> 404 Km – Duração aprx. 4h.<br><br><b>1.</b> A1 Norte<br><b>2.</b> A23 Abrantes/Castelo Branco (saída 7)<br><b>3.</b> A25 Aveiro (saída 36)<br><b>4.</b> IP2 Bragança/Trancoso (saída 28A)<br><b>5.</b> Pocinho<br><b>6.</b> Torre de Moncorvo<br><b>7.</b> Foz do Sabor', 'Carro');
});

$('.comboio').click(function() {
  $.confirm('Linha do Douro até à estação do Pocinho', 'Comboio');
});

$('.barco').click(function() {
  $.confirm('Atracar no Cais da Foz do Sabor', 'Barco');
});

$(function(){
  if (window.location.href.indexOf("galeria") > -1) {
    var getHeightUm = $(".portfolio-item")[0].getAttribute("style");
    getHeightUm = getHeightUm.split(";");
    var getHeightDois = $(".portfolio-item")[1].getAttribute("style");
    getHeightDois = getHeightDois.split(";");
    var finalStyle;

    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      finalStyle = getHeightUm[1] + ";" + getHeightDois[0] + ";";
    } else {
      finalStyle = getHeightUm[0] + ";" + getHeightDois[1] + ";";
    }
    $(".portfolio-item")[0].setAttribute("style", finalStyle);
  }
});

'use strict';
(function($) {
	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	/*----------------------
		Portfolio item size
	------------------------*/
	var PorfolioItemFix = function () {
		$( ".portfolio-item" ).each(function( index ) {
			var portfolioItem = $(this);
			var PIheight = portfolioItem.width();
			portfolioItem.css('height',PIheight);
		});
	}
	PorfolioItemFix();
	$(window).on('resize',function(){
		PorfolioItemFix();
	});

	/*------------------
		Image Popup
	--------------------*/
	$('.img-popup').magnificPopup({
		type: 'image',
		mainClass: 'img-popup-warp',
		removalDelay: 500,
	});

})(jQuery);
