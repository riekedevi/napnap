import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export default function AudioControl({ enabled, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? 'Matikan suara' : 'Nyalakan suara'}
      className="glass press flex h-11 w-11 items-center justify-center rounded-full text-white/90 shadow-lg"
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
