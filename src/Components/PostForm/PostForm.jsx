import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.$id || "",
            content:post?.content || "",
            status:post?.status || "active",
        }
    });

     const navigate = useNavigate()
     const userData = useSelector(state => state.auth.userData);
     const submit = async(data) => {
        if(post) {
         const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]): null;
         if(file){
            appwriteService.deleteFile(post.featuredimage)
         }
         const dbPost = await appwriteService.updatePost(post.$id,{
            ...data,
            featuredimage:file?file.$id:undefined,});
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }else{
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userid:userData.$id
                });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
     };

     const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
           
            return "";
        
    },[]);
     React.useEffect(() => {
        const subscription = watch((value,{name})=>{
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
     },[watch,slugTransform,setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
    <label className='block text-gray-900 text-2xl font-mono mb-2'>Title :</label>
        <Input
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <label className='block text-gray-900 text-2xl font-mono mb-2'>Slug :</label>
        <Input
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <label className='block text-gray-900 text-2xl font-mono mb-2'>Content :</label>
        <RTE  name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
    <label className='block text-gray-900 text-2xl font-mono mb-2'>Featured Image :</label>
        <Input
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredimage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-blue-950" : undefined} className="w-full text-2xl">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  );
}

