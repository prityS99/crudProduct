import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  size: yup.string().required("Size is required"),
  color: yup.string().required("Color is required"),
  category: yup.string().required("Category is required"),
  image: yup
    .string()
    .url("Enter a valid image URL")
    .required("Image is required"),
  desc: yup.string().required("Description is required"),
});
