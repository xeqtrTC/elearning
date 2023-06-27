import { Link } from "react-router-dom"

const NavigationButtons = ({linkTo, nameOfButton}: {linkTo: string, nameOfButton: string}) => {
    return (
        <Link to={`/${linkTo}`}>
            <button className="inputEditUserButton">{nameOfButton}</button>
        </Link>
    )
}

export default NavigationButtons