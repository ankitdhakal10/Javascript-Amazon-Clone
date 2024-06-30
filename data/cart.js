export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  }, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1
    })
  }
}

export function removeFromCart(productId) {

  cart = cart.filter(cartItem => cartItem.id !== productId);
}