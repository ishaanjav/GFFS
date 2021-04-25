import "./Header.css";
import SearchBar from "./SearchBar";
import logo from "./logo.png"

function Header() {
  return (<>

    <div className="header-2">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
      <nav className="">
        <div className="container px-2 mx-auto md:flex md:items-center bg-white">

          <div className="flex justify-between items-center">
            <img src={logo} style={{ width: 75 }} />
            <a href="#" style={{ fontFamily: "Roboto", fontSize: 25 }} className="font-bold text-xl">GFFS: A Global Flood Forecasting System</a>
          </div>

          <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
            <SearchBar></SearchBar>
          </div>
        </div>
        <div className="container px-0 bg-gray-100 mt-1 py-4 items-center">
          <div className="flex  items-center text-md">
            <div className="px-5 font-bold">
              <a href="#">
                Dashboard
              </a>
            </div>
            <div className="px-5 font-bold">
              <a href="#">
                Advanced Querying
            </a>
            </div>
            <div className="px-5 font-bold">
              <a href="#">
                Documentation
            </a>
            </div>
            <div className="px-5 font-bold">
              <a href="#">
                Data Sources
            </a>
            </div>
          </div>
        </div>
      </nav>
    </div>

  </>)
}

export default Header