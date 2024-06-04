declare module "jsmpeg" {
  export class Player {
    constructor(url: string, options?: PlayerOptions);
  }

  interface PlayerOptions {
    canvas: HTMLCanvasElement | null;
    preserveDrawingBuffer?: boolean;
    // Add any other options you might need
  }
}
