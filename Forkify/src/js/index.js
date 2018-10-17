import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/RecipeView';
import {elements, renderLoader, clearLoader} from './views/base';

const state = {
    // search
    // recipe
};

// Search Controller
const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();
    // const query = 'pizza';

    if (query) {
        // New Search object and to the state
        state.search = new Search(query);

        // Prepare UI for Result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // Search for recipes
            await state.search.getResult();
            // Render Result on UI
            clearLoader();
            searchView.renderResults(state.search.result, null);
        } catch (e) {
            alert("Error Searching : " + e);
            clearLoader();
        }
    }
};

elements.searchField.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
        .catch(e => {
            alert(e);
        });
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Recipe Controller
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight Selected Item
        if (state.search) searchView.highlightSelected(id);

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcTime();
            state.recipe.calServings();

            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (e) {
            alert("Error Procession Recipe: " + e);
        }

    }
};

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
    }

    recipeView.updateServingsIngredient(state.recipe);

    console.log(state.recipe);
});