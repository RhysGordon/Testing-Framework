const assert = require('assert');
const render = require('../../render');

// Check if the HTML file has a text input
it('Has a text input', async () => {
    // Load index.html as HTML in Node
    const dom = await render('index.html');
    
    // Select the input element
    const input = dom.window.document.querySelector('input');

    // Check if input exists and throw an error if it does not exist
    assert(input);
});

// Check if correct message is shown when user enters a valid email address and clicks submit
it('Shows a success message with a valid email', async () => {
    const dom = await render('index.html');

    const input = dom.window.document.querySelector('input');

    input.value = 'valid@email.com';

    // Fake a submit event on the form
    dom.window.document
      .querySelector('form')
      .dispatchEvent(new dom.window.Event('submit'));

    const h1 = dom.window.document.querySelector('h1')

    assert.strictEqual(h1.innerHTML, 'Email address is valid!')
});

// Check if correct message is shown when user enters an invalid email address and clicks submit
it('Shows error message with invalid email address', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');

  input.value = 'invalidEmailAddress';

  // Fake a submit event on the form
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1')

  assert.strictEqual(h1.innerHTML, 'Email address invalid! Please enter valid email address.1')
});