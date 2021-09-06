import * as model from './model.js'
import recipeView from './views/recipeView'


import 'core-js/stable' // for polyfilling everything else
import 'regenerator-runtime/runtime' // for polyfilling async-await


const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)
    console.log(id)

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
}

init()

