function validateLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Basic password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    
    // In a real application, you would send this to a server
    // For demo purposes, we'll just simulate a successful login
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../profile.html';
    return false;
}

function validateRegistration(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Name validation
    if (name.length < 2) {
        alert('Name must be at least 2 characters long');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    
    // Confirm password
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }
    
    // In a real application, you would send this to a server
    // For demo purposes, we'll just simulate a successful registration
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../profile.html';
    return false;
} 