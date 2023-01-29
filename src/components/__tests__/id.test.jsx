import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";

describe("id field", () => {
  it("passing non number value to text field", () => {
    const history = createMemoryHistory();
    const { getByLabelText } = render(
      <Router location={history}>
        <App />
      </Router>
    );

    const idField = getByLabelText("Id");
    fireEvent.change(idField, { target: { value: "abc" } });
    expect(idField.value).toBe("");
  });

  it("passing number value to text field ", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const idField = getByLabelText("Id");
    fireEvent.change(idField, { target: { value: "12" } });
    expect(idField.value).toBe("12");
  });

  it("passing + or - sign  to text field ", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const idField = getByLabelText("Id");
    fireEvent.change(idField, { target: { value: "-" } });
    expect(idField.value).toBe("");
  });
});
