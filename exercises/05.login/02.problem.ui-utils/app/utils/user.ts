// 💰 bring in useRouteLoaderData from '@remix-run/react'
import { useRouteLoaderData } from '@remix-run/react'

// 🦺 you can make this type safe by importing the root loader type like this:
import { type loader as rootLoader } from '#app/root.tsx'

export const useOptionalUser = () => {
	const rootLoaderData = useRouteLoaderData<typeof rootLoader>('root')
	return rootLoaderData?.user ?? null
}

export const useUser = () => {
	const user = useOptionalUser()
	if (!user) {
		throw new Error('Route requires user to be logged in')
	}
}

// 🐨 create a useOptionalUser function which get's the root loader data and
// returns the user if it exists, otherwise return null.

// 🐨 create a useUser function which calls useOptionalUser and if the user
// does not exist, throws an error with an informative error message. Otherwise
// return the user
