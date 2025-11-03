// Extend the Window interface to include MNI
declare global {
  interface Window {
    MNI: {
      Widgets: {
        Member: new (elementId: string, options: {
          member: number;
          styleTemplate: string;
        }) => {
          create: () => void;
        };
      };
    };
  }
}

export {}; // This file needs to be a module
