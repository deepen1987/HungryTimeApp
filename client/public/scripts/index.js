import * as utilLocCuisine from "./utilityStateCityCuisine.js";
import * as recommendation from "./recommendation.js";

document.addEventListener("DOMContentLoaded", () => {

    if(!getCookie("jwt")){
        window.location.href = "signin.html";
    };

    const search = document.getElementById("search");
    const filter = document.getElementById("filter");
    const filterState = document.getElementById("floatingState");
    const filterCity = document.getElementById("floatingCity");
    const filterCuisine = document.getElementById("floatingCuisines");
    const logout = document.getElementById("logout");



    // Loads the recommended restaurants per user preference
    recommendation.userRecommendation();

    utilLocCuisine.state.addEventListener("click", utilLocCuisine.getState);
    utilLocCuisine.city.addEventListener("click", utilLocCuisine.getcity);
    utilLocCuisine.cuisine.addEventListener("click", utilLocCuisine.getCuisines);


    // Loads the recommended restaturatns per city state and cuisine
    search.addEventListener("click", () => {

        filter.classList.add("was-validated");

        if (filterState.value !== "" && filterCity.value !== "" && filterCuisine.value !== "") {

            recommendation.cityRecommendation(filterCity.value, filterState.value, filterCuisine.value);
        };

    });

    // Logging out
    logout.addEventListener("click", () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "signin.html";
    });

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
});

