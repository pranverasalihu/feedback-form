import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { downloadJSON } from "../../helpers/downloadJSON";

interface MyForm {
  name: string;
  email: string;
  rating: number;
  comments?: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Minimum characters is 2"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "You must add a number between 1-5")
    .max(5, "You must add a number between 1-5"),
});

const STARS = [
  {
    id: "5-stars",
    value: "5",
    dataTestId: "rating-5",
  },
  {
    id: "4-stars",
    value: "4",
    dataTestId: "rating-4",
  },
  {
    id: "3-stars",
    value: "3",
    dataTestId: "rating-3",
  },
  {
    id: "2-stars",
    value: "2",
    dataTestId: "rating-2",
  },
  {
    id: "1-stars",
    value: "1",
    dataTestId: "rating-1",
  },
];

export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyForm>({
    defaultValues: { name: "", email: "", rating: 0, comments: "" },
    resolver: yupResolver(schema),
  });

  const submitForm = (data: MyForm) => {
    downloadJSON(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <h2>Feedback Form</h2>
      <div className="form-control">
        <label>Name:</label>
        <input
          {...register("name")}
          data-testid="name"
          placeholder="Name"
          type="text"
        />
        <p data-testid="error-name">{errors.name?.message}</p>
      </div>
      <div className="form-control">
        <label>Email:</label>
        <input
          {...register("email")}
          data-testid="email"
          placeholder="Email"
          type="email"
        />
        <p data-testid="error-email">{errors.email?.message}</p>
      </div>
      <div className="form-control">
        <label>Comments:</label>
        <textarea
          {...register("comments")}
          data-testid="comments"
          placeholder="Comments"
        />
      </div>
      <div className="form-control">
        <label>Rating:</label>
        <div className="star-rating">
          {STARS.map((star) => {
            return (
              <Fragment key={star.id}>
                <input
                  {...register("rating")}
                  type="radio"
                  id={star.id}
                  name="rating"
                  value={star.value}
                  data-testid={star.dataTestId}
                />
                <label htmlFor={star.id} className="star">
                  &#9733;
                </label>
              </Fragment>
            );
          })}
        </div>
        <p data-testid="error-rating">{errors.rating?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
