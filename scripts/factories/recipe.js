// Importer les fonctions utilitaires pour créer des éléments du DOM
import * as Dom from "./../util/dom.js";
/**
 * Farbrique de HTML Cards des recettes
 *
 * @param {Recipe} aRecipe - un objet recette de la classe Recipe
 * @returns
 */
export function recipeFactory(aRecipe) {
  // Destructurer les propriétés de l'objet data dans des variables séparées
  const { id } = aRecipe;

  /**
   * Fabriquer un élément HTML Article contenant une recette
   * avec une présensation utilisant des classes Bootstrap
   *
   * @returns {HTMLElement} un élément HTML Article contenant une recette complète
   */
  function getRecipeCardDOM() {
    /** @const {HTMLDivElement} - l'élement html article qui contient la card */
    // avec la classe BEM et des classes bootstrap pour un affichage responsive
    const article = Dom.getArticle([
      "card-recipe",
      "col-sm-6",
      "col-lg-4",
      "my-2",
      "px-2",
    ]);

    // Ce data attribut permet de marquer cette HTML Card pour l'identifier
    article.setAttribute("data-id", id);

    /** @type {HTMLDivElement} une zone grise foncée */
    const grey = Dom.getDiv([
      "card-recipe__zone",
      "row",
      "h-50",
      "bg-secondary",
      "mx-0",
      "px-1",
    ]);

    // Ajouter la zone grise dans l'article
    article.appendChild(grey);

    /** @type {HTMLDivElement} le conteneur du nom de la recette, de ses ingrédients et de la description des étapes */
    const recipeBody = Dom.getDiv([
      "card-recipe__body",
      "container",
      "p-2",
      "bg-light",
      "h-50",
    ]);

    /** @type {HTMLDivElement} le titre html de la recette avec son temps de réalisation*/
    const title = getRecipeTitle(aRecipe.name, aRecipe.time); // (I)

    /** @type {HTMLDivElement} le conteneur du nom de la recette, de ses ingrédients et de la description des étapes */
    const recipeElements = Dom.getDiv([
      "card-recipe__body__elements",
      "row",
      "h-75",
      "p-0",
      "m-0",
    ]);

    /** @type {HTMLElement} une liste ul et ses items pour afficher les ingrédients */
    const ingredients = getIngredients(aRecipe.ingredients); // (II)

    /** @type {HTMLParagraphElement} la description des étapes pour réaliser la recette */
    const description = getDescription(aRecipe.description); // (III)

    // Ajouter le titre au corps de la recette
    recipeBody.appendChild(title); // (I)
    // Ajouter la liste des ingrédients dans un conteneur div
    recipeElements.appendChild(ingredients); // (II)
    // Ajouter les description dans un conteneur div
    recipeElements.appendChild(description); // (III)
    // Ajouter le conteneur avec les ingrédients et la description au corps de la recette
    recipeBody.appendChild(recipeElements);
    // Ajouter le corps de la recette à l'article
    article.appendChild(recipeBody);

    return article;
  }

  return { id, getRecipeCardDOM };
}

/**
 * Créer le titre de la recette avec un icone horloge
 *
 * @param {string} recipeTitle - nom de la recette
 * @param {number} recipeTime - temps de réalisation en minutes
 *
 * @returns {HTMLDivElement} un conteneur html avec le titre de la recette
 */
function getRecipeTitle(recipeTitle, recipeTime) {
  /** @type {HTMLDivElement} le conteneur du nom de la recette avec son temps de réalisation*/
  const divParent = Dom.getDiv([
    "card-recipe__body__heading",
    "row",
    "h-auto",
    "mx-0",
  ]);

  /** @type {HTMLTitleElement} le nom de la recette */
  const title = Dom.getTitle("h2", recipeTitle, [
    "card-recipe__body__heading__title",
    "col-8",
    "mb-0",
    "px-1",
    "py-2",
    "my-auto",
  ]);

  /** @type {HTMLSpanElement} le temps de réalisation de la recette */
  const timeToMake = Dom.getSpan(
    [
      "card-recipe__body__heading__time",
      "col-4",
      "my-auto",
      "font-weight-bold",
      "px-1",
    ],
    `${recipeTime} min`
  );

  /** @type {HTMLElement} - balise de texte pour contenir l'icone horloge */
  const icone = Dom.getIcone([
    "card-recipe__body__heading__time__clock",
    "bi",
    "bi-clock",
    "mr-2",
    "my-auto",
  ]);

  // Ajouter l'horloge devant le temps en mn
  timeToMake.prepend(icone);

  // Ajouter le nom de la recette
  divParent.appendChild(title);

  // Ajouter le temps de réalisation
  divParent.appendChild(timeToMake);

  return divParent;
}

/**
 * Mise en page du texte de la rectte
 *
 * @param {string} aDesciption - les étapes de la recette
 * @returns {HTMLParagraphElement} description des étapes de la recette
 */
function getDescription(aDescription) {
  /** @type {HTMLParagraphElement} - paragraphe de texte pour la description de la recette */
  const p = Dom.getPara(
    [
      "card-recipe__body__elements__description",
      "col-6",
      "mb-0",
      "pl-0",
      "pr-1",
    ],
    aDescription
  );

  return p;
}

/**
 * Monter la liste hmtl des ingrédients de la recette
 * avec les quantités et les unités
 *
 * @param {Map<Ingredient>} aIngredients - Structure dont la clé est le nom ingrédient et dont la valeur est un objet de type Ingredient
 * @returns {HTMLElement} la liste non ordonnéé des ingrégient
 */
function getIngredients(aIngredients) {
  /** @type {HTMLElement} la liste des ingrédients */
  const listIngredients = document.createElement("ul");
  //
  listIngredients.classList.add("card-recipe__body__elements__list");
  listIngredients.classList.add("col-6");
  listIngredients.classList.add("mb-0");
  listIngredients.classList.add("px-1");
  listIngredients.classList.add("list-unstyled");

  /** @type {HTMLElement} un élément li contenant un ingrédient */
  let item;
  /** @type {Node} le texte de l'ingrédient */
  let text;
  /** @type {HTMLSpanElement}  */
  let span;
  // Parcourir tous les ingrédients de la structure Map ...
  aIngredients.forEach((value, key) => {
    item = document.createElement("li");
    // Ajouter la classe BEM
    item.classList.add("card-recipe__body__elements__list__ingredient");
    // Bootstrap
    item.classList.add("font-weight-bold");
    // Créer le noeud avec le texte de l'ingrédient
    text = document.createTextNode(`${key} : `); // key = value.ingredient
    // Ajouter le texte à l'élément de liste
    item.appendChild(text);
    // Ajouter l'élément à la liste des ingrédients
    listIngredients.appendChild(item);
    span = Dom.getSpan("font-weight-normal", `${value.quantity} ${value.unit}`);
    item.appendChild(span);
    // Raz
    item = null;
    text = null;
    span = null;
  });

  return listIngredients;
}
