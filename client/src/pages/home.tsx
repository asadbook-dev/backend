import PostCard, { } from "@/components/cards/post.card"
import ComfirmModal from "@/components/modals/confirm.modal"
import PostLoading from "@/components/shared/post-loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import $axios from "@/http"
import type { IPost } from "@/interfaces"
import { postStore } from "@/store/post.store"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle } from "lucide-react"

function Home() {
    const { setPosts, posts } = postStore()
    const { data, isLoading, error } = useQuery({
        queryKey: ["get-posts"],
        queryFn: async () => {
            const { data } = await $axios.get("/post/get-all")
            setPosts(data)
            return data
        }
    })
    return (
        <>
            <div className="container mx-auto p-4 max-w-4xl mt-28">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error?.message}</AlertDescription>
                    </Alert>
                )}
                <div className="grid grid-cols-3 gap-4">
                    {isLoading && Array.from({ length: 6 }).map((_, idx) => <PostLoading key={idx} />)}
                    {posts?.map((post: IPost) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>

            <ComfirmModal />
        </>
    )
}

export default Home