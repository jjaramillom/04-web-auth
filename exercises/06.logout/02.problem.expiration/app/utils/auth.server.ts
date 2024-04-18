import bcrypt from 'bcryptjs'

export { bcrypt }

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30 // 30 days

export function getSessionExpirationDate() {
	return new Date(Date.now() + SESSION_EXPIRATION_TIME)
}

// 🐨 create a SESSION_EXPIRATION_TIME variable here
// 🐨 export a simple function that returns a new date that's the current time plus the SESSION_EXPIRATION_TIME
