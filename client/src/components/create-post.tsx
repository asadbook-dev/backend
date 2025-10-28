import { useCreatePost } from "@/hooks/use.create-post"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import { useForm } from "react-hook-form"
import type z from "zod"
import { postSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useState, type ChangeEvent } from "react"
import $axios from "@/http"
import { toast } from "sonner"

const CreatePost = () => {
    const [picture, setPicture] = useState<File | null>(null)
    const { isOpen, onClose } = useCreatePost()

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            body: ""
        },
    })

    function onFIleChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0]
        setPicture(file as File)
    }

    function onSubmit(values: z.infer<typeof postSchema>) {
        if (!picture) return null

        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("body", values.body)
        formData.append("picture", picture)

        const promise = $axios.post("/post/create", formData).then(res => console.log(res))

        toast.promise(promise, {
            loading: "Loading",
            success: "Successfully created",
            error: "Something went wrong!"
        })

    }
    const { isSubmitting } = form.formState

    return <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Create a post</SheetTitle>
                <SheetDescription>
                    Write what is your mind                </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" className="bg-secondary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="In this article you can improve..." className="bg-secondary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" className="bg-secondary" onChange={onFIleChange} />
                        </div>
                        <Button type="submit" disabled={isSubmitting} >Submit</Button>
                    </form>
                </Form>
            </div>

        </SheetContent>
    </Sheet>
}

export default CreatePost