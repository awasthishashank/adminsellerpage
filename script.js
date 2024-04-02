// Function to render products
function renderProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    // Fetch products from the API
    axios.get('https://crudcrud.com/api/4e12491bb6dc47e1a96a5995d300e918/productdata')
        .then(response => {
            const products = response.data;
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>RS - ${product.price}</td>
                    <td><button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to add product
function addProduct() {
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const sellingPrice = document.getElementById('sellingPrice').value;

    if (productName && category && sellingPrice) {
        const newProduct = {
            name: productName,
            category: category,
            price: parseFloat(sellingPrice)
        };

        // Send POST request to add product
        axios.post('https://crudcrud.com/api/4e12491bb6dc47e1a96a5995d300e918/productdata', newProduct)
            .then(() => {
                renderProducts(); // Update product list
                // Clear input fields after adding the product
                document.getElementById('productName').value = '';
                document.getElementById('sellingPrice').value = '';
            })
            .catch(error => console.error('Error adding product:', error));
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to delete product
function deleteProduct(productId) {
    // Send DELETE request to delete product
    axios.delete(`https://crudcrud.com/api/4e12491bb6dc47e1a96a5995d300e918/productdata/${productId}`)
        .then(() => {
            renderProducts(); // Update product list
        })
        .catch(error => console.error('Error deleting product:', error));
}

// Initial rendering
renderProducts();
