export interface Word {
    id: string;
    content: string;
    definition: string;
    translation?: string;
    usage?: string[];
    isStudying?: boolean;
    progress?: number;
  }