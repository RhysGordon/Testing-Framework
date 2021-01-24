// Select the form, listen for submit and receive the event
document.querySelector('form').addEventListener('submit', (event) => {
    // Prevent the browser from trying to submit form
    event.preventDefault();
    
    // Take value from the input element
    const { value } = document.querySelector('input');

    const header = document.querySelector('h1');
    if (value.includes('@')) {
        header.innerHTML = 'Email address is valid!'

    } else {
        header.innerHTML = 'Email address invalid! Please enter valid email address.'
    }
})