export type BaseProps = Record<string, unknown>;

export type BlockEvents = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

export type Props = {
  events?: BlockEvents;
};
