export interface ShareResponse {
  message: string;
  shareLink: string;
}

export interface Tag {
  _id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Link {
  url: string;
  _id: string;
}

export interface Content {
  _id: string;
  title: string;
  type: string;
  link: Link;
  tags: Tag[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ShareBrainResponse {
  username: string;
  contents: Content[];
}
