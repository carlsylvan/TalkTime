// export interface IGifData {
//   data: IGif;
// }

// export interface IGif {
//   url: string;
//   type: string;
// }

export interface IGifData {
  data: IGif;
}

export interface IGifImages {
  fixed_height: {
    url: string;
  };
}

export interface IGif {
  images: IGifImages;
}
