export interface MagicCard {
    id: number;
    name: string;
    scryfallID: string;
    set_name: string;
    image_uris: UrlObject;
    card_faces: MagicCard[];
    released_at: Date;
    layout: string;
}

export interface UrlObject{
  large:string;
}

