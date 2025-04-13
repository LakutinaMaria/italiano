export interface Word {
    id: string;
    text: string;
    translation?: string;
    usage?: string[];
    isStudying?: boolean;
    progress?: number;
  }