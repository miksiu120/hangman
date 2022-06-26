const btn = document.querySelector('.setPasswordButton')
const password = document.querySelector('input')
const form = document.querySelector('form')
const gameWindow = document.querySelector('.gameWindow')
let guessingWord = document.querySelector('.guessingWord')
const guessingBtn = document.querySelector('.guessingButton')
const guessingLetterLabel = document.querySelector('.inputSpace input')
let lives = document.querySelector('.lives')
const shadow = document.querySelector('.shadow')
const winScreen = document.querySelector('.win')
const loseScreen = document.querySelector('.lose')
const randomBtn = document.querySelector('.setRandomPassword')
const URL = 'https://random-word-api.herokuapp.com/word'
const againBtn = document.querySelector('.againBtn')
const losePassword = document.querySelector('.password')
const usedLetters = document.querySelector('.usedLetters2')
let realPassword
let passwordLength

const createGuessingWord = () => {
	for (let i = 0; i < passwordLength; i++) {
		guessingWord.textContent += '_'
	}
}

const supplyBranches = x => {
	//let guessWord = guessingWord.textContent
	for (let i = 0; i < passwordLength; i++) {
		if (realPassword[i] == x) {
			let localPassword = guessingWord.textContent
			localPassword = localPassword.substring(0, i) + x + localPassword.substring(i + 1, passwordLength)
			guessingWord.textContent = localPassword
		}
	}
	console.log(guessingWord)
}

const showWinScreen = () => {
	shadow.style.display = 'flex'
	winScreen.style.display = 'block'
}

const showLoseScreen = () => {
	shadow.style.display = 'flex'
	loseScreen.style.display = 'block'
	losePassword.textContent = realPassword
}

btn.addEventListener('click', () => {
	realPassword = password.value.toUpperCase()
	passwordLength = realPassword.length
	if (passwordLength == 0) {
		alert('Podaj slowo !')
	} else {
		form.style.display = 'none'
		gameWindow.style.display = 'flex'
		createGuessingWord()
	}
})
randomBtn.addEventListener('click', () => {
	fetch(URL)
		.then(response => response.json())
		.then(data => {
			console.log(data[0])
			realPassword = data[0].toUpperCase()
			passwordLength = realPassword.length
			form.style.display = 'none'
			gameWindow.style.display = 'flex'
			createGuessingWord()
		})
		.catch(error => {
			console.error('błąd')
		})
})

guessingBtn.addEventListener('click', () => {
	let letter = guessingLetterLabel.value.toUpperCase()
	console.log(letter)
	if (!usedLetters.textContent.includes(letter)) {
		usedLetters.textContent += letter + ', '
	}
	if (realPassword.includes(letter)) {
		supplyBranches(letter)
		console.log(guessingWord.textContent + ' ' + realPassword)
		if (guessingWord.textContent == realPassword) {
			showWinScreen()
		}
	} else {
		lives.textContent = parseInt(lives.textContent) - 1
		if (lives.textContent == '0') {
			showLoseScreen()
		}
	}
	guessingLetterLabel.value = ''
})

againBtn.addEventListener('click', () => {
	form.style.display = 'flex'
	gameWindow.style.display = 'none'
	password.value = ''
	shadow.style.display = 'none'
	createGuessingWord()
	realPassword = ''
	passwordLength = 0
	guessingWord.textContent = ''
	winScreen.style.display = 'none'
	loseScreen.style.display = 'none'
	losePassword.textContent = ''
	usedLetters.textContent = ''
	lives.textContent = 7
})
