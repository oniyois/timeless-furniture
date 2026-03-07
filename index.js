

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    const filter = button.getAttribute("data-filter");

    products.forEach(product => {

      if(filter === "all"){
        product.style.display = "block";
      }

      else if(product.getAttribute("data-category") === filter){
        product.style.display = "block";
      }

      else{
        product.style.display = "none";
      }

    });

  });
});

