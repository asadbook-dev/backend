import type { IPost } from "@/interfaces"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { API_URL } from "@/http"
import { Button } from "../ui/button"
import { useConfirm } from "@/hooks/use.confirm"

const PostCard = ({ post }: { post: IPost }) => {
    const { onOpen, setPost } = useConfirm()
    const onDelete = () => {
        onOpen()
        setPost(post)
    }
    return (
        <Card className="pt-0">
            <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md" />
            <CardContent className="mt-2">
                <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
                <p className="line-clamp-2 mt-1 text-muted-foreground text-sm ">{post.body}</p>
            </CardContent>
            <CardFooter className="gap-2">
                <Button className="flex-1">Edit</Button>
                <Button className="flex-1" variant={"destructive"} onClick={onDelete}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default PostCard