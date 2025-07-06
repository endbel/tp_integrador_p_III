// Import axios
import axios from "axios"

// Configuration
const API_BASE_URL = "/api"

// Set up CSRF token for axios
axios.defaults.headers.common["X-CSRF-TOKEN"] = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content")

// Navigation and Profile functions
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profile-dropdown")
  dropdown.classList.toggle("hidden")
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    // Implement actual logout logic
    window.location.href = "/logout"
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("profile-dropdown")
  const button = event.target.closest("button")

  if (!button || !button.onclick || button.onclick.toString().indexOf("toggleProfileDropdown") === -1) {
    dropdown.classList.add("hidden")
  }
})

// Table display functions
function showTable(type) {
  // Hide all sections
  document.getElementById("default-message").classList.add("hidden")
  document.getElementById("products-section").classList.add("hidden")
  document.getElementById("orders-section").classList.add("hidden")

  // Show selected section
  if (type === "products") {
    document.getElementById("products-section").classList.remove("hidden")
    loadProducts()
    setupProductsFilters()
  } else if (type === "orders") {
    document.getElementById("orders-section").classList.remove("hidden")
    loadOrders()
    setupOrdersFilters()
  }
}

// Products functions
async function loadProducts(filters = {}) {
  try {
    const params = new URLSearchParams(filters)
    const response = await axios.get(`${API_BASE_URL}/products?${params}`)
    const products = response.data.products || response.data

    const productsHtml = products
      .map(
        (product) => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${product.name}</div>
                        <div class="text-sm text-gray-500">${product.description || ""}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.sku}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 capitalize">${product.category}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${Number.parseFloat(product.price).toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full ${product.stock_quantity <= 10 ? "bg-red-600 text-red-900 font-medium" : "bg-gray-100 text-gray-800"}">${product.stock_quantity}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full ${product.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                        ${product.status ? "Active" : "Inactive"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
            </tr>
        `,
      )
      .join("")

    document.getElementById("products-table").innerHTML = productsHtml
  } catch (error) {
    console.error("Error loading products:", error)
    showNotification("Error loading products", "error")
  }
}

// Orders functions
async function loadOrders(filters = {}) {
  try {
    const params = new URLSearchParams(filters)
    const response = await axios.get(`${API_BASE_URL}/orders?${params}`)
    const orders = response.data.orders || response.data

    const ordersHtml = orders
      .map(
        (order) => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.order_number}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${order.customer_name}</div>
                        <div class="text-sm text-gray-500">${order.customer_email}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${Number.parseFloat(order.total_amount).toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}">${order.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">${order.payment_method.replace("_", " ")}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(order.created_at).toLocaleDateString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="viewOrder(${order.id})" class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button onclick="editOrder(${order.id})" class="text-green-600 hover:text-green-900">Edit</button>
                </td>
            </tr>
        `,
      )
      .join("")

    document.getElementById("orders-table").innerHTML = ordersHtml
  } catch (error) {
    console.error("Error loading orders:", error)
    showNotification("Error loading orders", "error")
  }
}

// Filter setup functions
function setupProductsFilters() {
  const searchInput = document.getElementById("products-search")
  const categorySelect = document.getElementById("products-category")
  const priceSelect = document.getElementById("products-price")

  const applyFilters = () => {
    const filters = {
      search: searchInput.value,
      category: categorySelect.value,
      price_range: priceSelect.value,
    }
    loadProducts(filters)
  }

  searchInput.addEventListener("input", debounce(applyFilters, 300))
  categorySelect.addEventListener("change", applyFilters)
  priceSelect.addEventListener("change", applyFilters)
}

function setupOrdersFilters() {
  const searchInput = document.getElementById("orders-search")
  const statusSelect = document.getElementById("orders-status")
  const dateInput = document.getElementById("orders-date")
  const paymentSelect = document.getElementById("orders-payment")

  const applyFilters = () => {
    const filters = {
      search: searchInput.value,
      status: statusSelect.value,
      date: dateInput.value,
      payment_method: paymentSelect.value,
    }
    loadOrders(filters)
  }

  searchInput.addEventListener("input", debounce(applyFilters, 300))
  statusSelect.addEventListener("change", applyFilters)
  dateInput.addEventListener("change", applyFilters)
  paymentSelect.addEventListener("change", applyFilters)
}

// Dashboard stats
async function loadDashboardStats() {
  try {
    const response = await axios.get("/api/dashboard/stats")
    const stats = response.data

    document.getElementById("total-products").textContent = stats.total_products
    document.getElementById("total-orders").textContent = stats.total_orders
  } catch (error) {
    console.error("Error loading dashboard stats:", error)
  }
}

// Modal functions
function showAddProductModal() {
  document.getElementById("add-product-modal").classList.remove("hidden")
}

function hideAddProductModal() {
  document.getElementById("add-product-modal").classList.add("hidden")
  document.getElementById("add-product-form").reset()
}

function showAddOrderModal() {
  showNotification("Order creation feature coming soon!", "info")
}

// Utility functions
function getStatusColor(status) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

async function editProduct(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`)
    const product = response.data

    // Populate form with product data
    const form = document.getElementById("add-product-form")
    form.querySelector('[name="name"]').value = product.name
    form.querySelector('[name="sku"]').value = product.sku
    form.querySelector('[name="category"]').value = product.category
    form.querySelector('[name="price"]').value = product.price
    form.querySelector('[name="stock_quantity"]').value = product.stock_quantity
    form.querySelector('[name="description"]').value = product.description || ""

    // Change form action to update
    form.dataset.productId = id
    form.dataset.action = "update"

    document.querySelector("#add-product-modal h3").textContent = "Edit Product"
    document.querySelector('#add-product-modal button[type="submit"]').textContent = "Update Product"

    showAddProductModal()
  } catch (error) {
    console.error("Error loading product:", error)
    showNotification("Error loading product details", "error")
  }
}

async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`)
      loadProducts()
      loadDashboardStats()
      showNotification("Product deleted successfully!", "success")
    } catch (error) {
      console.error("Error deleting product:", error)
      showNotification("Error deleting product", "error")
    }
  }
}

function viewOrder(id) {
  showNotification(`View order ${id} - Feature coming soon!`, "info")
}

function editOrder(id) {
  showNotification(`Edit order ${id} - Feature coming soon!`, "info")
}

// Form submission
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const productData = Object.fromEntries(formData.entries())

  try {
    const isUpdate = e.target.dataset.action === "update"
    const productId = e.target.dataset.productId

    if (isUpdate) {
      await axios.put(`${API_BASE_URL}/products/${productId}`, productData)
      showNotification("Product updated successfully!", "success")
    } else {
      await axios.post(`${API_BASE_URL}/products`, productData)
      showNotification("Product added successfully!", "success")
    }

    hideAddProductModal()
    loadProducts()
    loadDashboardStats()

    // Reset form state
    e.target.dataset.action = ""
    e.target.dataset.productId = ""
    document.querySelector("#add-product-modal h3").textContent = "Add New Product"
    document.querySelector('#add-product-modal button[type="submit"]').textContent = "Add Product"
  } catch (error) {
    console.error("Error saving product:", error)
    showNotification("Error saving product", "error")
  }
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
        ? "bg-red-500 text-white"
        : type === "warning"
          ? "bg-yellow-500 text-white"
          : "bg-blue-500 text-white"
  }`
  notification.textContent = message

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Initialize dashboard on page load
document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats()
})
