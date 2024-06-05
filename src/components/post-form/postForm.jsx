import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import FRInput from "../Input";
import RTE from "../RTE";
import databaseService from "../../appwrite/database";
import FRSelect from "../Select";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // to submit form
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await databaseService.uploadFile(data.image[0])
        : null;
      if (file) {
        databaseService.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.slug}`);
      }
    }
    const file = await databaseService.uploadFile(data.image[0]);
    if (file) {
      const fileId = file.$id;
      data.featuredImage = fileId;
      const dbPost = await databaseService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+g/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    // value -> all the values which we can have in a form, so i am gonna pick name variable
    watch((value, { name }) => {
      // watch will constantly monitor inputs
      // from the register it will watch input whose name is title
      if (name === "title") {
        // here we will set slug value
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    // higher order furnction
    // handleSubmit will validate our input before invoking submit
    <form action="" onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {/* we need to register our input in hooks by invoking the register function    */}
        <FRInput
          label="Title"
          placeholder="Title"
          className="mb-4"
          // not this input is registered as title
          {...register("title", { required: true })}
        />
        <FRInput
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          // as soon as we have input setValue == slug
          onInput={(e) =>
            setValue("slug", slugTransform(e.currenttarget.value), {
              required: true,
            })
          }
        />
        {/* this control helps react form to take control of 3rd party inputs */}
        <RTE
          label="Content"
          name="Content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="1/3 px-2">
        <FRInput
          label="Featured Image"
          type="File"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.previewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <FRSelect
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="Submit"
          bgColor={post ? "bg-green-200" : "bg-red-200"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
