import { Link } from "react-router"
import { Button } from "../ui/button"

function Navbar() {
    return (
        <>
            <div className="w-full h-24 bg-gray-900 fixed inset-0">
                <div className="w-full h-full flex justify-between items-center container">
                    <div className="flex items-center justify-center gap-2 ml-2">
                        <img src={'/logo.svg'} />
                        <p className="font-bold text-4xl">Sammi</p>
                    </div>
                    <div className="flex gap-2">
                        <Button className="rounded-full font-bold" size={"lg"} variant={"outline"}>
                            Create post
                        </Button>
                        <Link to={"/auth"}>
                            <Button className={"rounded-full font-bold "} size={"lg"}>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar