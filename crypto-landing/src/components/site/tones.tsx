import type { ReactNode } from "react";

/**
 * Tags used inside translated headlines and paragraphs, e.g.
 * "<w>Best</w> <g>crypto</g><br></br><l>investing platform</l>".
 * Keeping the colour split in the messages lets Arabic mark different words.
 */
export const tones = {
  w: (chunks: ReactNode) => <span className="text-chalk">{chunks}</span>,
  g: (chunks: ReactNode) => <span className="text-ash">{chunks}</span>,
  l: (chunks: ReactNode) => <span className="text-lime">{chunks}</span>,
  b: (chunks: ReactNode) => (
    <strong className="font-medium text-chalk">{chunks}</strong>
  ),
  br: () => <br />,
};
