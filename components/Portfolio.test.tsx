import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Portfolio from "./Portfolio";

const renderPortfolio = (initialMode: "recruiter" | "engineer" = "recruiter") =>
  render(<Portfolio initialMode={initialMode} />);

beforeEach(() => {
  localStorage.clear();
  document.cookie = "portfolio-mode=; Max-Age=0; Path=/";
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: jest.fn().mockReturnValue(null),
  });
});

test("switches and persists portfolio mode", async () => {
  const user = userEvent.setup();
  renderPortfolio();
  const engineer = screen.getAllByRole("button", { name: /engineer/i })[0];
  await user.click(engineer);
  expect(engineer).toHaveAttribute("aria-pressed", "true");
  expect(localStorage.getItem("portfolio-mode")).toBe("engineer");
  expect(document.cookie).toContain("portfolio-mode=engineer");
});

test("renders the server-provided initial mode without waiting for an effect", () => {
  renderPortfolio("engineer");
  expect(
    screen.getAllByRole("button", { name: /engineer/i })[0],
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getAllByRole("tab", { name: "Architecture" })[0],
  ).toHaveAttribute("aria-selected", "true");
});

test("project tabs expose a complete ARIA relationship and support arrow keys", async () => {
  const user = userEvent.setup();
  renderPortfolio("engineer");
  const project = screen
    .getByRole("heading", { name: "AI Energy Data Analyst" })
    .closest("article")!;
  const architecture = within(project).getByRole("tab", {
    name: "Architecture",
  });
  const engineering = within(project).getByRole("tab", { name: "Engineering" });
  const panel = within(project).getByRole("tabpanel");

  expect(architecture).toHaveAttribute("tabindex", "0");
  expect(engineering).toHaveAttribute("tabindex", "-1");
  expect(architecture).toHaveAttribute("aria-controls", panel.id);
  expect(panel).toHaveAttribute("aria-labelledby", architecture.id);

  architecture.focus();
  await user.keyboard("{ArrowRight}");
  expect(engineering).toHaveFocus();
  expect(engineering).toHaveAttribute("aria-selected", "true");
  expect(
    within(project).getByText(/Calculations stay deterministic/),
  ).toBeVisible();
});

test("renders navigation anchors and external links safely", () => {
  renderPortfolio();
  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "#work",
  );
  const github = screen.getAllByRole("link", { name: /github/i })[0];
  expect(github).toHaveAttribute("target", "_blank");
  expect(github).toHaveAttribute("rel", "noreferrer");
});

test("the mobile menu exposes its controlled navigation and closes with Escape", async () => {
  const user = userEvent.setup();
  renderPortfolio();
  const menuButton = screen.getByRole("button", { name: /toggle navigation/i });
  expect(menuButton).toHaveAttribute("aria-controls", "primary-navigation");
  await user.click(menuButton);
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("{Escape}");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  expect(menuButton).toHaveFocus();
});

test("copies email and provides success feedback", async () => {
  const user = userEvent.setup();
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  renderPortfolio();
  await user.click(screen.getByRole("button", { name: /copy email/i }));
  expect(writeText).toHaveBeenCalledWith("hafiz.ammar33@gmail.com");
  expect(screen.getByRole("button", { name: /copied/i })).toBeVisible();
  expect(screen.getByRole("status")).toHaveTextContent(
    "Email copied to clipboard",
  );
});

test("handles clipboard rejection without an unhandled error", async () => {
  const user = userEvent.setup();
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: jest.fn().mockRejectedValue(new Error("Permission denied")),
    },
  });
  renderPortfolio();
  await user.click(screen.getByRole("button", { name: /copy email/i }));
  await waitFor(() =>
    expect(screen.getByRole("button", { name: /copy failed/i })).toBeVisible(),
  );
  expect(screen.getByRole("status")).toHaveTextContent("Could not copy email");
});

test("renders the dashboard filter as presentation and lazily loads project images", () => {
  renderPortfolio();
  expect(
    screen.queryByRole("button", { name: "Last 30 days" }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Last 30 days")).toBeVisible();
  const image = screen.getByAltText(/fleet operations overview/i);
  expect(image).toHaveAttribute("loading", "lazy");
});
