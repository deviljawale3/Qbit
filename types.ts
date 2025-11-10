
export interface ShortenedLink {
  id: string;
  longUrl: string;
  shortUrl: string;
  customAlias?: string;
  qrCodeUrl: string;
  createdAt: string;
  clicks: number;
  geoData: { country: string; clicks: number }[];
}
