export default function NavBar() {
  return (
    <header className='miko-nav-bar'>
      <div>
        <a href='/'>NavBar Title Link</a>
      </div>
      <div className='links-group'>
        <a href='#/articles'>Articles</a>
        <a href='#/projects'>Projects</a>
        <a href='#/about'>About</a>
      </div>
    </header>
  )
}
