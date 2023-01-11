import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { FeedbackForm } from "./FeedbackForm";

describe("<FeedbackForm /> component", () => {
  it("submits the form and resets the form", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    // Fill out the form
    const nameInput = getByTestId("name") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John" } });
    });

    const emailInput = getByTestId("email") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: "john@example.com" },
      });
    });

    const ratingInput = getByTestId("rating-5") as HTMLInputElement;
    await act(async () => {
      fireEvent.click(ratingInput);
    });

    // The form should be ready to submit
    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("john@example.com");
    expect(ratingInput.checked).toBe(true);

    // Submit the form
    const button = getByText("Submit");
    await act(async () => {
      fireEvent.click(button);
    });

    // The form should be submitted and reset
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(ratingInput.checked).toBe(false);
  });
  it("adds non valid value", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    const nameInput = getByTestId("name") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "j" } });
    });

    const emailInput = getByTestId("email") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "john@deep" } });
    });

    const ratingInput = getByTestId("rating-5") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(ratingInput, { target: { value: "6" } });
      fireEvent.click(ratingInput);
    });

    // Submit the form
    await act(async () => {
      const button = getByText("Submit");
      await act(async () => {
        fireEvent.click(button);
      });
    });

    await act(async () => {
      const message = getByTestId("error-email");
      expect(message).toHaveTextContent("Please enter a valid email");
    });

    await act(async () => {
      const message = getByTestId("error-name");
      expect(message).toHaveTextContent("Minimum characters is 2");
    });

    await act(async () => {
      const message = getByTestId("error-rating");
      expect(message).toHaveTextContent("You must add a number between 1-5");
    });
  });
  it("submits the form without required values", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    const nameInput = getByTestId("name") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "" } });
    });

    const emailInput = getByTestId("email") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "" } });
    });

    // Submit the form
    await act(async () => {
      const button = getByText("Submit");
      await act(async () => {
        fireEvent.click(button);
      });
    });

    await act(async () => {
      const message = getByTestId("error-email");
      expect(message).toHaveTextContent("Email is required");
    });

    await act(async () => {
      const message = getByTestId("error-name");
      expect(message).toHaveTextContent("Name is required");
    });
  });
});
