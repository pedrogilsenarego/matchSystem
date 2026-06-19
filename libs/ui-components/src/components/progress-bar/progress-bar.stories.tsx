import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './progress-bar';

const meta = {
  title: 'Molecules/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    role: { control: 'inline-radio', options: ['meter', 'progressbar'] },
  },
  args: {
    value: 45,
    label: 'Possession',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Low: Story = {
  args: { value: 20 },
};

export const Orange: Story = {
  args: { value: 75 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const ColorRamp: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 320 }}>
      {[15, 45, 70, 88, 100].map((value) => (
        <ProgressBar {...args} key={value} value={value} label={`Value ${value}`} />
      ))}
    </div>
  ),
};
