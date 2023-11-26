import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "../app/page";
import { resolve } from "path";

vi.mock("@clerk/nextjs", () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({
          userId: "user_exdeedee",
        })
      ),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_exdeedee",
        fullName: "ExDee Dee",
      },
    }),
  };
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  };
});

test("Home", async () => {
  render(await HomePage());
  expect(
    screen.getByText(
      "This is the best app for tracking your mood throughout your life. All you have to do is be honest."
    )
  ).toBeTruthy();
});
