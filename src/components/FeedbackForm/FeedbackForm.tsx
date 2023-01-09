import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface MyForm {
  name: string;
  email: string;
  rating: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Minimum characters is 2"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "You must add a number between 1-5")
    .max(5, "You must add a number between 1-5"),
});

const downloadJSON = (data: MyForm) => {
  const link = document.createElement("a");
  link.href =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  link.style.opacity = "0";
  link.download = "data.json";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyForm>({
    defaultValues: { name: "", email: "", rating: 0 },
    resolver: yupResolver(schema),
  });

  const submitForm = (data: MyForm) => {
    downloadJSON(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <h2>Feedback Form</h2>
      <input
        {...register("name")}
        data-testid="name"
        placeholder="name"
        type="text"
      />
      <p data-testid="error-name">{errors.name?.message}</p>
      <input
        {...register("email")}
        data-testid="email"
        placeholder="email"
        type="email"
      />
      <p data-testid="error-email">{errors.email?.message}</p>
      {/* <input {...register("rating")} placeholder="rating" type="number" />
      <p>{errors.rating?.message}</p> */}
      <div className="star-rating">
        <input
          {...register("rating")}
          type="radio"
          id="5-stars"
          name="rating"
          value="5"
        />
        <label htmlFor="5-stars" className="star">
          &#9733;
        </label>
        <input
          {...register("rating")}
          type="radio"
          id="4-stars"
          name="rating"
          value="4"
        />
        <label htmlFor="4-stars" className="star">
          &#9733;
        </label>
        <input
          {...register("rating")}
          type="radio"
          id="3-stars"
          name="rating"
          value="3"
        />
        <label htmlFor="3-stars" className="star">
          &#9733;
        </label>
        <input
          {...register("rating")}
          type="radio"
          id="2-stars"
          name="rating"
          value="2"
        />
        <label htmlFor="2-stars" className="star">
          &#9733;
        </label>
        <input
          {...register("rating")}
          type="radio"
          id="1-star"
          name="rating"
          value="1"
        />
        <label htmlFor="1-star" className="star">
          &#9733;
        </label>
      </div>
      <p>{errors.rating?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
};
