const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=> {
	//Prevent default flash the browser
	e.preventDefault()
	const location = search.value

	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	fetch('/weather?address='+location).then((res) => {
		res.json().then((data)=> {
			if(data.err) {
				messageOne.textContent = data.err
			} else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
			}
		})
	})
})
