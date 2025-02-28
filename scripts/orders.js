import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addToCart } from '../data/cart.js';


async function renderOrdersPage() {

  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {

    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

   ordersHTML += `
   <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productListHTML(order)}
        </div>
      </div>
   `
  });

  function productListHTML(order) {

    let productListHTML = '';

    order.products.forEach((orderedProduct) => {

      const { productId } = orderedProduct;

      const matchingProduct = getProduct(productId);

      const estimatedDeliveryTimeString = dayjs(orderedProduct.estimatedDeliverTime).format('MMMM D');

      productListHTML += `
       <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${estimatedDeliveryTimeString}
              </div>
              <div class="product-quantity">
                Quantity: ${orderedProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again"
               data-product-id="${productId}" >
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
  });

  return productListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;


  document.querySelectorAll('.js-buy-again')
      .forEach((button)=> {
        button.addEventListener('click', ()=> {

          const { productId } = button.dataset;

          addToCart(productId);

          button.innerHTML = 'Added';
          setTimeout(() => {
            button.innerHTML = `
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            `;
          }, 1000);

        });
      });




};

renderOrdersPage();