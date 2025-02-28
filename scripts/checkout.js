import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary  } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import '../data/car.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {

  try {

    // throw 'error1';

  await loadProductsFetch();

  await new Promise((resolve, reject)=> {

    // throw 'error2';

    loadProducts(()=> {
      // reject('error3');
      resolve('value1');
    });
  })

} catch(error) {
  console.log(error,'unexpected error. Please try again later.');
}
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  
  return 'value2';
}

loadPage().then((value)=> {
  console.log(value);
  console.log('next step');
})

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve, reject)=> {
    loadProducts(()=> {
      resolve('value1');
    });
  }),
  new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  }),
]).then((values)=> {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
new Promise((resolve, reject)=> {
  loadProducts(()=> {
    resolve('value1');
  });

}).then((value)=> {
  console.log(value);
  return new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  });

}).then(()=> {
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadProducts(()=> {
  loadCart(()=> {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
