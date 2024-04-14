// 🐨 you're going to need the cookie module here:
import * as cookie from 'cookie'

export type Theme = 'light' | 'dark'

// 🦉 The default for us will be 'light', so if we can't determine the theme,
// then you'll want to return 'light'
const DEFAULT_THEME: Theme = 'light'
const COOKIE_NAME = 'theme'

export function getTheme(request: Request): Theme {
	const cookieHeader = request.headers.get('cookie')
	if (cookieHeader === null) return DEFAULT_THEME
	const cookieValue = cookie.parse(cookieHeader)[COOKIE_NAME]
	if (cookieValue === 'light' || cookieValue === 'dark')
		return cookieValue
	// 🐨 get the cookie header from the request
	// 🐨 if the cookie header is `null`, return the default
	// 🐨 parse the cookie header
	// 🐨 get the value for the cookie called 'theme'
	// 🐨 if the value is a valid cookie value, return it, otherwise return the default
	return 'light'
}

export function setTheme(theme: Theme) {
	return cookie.serialize(COOKIE_NAME, theme, { path: '/' })
	// 🐨 serialize the theme as a cookie called 'theme'
	// 💰 make sure to set the path to '/' so it applies to the entire site.
}
