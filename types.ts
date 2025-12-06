export enum View {
  HOME = 'home',
  ANALYZER = 'analyzer',
  DATA_VISUALS = 'data_visuals',
  ABOUT = 'about',
}

export interface SentimentMetrics {
  polarity: number; // -1 to 1 (TextBlob equivalent)
  subjectivity: number; // 0 to 1 (TextBlob equivalent)
  compound: number; // -1 to 1 (VADER equivalent)
  pos: number; // 0 to 1
  neg: number; // 0 to 1
  neu: number; // 0 to 1
  verdict: string;
}

export interface Keyword {
  text: string;
  count: number;
}

export interface AnalysisResult {
  metrics: SentimentMetrics;
  keywords: Keyword[];
  summary: string;
}

export interface DatasetAnalysisResult {
  totalRecords: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  averageCompound: number;
  keywords: Keyword[]; // For word cloud
  sentimentDistribution: { name: string; value: number; color: string }[];
}

export interface CsvRow {
  [key: string]: string;
}
