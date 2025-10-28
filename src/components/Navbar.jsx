import styles from "./styles/Navbar.module.css"
import { FaHome, FaGear } from "react-icons/fa";

export default Navbar = () => {
    return(
        <>
            <nav>
                <ul>
                    <li><FaHome/></li>
                    <li>Téléchargement</li>
                    <li><FaGear/></li>
                    <li>Contribution</li>
                    <li>Nous contacter</li>
                </ul>
            </nav>
        </>
    )
}