import ramens from "./ramen_DB_final.json" assert { type: "json" };
import result_1_1 from "./json/idc+idc.json" assert { type: "json" };
import result_1_2 from "./json/idc+higher.json" assert { type: "json" };
import result_1_3 from "./json/idc+lower.json" assert { type: "json" };
import result_2_1 from "./json/higher+idc.json" assert { type: "json" };
import result_2_2 from "./json/higher+higher.json" assert { type: "json" };
import result_2_3 from "./json/higher+lower.json" assert { type: "json" };
import result_3_1 from "./json/lower+idc.json" assert { type: "json" };
import result_3_2 from "./json/lower+higher.json" assert { type: "json" };
import result_3_3 from "./json/lower+lower.json" assert { type: "json" };

var search_btn = document.getElementById("search-btn");
var submit_btn = document.getElementById("submit-btn");

function getRamenName(name) {
  if (name == "") {
    return [];
  }
  return ramens.filter(function (ramen) {
    return ramen.name.replace(/\s/g, "").includes(name);
  });
}

function getSelectedRamen() {
  var selected = document.querySelector(
    'input[name="ramen-search-results"]:checked'
  );
  return selected ? selected.value : "";
}

function getSodium() {
  var selected = document.querySelector('input[name="Sodium"]:checked');
  return selected ? selected.value : "";
}

function getCalorie() {
  var selected = document.querySelector('input[name="Calorie"]:checked');
  return selected ? selected.value : "";
}

search_btn.addEventListener("click", function () {
  var search_txt = document.getElementById("search-txt");

  if (search_txt.value.length > 0) {
    var search_result = getRamenName(search_txt.value);

    if (search_result.length > 0) {
      var show_result = document.getElementById("search-results-list");
      show_result.innerHTML = "";
      search_result.forEach(function (ramen) {
        show_result.innerHTML += `<INPUT TYPE="Radio" Name="ramen-search-results" ID="${ramen.name}" Value="${ramen.name}">
          <LABEL FOR="${ramen.name}">${ramen.name}</LABEL><br>`;
      });
    } else {
      alert("No ramen found");
    }
  }
});

submit_btn.addEventListener("click", function () {
  var ramen_selected = getSelectedRamen();
  var sodium_pref = getSodium();
  var calorie_pref = getCalorie();

  if (ramen_selected.length < 0) {
    alert("Please select a ramen");
  } else if (sodium_pref.length < 0) {
    alert("Please select a sodium preference");
  } else if (calorie_pref.length < 0) {
    alert("Please select a calorie preference");
  } else {
    var sample_name, sample_sodium, sample_calories, result;
    if (sodium_pref == "idc") {
      if (calorie_pref == "idc") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_1_1
        );
      } else if (calorie_pref == "higher") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_1_2
        );
      } else if (calorie_pref == "lower") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_1_3
        );
      }
    } else if (sodium_pref == "higher") {
      if (calorie_pref == "idc") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_2_1
        );
      } else if (calorie_pref == "higher") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_2_2
        );
      } else if (calorie_pref == "lower") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_2_3
        );
      }
    } else if (sodium_pref == "lower") {
      if (calorie_pref == "idc") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_3_1
        );
      } else if (calorie_pref == "higher") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_3_2
        );
      } else if (calorie_pref == "lower") {
        [sample_name, sample_sodium, sample_calories, result] = getResult(
          ramen_selected,
          result_3_3
        );
      }
    }

    var recommendation_table = document.getElementById("recommandation-table");
    recommendation_table.innerHTML = `<tr>
    <th>Name</th>
    <th>Sodium</th>
    <th>Calories</th>
</tr>`;
    recommendation_table.innerHTML += `<tr>
      <th>${sample_name}</th>
      <th>${sample_sodium}</th>
      <th>${sample_calories}</th>
      </tr>`;
    if (i != 0) {
      for (var i = 0; i < result.length; i++) {
        var recommended = result[i];
        recommendation_table.innerHTML += `<tr>
        <td>${recommended.name}</td>
        <td>${recommended.sodium}</td>
        <td>${recommended.calories}</td>
        </tr>`;
      }
    } else {
      alert("There is no ramen found with your preferences");
    }
  }
});

function getResult(name, full_results) {
  var result = full_results.filter(function (ramen) {
    return ramen.name == name;
  });
  return [
    result[0].name,
    result[0].sodium,
    result[0].calories,
    result[0].result,
  ];
}
