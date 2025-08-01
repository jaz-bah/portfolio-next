"use client"

import { addProject } from "@/actions/project.action"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { IAddProjectPayload } from "@/types/project.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import RichTextEditor from "../editor/RichTextEditor"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    short_description: z.string().max(100, {
        message: "Description must be at most 100 characters.",
    }),
    tags: z.array(z.string()),
    live_url: z.string().url(),
    github_url: z.string().url(),
    pc_preview: z.instanceof(File),
    mobile_preview: z.instanceof(File),
    description: z.string().max(10000, {
        message: "Description must be at most 10000 characters.",
    }),
    features: z.string().max(10000, {
        message: "Description must be at most 10000 characters.",
    }),
    tools: z.string().max(10000, {
        message: "Description must be at most 10000 characters.",
    }),

})

export function AddProjectForm() {
    const queryClient = useQueryClient();

    // refer
    const mobilePreviewRef = useRef<HTMLInputElement>(null);
    const pcPreviewRef = useRef<HTMLInputElement>(null);

    // states
    const [newTags, setNewTags] = useState<string[]>([]);
    const [tab, setTab] = useState<string>("description");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobilePreview, setMobilePreview] = useState<string | null>(null);
    const [pcPreview, setPcPreview] = useState<string | null>(null)


    // initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            short_description: "",
            tags: newTags,
            live_url: "",
            github_url: "",
            pc_preview: undefined,
            mobile_preview: undefined,
            description: "",
            features: "",
            tools: "",
        },
    });


    // add project mutation
    const addProjectMutation = useMutation({
        mutationFn: (payload: IAddProjectPayload) => addProject(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success("Project added successfully")
            resetForm();
        },
        onError: () => {
            toast.error("Failed to add project");
            resetForm();
        },
    });


    // submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        addProjectMutation.mutate(values);
    };

    // reset form
    const resetForm = () => {
        form.reset();
        setNewTags([]);
        setTab("description");
        form.setValue("description", "");
        form.setValue("features", "");
        form.setValue("tools", "");

        if (mobilePreviewRef.current && pcPreviewRef.current) {
            mobilePreviewRef.current.value = "";
            pcPreviewRef.current.value = "";
        }

        setMobilePreview(null);
        setPcPreview(null);

        setIsSubmitting(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2 lg:col-span-2 flex flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex flex-col-reverse lg:flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="live_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Live URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex flex-col gap-y-5">
                            <FormField
                                control={form.control}
                                name="mobile_preview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile Preview</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Mobile Preview"
                                                ref={mobilePreviewRef}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file);
                                                    if (file) {
                                                        setMobilePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {mobilePreview && (
                                <div className="w-full h-60 bg-accent border rounded-2xl p-2">
                                    <Image
                                        className="rounded-lg h-full w-auto object-cover m-auto"
                                        src={mobilePreview}
                                        height={500}
                                        width={500}
                                        alt={"mobile_preview"}
                                    />
                                </div>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="short_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={1} placeholder="Short Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="github_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Github URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Github URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-y-5">
                            <FormField
                                control={form.control}
                                name="pc_preview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PC Preview</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="PC Preview"
                                                ref={pcPreviewRef}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file);

                                                    if (file) {
                                                        setPcPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {pcPreview && (
                                <div className="w-full h-60 bg-accent border rounded-2xl p-2">
                                    <Image
                                        className="rounded-lg h-full w-auto object-cover m-auto"
                                        src={pcPreview}
                                        height={500}
                                        width={500}
                                        alt={"pc_preview"}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Tag Selector */}
                        <div className="flex flex-col gap-y-2">
                            <FormLabel>Add Tags</FormLabel>
                            <Input
                                className="w-full"
                                placeholder="Add tag"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        if (e.currentTarget.value !== "") {
                                            setNewTags([...newTags, e.currentTarget.value]);
                                            form.setValue("tags", [...newTags, e.currentTarget.value]);
                                            e.currentTarget.value = ""
                                        }
                                    }
                                }}
                            />

                            <ul className="flex flex-wrap w-full">
                                {newTags.map((tag, index) => (
                                    <li key={index} className="flex items-center mr-2 mb-2">
                                        <Badge variant="outline" className="user-select-none">
                                            {tag}

                                            <span
                                                className="cursor-pointer pointer-events-auto"
                                                onClick={() => setNewTags(newTags.filter((_, i) => i !== index))}
                                            >
                                                <X className="ml-1 h-4 w-4" />
                                            </span>
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-2 flex flex-col gap-y-5">
                        <ToggleGroup className="w-full flex border-accent border-1" type="single" defaultValue={tab} onValueChange={(value: string) => setTab(value)}>
                            <ToggleGroupItem value="description">Description</ToggleGroupItem>
                            <ToggleGroupItem value="features">Features</ToggleGroupItem>
                            <ToggleGroupItem value="tools">Tools</ToggleGroupItem>
                        </ToggleGroup>

                        {tab === "description" && (
                            <RichTextEditor
                                value={form.getValues("description")}
                                onChange={(value: string) => form.setValue("description", value)}
                            />
                        )}

                        {tab === "features" && (
                            <RichTextEditor
                                value={form.getValues("features")}
                                onChange={(value: string) => form.setValue("features", value)}
                            />
                        )}

                        {tab === "tools" && (
                            <RichTextEditor
                                value={form.getValues("tools")}
                                onChange={(value: string) => form.setValue("tools", value)}
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={!form.formState.isValid || isSubmitting}>
                        {isSubmitting ? (
                            <>
                                Uploading
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            </>
                        ) : "Upload"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
