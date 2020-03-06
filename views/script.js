let cart = [];
let productsContainer = document.querySelector('#productsList');


/**
 * Function to fetch the datas and call the display function
 * @param {HTMLElement} container The container on wich append the products
 * @param {Boolean} showSelect A boolean to control the display of select buttons
 */
function displayProducts() {

    let myInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch("/products", myInit)
        .then(response => response.json())
        .then(response => {
            productsList(response)
        })
        .catch(error => alert("Erreur : " + error));
}

/**
 * Function to display the products in a table
 * @param {Array} list The list of the products fetched with the API
 */
function productsList(list) {

    if ((productsContainer.childNodes.length == 0)) {
        list.forEach(product => {
            // Display the table
            document.querySelector('#productsTable').classList.remove('productsTableOff');

            // Create a row for the product
            let row = productsContainer.insertRow();

            // Create, insert and fill in the cells
            row.insertCell().appendChild(document.createTextNode(product.id));
            row.insertCell().appendChild(document.createTextNode(product.name));
            row.insertCell().appendChild(document.createTextNode(product.price));

            // Create, insert and fill in the quantity cell with a data-id attribute
            let cell = row.insertCell()
            cell.setAttribute('data-id', product.id);
            cell.appendChild(document.createTextNode(product.quantity));


            // Create a column to add product to the cart
            let addToCart = document.createElement('input');
            addToCart.setAttribute('type', 'button');
            addToCart.setAttribute('value', "+");
            addToCart.setAttribute('data-id', product.id);
            addToCart.classList.add('addToCart');
            addToCart.addEventListener('click', addToCaddy);

            // Add a column to remove product from the cart
            let removeFromCart = document.createElement('input');
            removeFromCart.setAttribute('type', 'button');
            removeFromCart.setAttribute('value', "-");
            removeFromCart.setAttribute('data-id', product.id);
            removeFromCart.classList.add('removeFromCart');
            removeFromCart.addEventListener('click', removeFromCaddy);

            // Insert the select column in the table
            let divQuantity = document.createElement('div');
            divQuantity.appendChild(addToCart);
            divQuantity.appendChild(removeFromCart);
            row.insertCell(3).appendChild(divQuantity);
        })
    }
}

/**
 * Function to display the products from the customer cart
 */
function caddyList() {

    // Select container
    let container = document.querySelector('#caddyList');
    let message = document.querySelector('#caddyMessage');
    let submitBtn = document.querySelector('#submitCmd');

    // Display the products if quantity > 0
    cart.forEach(product => {
        let line = document.querySelector(`#cartProd_${product.id}`)
        if (!line && product.quantity > 0) {
            // Create a row for the product
            let row = container.insertRow();
            row.id = `cartProd_${product.id}`;

            // Create, insert and fill in the cells
            row.insertCell().appendChild(document.createTextNode(product.id));
            row.insertCell().appendChild(document.createTextNode(product.name));
            row.insertCell().appendChild(document.createTextNode(product.price));

            if (product.quantity != 0) {
                // Create, insert and fill in the quantity cell with a data-id attribute
                let cell = row.insertCell()
                cell.setAttribute('data-id', product.id);
                cell.appendChild(document.createTextNode(product.quantity));
            }
        } else if (line && product.quantity === 0) {
            let lineIndex = line.rowIndex;
            let table = document.querySelector('#caddyTable');
            (table.querySelector('table')).deleteRow(lineIndex);
        }
    })

    // Remove products with quantiry = 0 from the cart
    cart = cart.filter(product => product.quantity > 0);

    // Manage the message
    if (cart.length == 0) {
        message.innerText = "Votre caddy est vide!";
        message.classList.remove('caddyMessage');
        submitBtn.classList.add('productsTableOff');
        (document.querySelector('#caddyTable')).classList.add('productsTableOff');

    } else {
        // Display caddy table
        (document.querySelector('#caddyTable')).classList.remove('productsTableOff');

        let totalPrice = 0;
        cart.forEach(product => {
            totalPrice += product.price * product.quantity;
        })

        message.innerText = `Total de votre commande : ${totalPrice} euros.`;
        if (message.classList.contains('caddyMessage')) {
            message.classList.remove('caddyMessage')
        }

        submitBtn.classList.remove('productsTableOff');
    }
}

/**
 * Function to increment the products quantity, update the output, and add the products to the cart
 */
function addToCaddy() {
    let e = event.target;
    let selectedProdId = e.dataset.id;
    let updateQty = document.querySelectorAll(`td[data-id = "${selectedProdId}"]`);

    let myInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (cart.length != 0) {
        let selectedProd = cart.find(product => product.id == e.dataset.id);
        if (selectedProd) {
            // Update quantity
            selectedProd.quantity++;

            // Update quantity output
            updateQty.forEach(td => {
                td.innerText = selectedProd.quantity;
            })
            caddyList();

        } else {
            fetch(`/products/${selectedProdId}`, myInit)
                .then(response => response.json())
                .then(response => {
                    response[0].quantity++;
                    cart.push(response[0]);

                    updateQty.forEach(td => {
                        td.innerText = response[0].quantity;
                    })
                    caddyList();
                })
                .catch(error => alert("Erreur : " + error));
        }
    } else {
        fetch(`/products/${selectedProdId}`, myInit)
            .then(response => response.json())
            .then(response => {
                response[0].quantity++;
                cart.push(response[0]);
                updateQty.forEach(td => {
                    td.innerText = response[0].quantity;
                })
                caddyList();
            })
            .catch(error => alert("Erreur : " + error));
    }
}

/**
 * Function to decrement the products quantity, update the output, and remove the products from the cart
 */
function removeFromCaddy() {
    let e = event.target;
    let selectedProdId = e.dataset.id;
    let updateQty = document.querySelectorAll(`td[data-id = "${selectedProdId}"]`);

    let myInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (cart.length != 0) {
        let selectedProd = cart.find(product => product.id == e.dataset.id);
        if (selectedProd) {
            // Update quantity
            if (selectedProd.quantity > 0) {
                selectedProd.quantity--;
            }
            updateQty.forEach(td => {
                td.innerText = selectedProd.quantity;
            })
            caddyList();
        } else {
            fetch(`/products/${selectedProdId}`, myInit)
                .then(response => response.json())
                .then(response => {
                    if (response[0].quantity > 0) {
                        response[0].quantity--;
                    }
                    cart.push(response[0]);

                    updateQty.forEach(td => {
                        td.innerText = response[0].quantity;
                    })
                    caddyList();
                })
                .catch(error => alert("Erreur : " + error));
        }
    } else {
        fetch(`/products/${selectedProdId}`, myInit)
            .then(response => response.json())
            .then(response => {
                if (response[0].quantity > 0) {
                    response[0].quantity--;
                }
                cart.push(response[0]);
                updateQty.forEach(td => {
                    td.innerText = response[0].quantity;
                })
                caddyList();
            })
            .catch(error => alert("Erreur : " + error));
    }
}

/**
 * Function to alert a confirm box and a message to validate command
 */
function submitCmd() {
    let validation = confirm("Valider vote commande. Êtes-vous sûr?");
    if (validation) {
        alert("Ok, votre commande a bien été validée!\nMerci d'avoir commandé des produits fictifs sur notre boutique virtuelle!");
    }
}


// Add event listener on each button
(document.querySelector('#showAllProducts')).addEventListener('click', displayProducts);
(document.querySelector('#showCart')).addEventListener('click', caddyList);
(document.querySelector('#submitCmd')).addEventListener('click', submitCmd);