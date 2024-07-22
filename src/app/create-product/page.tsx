"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import Resizer from "react-image-file-resizer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getMenuList } from "@/lib/menu-list";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { handleImageUpload } from "@/hooks/handleImageUpload";
import { Loader2 } from "lucide-react";

import { subcategoryToCategoryMap } from "@/components/admin-panel/menuSubCategory";
import axios from "axios";
import { uptimizeCloudinaryImage } from "@/hooks/imageCloudinaryOptimizer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import useUploadMutation from "@/hooks/useUploadMutation";
import { useAuth } from "@clerk/nextjs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { modulesObject } from "@/components/admin-panel/modules";
import { renderCategoryItems } from "@/components/admin-panel/renderCategoryItem";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  price: z.string().nonempty({ message: "Price is required." }),
  description: z.any(),
  image: z.string().nonempty({ message: "Image is required." }),
  category: z.string().nonempty({ message: "Category is required." }),
  subCategory: z.string(),
  blurImage: z.string().nonempty({ message: "blur Image string is required." })
});

export default function CreateProduct() {
  return (
    <React.Suspense>
      <ProductForm />
    </React.Suspense>
  );
}
function ProductForm() {
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const [quillIsFocus, setQuillIsFocus] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log;
  const url = "/routes/create-product";

  const {
    isPending: fetchEditIsPending,
    error: fetchEditIsError,
    data: fetchEditIsData,
    isSuccess: fetchEditIsSuccess
  } = useQuery({
    queryKey: [id],
    queryFn: () => axios(`/routes/fetchSingleProduct?productId=${id}`)
  });

  const { toast } = useToast();

  const { data, error, isSuccess, mutate, isPending } = useUploadMutation(url, [
    "newProduct",
    "featuredProduct"
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
      subCategory: ""
    }
  });

  const [editorContent, setEditorContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const beforeDivRef = useRef<HTMLDivElement>(null);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate(values);
  };
  useEffect(() => {
    isSuccess &&
      toast({
        description: id
          ? "Product updated successfully"
          : "Product created successfully"
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        24,
        24,
        "JPEG",
        30,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFetchingImage(true);
    const imageUrl = await handleImageUpload(e);
    const file = e.target.files?.[0] as File;
    const resizedImage: any = await resizeFile(file);

    form.setValue("blurImage", resizedImage.split(",")[1]);
    setImagePreview(imageUrl);
    setIsFetchingImage(false);
    form.setValue("image", imageUrl);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modules = useMemo(() => modulesObject, []);

  const editing = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    setEditorContent(content);
    form.setValue("description", content);
  };

  const handleQuillFocus = () => {
    setQuillIsFocus(true);
  };

  const handleOnBlur = () => {
    setQuillIsFocus(false);
  };

  useEffect(() => {
    if (beforeDivRef) {
      const beforeDivHeight =
        (beforeDivRef?.current?.clientHeight as number) + 30 ?? 0;
      const formContent = document.querySelector(
        ".form-content"
      ) as HTMLDivElement;
      if (formContent) {
        if (quillIsFocus) {
          formContent.style.marginTop = `-${beforeDivHeight}px`;
        } else {
          formContent.style.marginTop = "0";
        }
      }
    }
  }, [quillIsFocus]);

  useEffect(() => {
    if (fetchEditIsSuccess && fetchEditIsData?.data?.product) {
      const product = fetchEditIsData.data.product;
      form.reset({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        image: product.imageUrl,
        category: product.category,
        subCategory: product.subCategory,
        blurImage: product.imageUrl
      });
      setImagePreview(product.imageUrl);
      setEditorContent(product.description);
      setSelectedCategory(product.category);
    }
  }, [fetchEditIsSuccess, fetchEditIsData, form]);

  return (
    <ContentLayout title={"create product"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-6 md:p-10 space-y-10 p-4   form-content"
        >
          <div ref={beforeDivRef} className="beforeDiv">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center">
                      <label
                        className="absolute left-0 mx-4 h-[80%] flex items-center justify-center cursor-pointer text-center rounded-lg w-[40%] bg-blue-400"
                        htmlFor="uploadImage"
                      >
                        <div className="flex items-center text-white justify-center">
                          {isFetchingImage && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Upload Image
                        </div>
                      </label>
                      <Input
                        type="file"
                        id="uploadImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="py-8 border border-opacity-35"
                      />
                    </div>
                  </FormControl>
                  {imagePreview && (
                    <div className="mt-2 relative border border-opacity-25 overflow-hidden h-[100px] w-[100px] max-w-fit p-4">
                      <Image
                        src={imagePreview}
                        alt="Image Preview"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" mt-4">
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {selectedCategory || "Select a category"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <ScrollArea>
                          <DropdownMenuRadioGroup
                            value={selectedCategory}
                            onValueChange={(value) => {
                              setSelectedCategory(value);
                              const parentCategory =
                                subcategoryToCategoryMap(value);
                              console.log(value);
                              form.setValue("category", parentCategory);
                              if (parentCategory !== value) {
                                console.log(value);
                                form.setValue("subCategory", value);
                              }
                            }}
                            className="overflow-y-auto h-[40vh] overflow-x-hidden"
                          >
                            {getMenuList("")
                              .filter(
                                (group) => group.groupLabel === "Category"
                              )
                              .map((group) => (
                                <React.Fragment key={group.groupLabel}>
                                  {renderCategoryItems(
                                    group.groupLabel,
                                    group.menus
                                  )}
                                </React.Fragment>
                              ))}
                          </DropdownMenuRadioGroup>
                        </ScrollArea>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 md:mt-0 relative">
            <div className="flex gap-2 items-center justify-center absolute -top-5 right-0">
              <label className="switch">
                <input
                  onClick={() => setQuillIsFocus(!quillIsFocus)}
                  type="checkbox"
                  checked={quillIsFocus}
                />
                <span className="slider round"></span>
              </label>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                    className={`${
                      quillIsFocus
                        ? "h-[75vh]  relative top-0 z-50"
                        : "h-[30vh]"
                    }`}
                  >
                    <ReactQuill
                      value={editorContent}
                      onChange={(content, delta, source, editor) =>
                        editing(content, delta, source, editor)
                      }
                      modules={modules}
                      theme="snow"
                      onFocus={handleQuillFocus}
                      onBlur={handleOnBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
}
type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};
