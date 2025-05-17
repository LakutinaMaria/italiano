export interface Translation {
  text: string;
  priority: number;
}

export interface Usage {
  text: string;
  pronunciation?: string;
}

export interface Word {
    id: string;
    content: string;
    form: string;
    alteration: string;
    definition: string;
    usages?: Usage[];
    imgUrl?: string;
    started?: boolean;
    progress?: number;
    pronunciation?: string | null;
    translations: Translation[];
  }