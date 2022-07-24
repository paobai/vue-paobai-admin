export interface ChartDataRecord {
  x: string
  y: number
  name: string
}
export interface DataChainGrowth {
  quota: string
}

export interface PopularAuthorRes {
  list: {
    ranking: number
    author: string
    contentCount: number
    clickCount: number
  }[]
}

export interface DataChainGrowthRes {
  count: number
  growth: number
  chartData: {
    xAxis: string[]
    data: { name: string; value: number[] }
  }
}
export interface ContentPublishRecord {
  x: string[]
  y: number[]
  name: string
}

export interface PublicOpinionAnalysis {
  quota: string
}
export interface PublicOpinionAnalysisRes {
  count: number
  growth: number
  chartData: ChartDataRecord[]
}
export interface DataOverviewRes {
  xAxis: string[]
  data: Array<{ name: string; value: number[]; count: number }>
}
