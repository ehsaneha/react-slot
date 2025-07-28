import React, { createRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slot from "./index";

describe("<Slot />", () => {
  test("renders child element correctly", () => {
    const { getByText } = render(
      <Slot className="test-class">
        <button>Click me</button>
      </Slot>
    );

    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("test-class");
  });

  test("merges className and style props", () => {
    const { getByText } = render(
      <Slot className="slot-class" style={{ color: "red" }}>
        <button className="child-class" style={{ backgroundColor: "blue" }}>
          Button
        </button>
      </Slot>
    );

    const button = getByText("Button");
    expect(button).toHaveClass("slot-class");
    expect(button).toHaveClass("child-class");
    expect(button).toHaveStyle("color: rgb(255, 0, 0)");
    expect(button).toHaveStyle("background-color: rgb(0, 0, 255)");
  });

  test("merges onClick handlers and calls both", () => {
    const slotClick = jest.fn();
    const childClick = jest.fn();

    const { getByText } = render(
      <Slot onClick={slotClick}>
        <button onClick={childClick}>Click me</button>
      </Slot>
    );

    const button = getByText("Click me");
    fireEvent.click(button);

    expect(slotClick).toHaveBeenCalledTimes(1);
    expect(childClick).toHaveBeenCalledTimes(1);
  });

  test("forwards ref to child element", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Slot ref={ref}>
        <button>Button</button>
      </Slot>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Button");
  });

  test("handles invalid child gracefully", () => {
    const { container } = render(<Slot>{null}</Slot>);
    expect(container.firstChild).toBeNull();
  });
});
