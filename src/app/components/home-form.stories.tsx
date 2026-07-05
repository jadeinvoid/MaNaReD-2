import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { HomeForm } from "./home-form";

const meta = {
  title: "Vibework/Components/HomeForm",
  component: HomeForm,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText("Name");
    const emailInput = canvas.getByLabelText("Email");

    await userEvent.type(nameInput, "Ada Lovelace");
    await userEvent.type(emailInput, "ada@example.com");

    await expect(nameInput).toHaveValue("Ada Lovelace");
    await expect(emailInput).toHaveValue("ada@example.com");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
  },
};
