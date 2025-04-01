

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, onChange, textarea, type = "text" }) => (
  <div className="mb-6">
    <label className="text-sm text-gray-600 block mb-2">{label}</label>
    {textarea ? (
      <textarea
        className="w-full border border-gray-300 p-2 rounded-md"
        rows={3}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    ) : (
      <input
        className="w-full border border-gray-300 p-2 rounded-md"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    )}
  </div>
);

const AddPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center text-green-500 text-xl mt-8">Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async (): Promise<string> => {
    if (!file) throw new Error("No file selected");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "foodie");
    const res = await fetch("https://api.cloudinary.com/v1_1/dddwd0t6r/image/upload", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });
      const data = await res.json();
      toast.success("The product added.");
      
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-screen bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl mb-6 text-green-600 font-bold text-center">
          Add New Product
        </h1>
        <div className="mb-6">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center text-gray-600"
            htmlFor="file"
          >
            <BiImageAdd size={30} className="text-green-500" />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="hidden"
          />
        </div>
        <InputField label="Title" name="title" placeholder="Bella Napoli" onChange={handleChange} />
        <InputField label="Description" name="desc" placeholder="A timeless favorite with a twist..." onChange={handleChange} textarea />
        <InputField label="Price" name="price" placeholder="29" onChange={handleChange} type="number" />
        <InputField label="Category" name="catSlug" placeholder="vegetarian" onChange={handleChange} />
        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-2">Options</label>
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-md"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
            />
            <input
              className="flex-1 border border-gray-300 p-2 rounded-md"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2 rounded-md cursor-pointer bg-green-100 text-green-800"
                onClick={() => setOptions((prev) => prev.filter((item) => item.title !== opt.title))}
              >
                <span>{opt.title}</span>
                <span className="text-xs ml-1">(+₹{opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddPage;