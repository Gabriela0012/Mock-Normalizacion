
Swal.fire({
    title: 'Hola',
    text: 'Esta a un paso para agregar los productos que desea',
    allowOutsideClick: false,
    allowEscapeKey: false
})


const inputEmail = document.getElementById('email')
const inputName = document.getElementById('name')
const inputLastName = document.getElementById('last_name')
const inputAge = document.getElementById('age')
const inputNickname = document.getElementById('nickname')
const inputAvatar = document.getElementById('avatar')
const button = document.getElementById('btnSubmit')


button.addEventListener('click', (e) => {
  e.preventDefault()
	let email = inputEmail.value
  let name = inputName.value
  let last_name = inputLastName.value
  let age = inputAge.value
  let nickname = inputNickname.value
  let avatar = inputAvatar.value
	console.log(email)
	
	fetch('/api/users', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
  		name,
  		last_name,
  		age,
 		 	nickname,
 			avatar,
		}),
	})

	location.href = 'http://localhost:8080/products'

})
