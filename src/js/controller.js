import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView.js'


import 'core-js/stable' // for polyfilling everything else
import 'regenerator-runtime/runtime' // for polyfilling async-await

if(module.hot) {
  module.hot.accept()
}

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if(!id) return
    
    recipeView.renderSpinner()
   
    // Loading Recipe
    await model.loadRecipe(id)

    // Rendering Recipe
    recipeView.render(model.state.recipe)
    
  } catch (err) {
    recipeView.renderError()
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner()

    // 1) Get search query
    const query = searchView.getQuery()
    if(!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage(1))
  } catch (err) {
    console.log(err)
  }
}
controlSearchResults()

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}

init()

