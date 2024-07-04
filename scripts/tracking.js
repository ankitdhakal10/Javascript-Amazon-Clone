import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadTrackingPage() {

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let matchingProduct;
  order.products.forEach((orderedProduct) => {
    if (orderedProduct.productId === product.id) {
      matchingProduct = orderedProduct;
    }
  });


  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

  const trackingPageHTML = `
   <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
         ${deliveredMessage}
          ${dayjs(matchingProduct.estimatedDeliveryTime).format('dddd MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantitiy}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${
              percentProgress < 50 ? 'current-status' : ''}">
              Preparing
            </div>
          <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
            Shipped
          </div>
           <div class="progress-label ${percentProgress >= 100 ? "current-status" : ''}">Delivered</div>
           </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%"></div>
        </div>
  `;


  document.querySelector('.js-order-tracking').innerHTML = trackingPageHTML;

}

loadTrackingPage();