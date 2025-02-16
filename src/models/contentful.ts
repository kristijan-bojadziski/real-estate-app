export interface ContentfulImage {
  fields: {
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
    title: string;
  };
}

export interface ContentfulResponse<T> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: T;
}
