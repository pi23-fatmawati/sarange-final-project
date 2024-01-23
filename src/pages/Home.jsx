// import NavbarSarange from "../components/Navbar-sarange";
import Home from '../assets/home.png'

export default function HomePage() {
    return (
        <>
            {/* <NavbarSarange></NavbarSarange> */}
            <div className="home">
                <div className="img-home rounded mt-20">
                    <img className="w-full " src={Home} alt="image home" />
                </div>
            </div>
        </>
    )
}