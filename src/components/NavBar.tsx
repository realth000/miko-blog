export default function NavBar() {
  return (
    <header className="h-nav-bar-height fixed top-0 right-0 left-0 flex border-b border-gray-700 bg-black/90 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="mr-auto ml-0 flex max-w-6xl items-center justify-between gap-6">
        <div className="shrink-0">
          <a href="/">NavBar Title Link</a>
        </div>
      </div>
      <div className="flex gap-2">
        <a href="#/articles">Articles</a>
        <a href="#/projects">Projects</a>
        <a href="#/about">About</a>
      </div>
    </header>
  )
}
