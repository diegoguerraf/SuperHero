$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var heroId = $("#heroId").val();
    if (!heroId.trim().match(/^\d+$/)) {
      alert("Por favor ingrese un ID de superhéroe válido (solo números).");
      return;
    }
    fetchHeroData(heroId);
  });

  function fetchHeroData(heroId) {
    var apiKey = "4905856019427443";
    var apiUrl =
      "https://www.superheroapi.com/api.php/" + apiKey + "/" + heroId;

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (response) {
        if (response && response.response === "error") {
          alert("SuperHéroe no encontrado o falló la solicitud a la API.");
        } else {
          displayHeroData(response);
        }
      },
      error: function () {
        alert(
          "Error al obtener los datos del superhéroe. Por favor intente de nuevo más tarde."
        );
      },
    });
  }

  function displayHeroData(hero) {
    var heroCard = '<div class="card">';
    heroCard += '<div class="row no-gutters">';

    heroCard += '<div class="col-md-4">';
    heroCard +=
      '<img src="' +
      hero.image.url +
      '" class="card-img" alt="' +
      hero.name +
      '">';
    heroCard += "</div>";

    heroCard += '<div class="col-md-8">';
    heroCard += '<div class="card-body">';
    heroCard +=
      '<h5 class="card-title">SuperHéroe encontrado: ' + hero.name + "</h5>";
    heroCard +=
      '<p class="card-text">Conexiones: ' +
      hero.connections["group-affiliation"] +
      "</p>";
    heroCard += '<hr class="hr-line">';
    heroCard +=
      '<p class="card-text">Ocupación: ' + hero.work.occupation + "</p>";
    heroCard += '<hr class="hr-line">';
    heroCard +=
      '<p class="card-text">Primera Aparición: ' +
      hero.biography["first-appearance"] +
      "</p>";
    heroCard += '<hr class="hr-line">';
    heroCard +=
      '<p class="card-text">Altura: ' + hero.appearance.height[1] + "</p>";
    heroCard += '<hr class="hr-line">';
    heroCard +=
      '<p class="card-text">Peso: ' + hero.appearance.weight[1] + "</p>";
    heroCard += '<hr class="hr-line">';
    heroCard +=
      '<p class="card-text">Alianzas: ' + hero.biography.publisher + "</p>";
    heroCard += "</div></div></div></div>";
    $("#heroData").html(heroCard);

    // Generar gráfico usando CanvasJS
    var dataPoints = [
      { label: "Inteligencia", y: parseInt(hero.powerstats.intelligence) },
      { label: "Fuerza", y: parseInt(hero.powerstats.strength) },
      { label: "Velocidad", y: parseInt(hero.powerstats.speed) },
      { label: "Durabilidad", y: parseInt(hero.powerstats.durability) },
      { label: "Poder", y: parseInt(hero.powerstats.power) },
      { label: "Combate", y: parseInt(hero.powerstats.combat) },
    ];

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Estadísticas del SuperHéroe",
      },
      data: [
        {
          type: "pie",
          startAngle: 240,
          yValueFormatString: '##0.00"%"',
          indexLabel: "{label} {y}",
          dataPoints: dataPoints,
        },
      ],
    });
    chart.render();
  }
});
