// Password toggle functionality
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const icon = input.nextElementSibling.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// Login form handling
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (email && password) {
        // Simulate login success
        alert("Login successful! Redirecting to dashboard...")
        window.location.href = "dashboard.html"
      } else {
        alert("Please fill in all fields")
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const firstName = document.getElementById("firstName").value
      const lastName = document.getElementById("lastName").value
      const email = document.getElementById("registerEmail").value
      const password = document.getElementById("registerPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const terms = document.getElementById("terms").checked

      // Validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      if (!terms) {
        alert("Please agree to the terms and conditions")
        return
      }

      // Simulate registration success
      alert("Registration successful! Redirecting to dashboard...")
      window.location.href = "dashboard.html"
    })
  }
})

// Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")
  const sidebarOverlay = document.getElementById("sidebarOverlay")

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.add("open")
      sidebarOverlay.classList.add("active")
    })
  }

  // Sidebar close button
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.remove("open")
      sidebarOverlay.classList.remove("active")
    })
  }

  // Overlay click to close sidebar
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("open")
      sidebarOverlay.classList.remove("active")
    })
  }

  // Navigation link active state
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Close mobile sidebar
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open")
        sidebarOverlay.classList.remove("active")
      }
    })
  })
})

// Logout functionality
function logout() {
  if (confirm("Are you sure you want to sign out?")) {
    alert("Logged out successfully!")
    window.location.href = "index.html"
  }
}

// Responsive sidebar handling
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar")
  const sidebarOverlay = document.getElementById("sidebarOverlay")

  if (window.innerWidth > 768) {
    if (sidebar) {
      sidebar.classList.remove("open")
    }
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("active")
    }
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePassword(password) {
  return password.length >= 6
}

// Add loading states to buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.textContent
  button.textContent = text
  button.disabled = true

  return function removeLoadingState() {
    button.textContent = originalText
    button.disabled = false
  }
}

// Toast notification system
function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  // Add toast styles
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  // Set background color based on type
  switch (type) {
    case "success":
      toast.style.backgroundColor = "#10b981"
      break
    case "error":
      toast.style.backgroundColor = "#ef4444"
      break
    case "warning":
      toast.style.backgroundColor = "#f59e0b"
      break
    default:
      toast.style.backgroundColor = "#2563eb"
  }

  document.body.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}
