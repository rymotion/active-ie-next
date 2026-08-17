import type { Metadata } from 'next';
import RitualLanding from './RitualLanding';
import './ritual.css';

export const metadata: Metadata = {
  title: 'Ritual — Cold Plunge & Contrast Therapy | Southern California',
  description:
    'A pop-up cold plunge experience, brought to your door. From city blocks to the Mojave. Southern California pilot — join the waitlist.',
};

export default function RitualPage() {
  return <RitualLanding />;
}
