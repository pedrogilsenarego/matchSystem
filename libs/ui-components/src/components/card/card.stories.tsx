import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './card';
import { ElevatedCard } from '../elevated-card';
import { Heading } from '../heading';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <>
    <Heading level={3}>Match summary</Heading>
    <p style={{ margin: '0.5rem 0 0', color: '#495057' }}>
      Real-time stats update as the game progresses.
    </p>
  </>
);

/** The base surface — a flat container with a subtle shadow. */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <SampleContent />
    </Card>
  ),
};

/** Elevated variant with a stronger shadow for raised surfaces. */
export const Elevated: Story = {
  render: () => (
    <ElevatedCard>
      <SampleContent />
    </ElevatedCard>
  ),
};

/** Glass (frosted) variant — render it over a colourful backdrop to see the blur. */
export const Glass: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 360,
          padding: 32,
          borderRadius: 16,
          background:
            'linear-gradient(135deg, #6d5efc 0%, #f7567c 60%, #ffc15e 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ElevatedCard variant="glass">
      <SampleContent />
    </ElevatedCard>
  ),
};

/** All card versions side by side for quick comparison. */
export const AllVersions: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          padding: 32,
          borderRadius: 16,
          background:
            'linear-gradient(135deg, #6d5efc 0%, #f7567c 60%, #ffc15e 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Card style={{ width: 220 }}>
        <Heading level={4}>Card</Heading>
        <p style={{ margin: '0.5rem 0 0', color: '#495057' }}>Flat surface</p>
      </Card>
      <ElevatedCard style={{ width: 220 }}>
        <Heading level={4}>Elevated</Heading>
        <p style={{ margin: '0.5rem 0 0', color: '#495057' }}>Raised shadow</p>
      </ElevatedCard>
      <ElevatedCard variant="glass" style={{ width: 220 }}>
        <Heading level={4}>Glass</Heading>
        <p style={{ margin: '0.5rem 0 0', color: '#495057' }}>Frosted blur</p>
      </ElevatedCard>
    </>
  ),
};
