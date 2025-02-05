export interface IDocument {
    id: string | number;
    name: string;
    prompt?: string;
    sections: Section[];
}
export interface Section {
    name: string;
    type: 'Text' | 'Image' | 'Audio' | 'Video';
    data: any;
    displayOrder: number;
    children?: Section[];
}
