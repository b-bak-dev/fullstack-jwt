const prod = {
	url: {
		BASE_URL: 'https://bartlomiejbak.com',
		AUTH_URL: 'https://bartlomiejbak.com/auth'
	}
}

const dev = {
	url: {
		BASE_URL: 'http://localhost:8080',
		AUTH_URL: 'http://localhost:8080/auth'
	}
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod