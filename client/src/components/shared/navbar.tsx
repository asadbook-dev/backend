import { Link } from "react-router"
import { Button } from "../ui/button"
import CreatePost from "../create-post"
import { useCreatePost } from "@/hooks/use.create-post"
import { authStore } from "@/store/auth.store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

function Navbar() {
    const { onOpen } = useCreatePost()
    const { isAuth, user } = authStore()
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
                        {
                            isAuth ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="line-clamp-1">{user.email}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : <Link to={"/auth"}>
                                <Button className={"rounded-full font-bold "} size={"lg"}>Login</Button>
                            </Link>
                        }

                    </div>
                </div>
            </div>
            <CreatePost />
        </>
    )
}

export default Navbar