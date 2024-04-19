import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { NoteEditor, action } from './__note-editor.tsx'

export { action }

export async function loader({ params, request }: DataFunctionArgs) {
	const user = await requireUser(request)
	invariantResponse(user.username === params.username, 'No access granted', {
		status: 403,
	})

	// 🐨 require the user and check that the user.username is equal to params.username.
	// If not, then throw a 403 response
	// 💰 you can use invariantResponse for this.
	const note = await prisma.note.findFirst({
		select: {
			id: true,
			title: true,
			content: true,
			images: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
		where: {
			id: params.noteId,
			ownerId: user.id,
			// 🐨 you can switch this to: "ownerId: user.id" which should make the
			// query more efficient.
		},
	})
	invariantResponse(note, 'Not found', { status: 404 })
	return json({ note })
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()

	return <NoteEditor note={data.note} />
}
