/**
 * Error screen that renders error message.
 *
 * @param message The error messag to display
 */
export default function RenderError({ message }: { readonly message: string }) {
  return (
    <div className="m-2 bg-red-500 p-2 text-xl text-yellow-500">
      Render error: {message}
    </div>
  )
}
