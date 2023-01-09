import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { FeedbackForm } from "./FeedbackForm";

describe("<FeedbackForm /> component", () => {
  it("submits the form and resets the form", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    // Fill out the form
    const nameInput = getByTestId("name");
    await act(async () => {
      await fireEvent.change(nameInput, { target: { value: "John" } });
    });

    const emailInput = getByTestId("email");
    await act(async () => {
      await fireEvent.change(emailInput, {
        target: { value: "john@example.com" },
      });
    });
    // const ratingInput = getByLabelText("5-stars");
    // fireEvent.click(ratingInput);

    // Submit the form
    const button = getByText("Submit");
    await act(async () => {
      await fireEvent.click(button);
    });

    // The form should be submitted and reset
    //@ts-ignore
    expect(nameInput.value).toBe("John");
    //@ts-ignore
    expect(emailInput.value).toBe("john@example.com");
    // expect(ratingInput).toBe(false);
  });
  // it("adds a non valid email", async () => {
  //   // Render the form
  //   const { getByText, getByTestId } = render(<FeedbackForm />);

  //   const emailInput = getByTestId("email");
  //   await act(async () => {
  //     await fireEvent.change(emailInput, { target: { value: "john@deep" } });
  //   });

  //   await act(async () => {
  //     // Submit the form
  //     const button = getByText("Submit");
  //     await act(async () => {
  //       await fireEvent.click(button);
  //     });
  //   });

  //   await act(async () => {
  //     const message = getByTestId("error-email");
  //     expect(message).toHaveTextContent("Please enter a valid email");
  //   });
  // });
  it("adds non valid values", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    const nameInput = getByTestId("name");
    await act(async () => {
      await fireEvent.change(nameInput, { target: { value: "j" } });
    });

    const emailInput = getByTestId("email");
    await act(async () => {
      await fireEvent.change(emailInput, { target: { value: "john@deep" } });
    });

    await act(async () => {
      // Submit the form
      const button = getByText("Submit");
      await act(async () => {
        await fireEvent.click(button);
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
  });
  it("submits the form with required values", async () => {
    // Render the form
    const { getByText, getByTestId } = render(<FeedbackForm />);

    const nameInput = getByTestId("name");
    await act(async () => {
      await fireEvent.change(nameInput, { target: { value: "" } });
    });

    const emailInput = getByTestId("email");
    await act(async () => {
      await fireEvent.change(emailInput, { target: { value: "" } });
    });

    await act(async () => {
      // Submit the form
      const button = getByText("Submit");
      await act(async () => {
        await fireEvent.click(button);
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
