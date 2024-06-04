import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateBlog from "./CreateBlog";

test("CreateBlog", () => {
  const createBlog = jest.fn();

  const component = render(<CreateBlog createBlog={createBlog} />);

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "Prueba titulo" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Prueba titulo");
});
