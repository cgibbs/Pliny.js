console.log('This would be the main JS file.');

const names = ["animal_parts", "animals", "disorders", "greek_mythos", "greek_names", "inf_diseases",
        "liquids", "mineral_modifiers", "minerals", "neuro", "part_modifiers", "plant_parts",
        "plants", "rivers", "seas", "skin_disorders", "springs", "viruses_filtered"]

const lists = {};

names.forEach(name =>
  $.ajax("javascripts/lists/" + name + ".txt", {
    type:    "GET",
    success: function(text) {
      // `text` is the file text
      lists[name] = text.split('\n');
    },
    error:   function() {
      // An error occurred
      console.log("something died");
    }
  })
);

function randFromArr(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function get_disorder() {
  const disorders = lists.inf_diseases + lists.viruses_filtered + lists.neuro + lists.disorders;
  return randFromArr(disorders);
}

function get_skin_disorder() {
  return randFromArr(lists.skin_disorders);
}

function get_animal_ingredient() {
  let ing = randFromArr(lists.part_modifiers);
  ing += " " + randFromArr(lists.animal_parts);
  ing += " of the " + randFromArr(lists.animals);
  return ing;
}

function get_plant_ingredient() {
  let ing = randFromArr(lists.part_modifiers);
  ing += " " + randFromArr(lists.plant_parts);
  ing += " of the " + randFromArr(lists.plants);
  return ing;
}

function get_solvent_ingredient() {
  return randInt(2, 10).toString() + " parts " + randFromArr(lists.liquids);
}

function get_mineral_ingredient() {
  let ing = randFromArr(lists.mineral_modifiers);
  ing += " " + randFromArr(lists.minerals);
  return ing;
}

function get_water_ingredient() {
  let ing = randInt(2, 10).toString() + " parts water from the ";
  ra = randInt(0, 2);
  if (ra === 0) ing += "River " + randFromArr(lists.rivers);
  else if (ra === 1) ing += randFromArr(lists.seas) + " Sea";
  else ing += randFromArr(lists.springs) + " Spring";
  return ing;
}

function get_random_ingredient() {
  let ing = randInt(1, 6).toString() + " parts ";
  const ra = randInt(0, 12);
  if (ra > 9) ing += get_animal_ingredient();
  else if (ra > 6) ing += get_plant_ingredient();
  else if (ra > 3) ing += get_mineral_ingredient();
  else if (ra > 1) ing = get_solvent_ingredient();
  else ing = get_water_ingredient();
  return ing;
}

function get_greek_mythos() {
  return randFromArr(lists.greek_mythos);
}

function create_recipe() {
  let ing_list = [get_water_ingredient()];
  for (let i = 0; i < randInt(2, 5); i++) {
    ing_list.push(get_random_ingredient());
  }
  return ing_list.join('<br>');
}

function get_prayer() {
  return "Pray to " + get_greek_mythos().slice(0, -1) + ".";
}

function create_cure() {
  let malady = "To cure ";
  prayer = get_prayer();
  prayer += "<br>Then ";
  if (randInt(0, 1)) malady += get_disorder() + ':<br>' + prayer + "combine and ingest the following:";
  else malady += get_skin_disorder() + ':<br>' + prayer + "apply a poultice composed of the following:";
  malady += '<br>' + create_recipe();
  return malady;
}

function display_cure() {
  $("#cure")[0].innerHTML = create_cure();
}
