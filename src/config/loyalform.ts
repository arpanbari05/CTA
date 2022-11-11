import { StoreType } from "../types/store.types";

export const fields: {
  type: "text" | "email" | "number" | "select" | "search";
  name: string;
  placeholder: string;
  search?: boolean;
  options?: string[] | StoreType[];
  validation?: {
    required?: { value: boolean; message: string };
    maxLength?: { value: number; message: string };
    minLength?: { value: number; message: string };
    pattern?: { value: any; message: string };
  };
}[] = [
  {
    type: "search",
    name: "name",
    placeholder: "Enter your name",
    validation: {
      required: { value: true, message: "This field is required" },
    },
  },
  {
    type: "search",
    name: "mobile",
    placeholder: "Enter your phone",
    validation: {
      required: { value: true, message: "This field is required" },
      minLength: {
        value: 10,
        message: "Mobile number must be atleast 10 digits",
      },
      maxLength: {
        value: 10,
        message: "Mobile number must not exceed 10 digits",
      },
    },
  },
  {
    type: "search",
    name: "email",
    placeholder: "Enter your email",
    validation: {
      required: { value: true, message: "This field is required" },
      pattern: {
        value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Invalid email address",
      },
    },
  },
  {
    type: "select",
    name: "state",
    placeholder: "Please select a state",
    validation: {
      required: { value: true, message: "This field is required" },
    },
  },
  {
    type: "select",
    name: "city",
    placeholder: "Please select a city",
    validation: {
      required: { value: true, message: "This field is required" },
    },
  },

  {
    type: "select",
    search: true,
    name: "store",
    placeholder: "Please select a store",
    validation: {
      required: { value: true, message: "This field is required" },
    },
    options: [],
  },
];
