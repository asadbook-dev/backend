import { useConfirm } from "@/hooks/use.confirm"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import $axios from "@/http"
import { postStore } from "@/store/post.store"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { AlertCircle } from "lucide-react"
import FillLoading from "../shared/fill-loading"

function ComfirmModal() {
    const { isOpen, onClose, post } = useConfirm()
    const { setPosts, posts } = postStore()


    const { mutate, error, isPending } = useMutation({
        mutationKey: ["delete-post"],
        mutationFn: async () => {
            const { data } = await $axios.delete(`/post/delete/${post._id}`)

            return data
        },
        onSuccess: data => {
            const newData = posts.filter(c => c._id !== data._id)
            setPosts(newData)
            onClose()
        }
    })
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error?.message}</AlertDescription>
                    </Alert>
                )}
                {isPending && (<FillLoading />)}
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ComfirmModal