// images
import logo from '../../assets/images/icons/logo-sm.png';
import searchIcon from '../../assets/images/icons/search-icon-sm.png'
import carsIcon from '../../assets/images/icons/cart-sm.png'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
	<div className="nav-wrapper fixed-top">
		<div className="container">
			<nav className="navbar navbar-toggleable-sm navbar-expand-md">
			    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".navbar-collapse">
			        ☰
			    </button>
			    <Link className="navbar-brand mx-auto" to="/"><img src={logo} /></Link>

			    <div className="navbar-collapse collapse">
			        <ul className="navbar-nav nav-justified w-100 nav-fill">
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/mac">Mac</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/iphones">iPhones</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/ipad">ipad</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/watch">watch</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/latest_videos">Videos</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/music">Music</Link></li>
						{/* The rate us page should reoute state component */}
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/rate_us">Rate us</Link></li>
						<li className="nav-item" ><Link className="nav-link js-scroll-trigger" to="/search"><img src={searchIcon} /></Link></li>
						<li className="nav-item"><Link  className="nav-link js-scroll-trigger" to="/cart"><img src={carsIcon} /></Link></li>
			        </ul>
			    </div>
			</nav>
		</div>
	</div>

    </>
  )
}

export default Header
