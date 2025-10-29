import { Link } from "react-router"
import { Button } from "../ui/button"
import CreatePost from "../create-post"
import { useCreatePost } from "@/hooks/use.create-post"

function Navbar() {
    const { onOpen } = useCreatePost()
    return (
        <>
            <div className="w-full h-24 bg-gray-800 fixed inset-0">
                <div className="w-full h-full flex justify-between items-center ">
                    <Link className="flex items-center justify-center gap-2 ml-2" to={"/"}>
                        <img src={'/logo.svg'} />
                        <p className="font-bold text-4xl text-white">Sammi</p>
                    </Link>
                    <div className="flex gap-2 mr-2">
                        <Button className="rounded-full font-bold" size={"lg"} variant={"outline"} onClick={onOpen}>
                            Create post
                        </Button>
                        <Link to={"/auth"}>
                            <Button className={"rounded-full font-bold "} size={"lg"}>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <CreatePost />
        </>
    )
}

export default Navbar