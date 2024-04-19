import { type DataFunctionArgs, json } from '@remix-run/node'
import { requireUser } from '#app/utils/auth.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { action, NoteEditor } from './__note-editor.tsx'

// 🐨 add a loader here that requires the user and checks that the user.username
// is equal to params.username. If not, then throw a 403 response
// 💰 you can use invariantResponse for this.
// 🐨 Return json({}) because Remix requires loaders return something.

async function loader({ request, params }: DataFunctionArgs) {
	const user = await requireUser(request)
	invariantResponse(user.username === params.username, 'No access granted', {
		status: 403,
	})
	return json({})
}

export { action, loader }
export default NoteEditor
