
const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};
    for( let el of miFormulario.elements ){
        if( el.name.length > 0 )  formData[el.name] = el.value;
    }

    // fetch 
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
    }).then( response => response.json() )
      .then( async ({ token }) => {
        localStorage.setItem('token', token)
        window.location = ('/chat.html');
      })
      .catch( err => console.error(err) );

});


async function handleCredentialResponse(response) {
    // Google token : id token
   /* console.log('id_token',response.credential); */

   const body = {id_token: response.credential};

    fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then( ({ token }) => {
            localStorage.setItem('token', token)
            window.location = ('/chat.html');
        })
        .catch(console.warn);
}

const button = document.getElementById("google_signout")
button.onclick= () => {
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke( localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    })
}