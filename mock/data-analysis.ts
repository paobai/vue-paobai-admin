import{ successResponseWrap } from "@/utils/mock"
import { MockPostData } from '@/types/global';
import Mock from "mockjs";

export default [
    {
        url: new RegExp('/api/public-opinion-analysis'),
        method: "post",
        timeout: 1000,
        response: (request: MockPostData) => {
            const { quota = 'visitors' } = request.body;
            if (['visitors', 'comment'].includes(quota)) {
                const year = new Date().getFullYear();
                const getLineData = (name: number) => {
                    return new Array(12).fill(0).map((_item, index) => ({
                        x: `${index + 1}月`,
                        y: Mock.Random.natural(0, 100),
                        name: String(name),
                    }));
                };
                return successResponseWrap({
                    count: 5670,
                    growth: 206.32,
                    chartData: [...getLineData(year), ...getLineData(year - 1)],
                });
            }
            if (['published'].includes(quota)) {
                const year = new Date().getFullYear();
                const getLineData = (name: number) => {
                    return new Array(12).fill(0).map((_item, index) => ({
                        x: `${index + 1}日`,
                        y: Mock.Random.natural(20, 100),
                        name: String(name),
                    }));
                };
                return successResponseWrap({
                    count: 5670,
                    growth: 206.32,
                    chartData: [...getLineData(year)],
                });
            }
            return successResponseWrap({
                count: 5670,
                growth: 206.32,
                chartData: [
                    // itemStyle for demo
                    { name: '文本类', value: 25, itemStyle: { color: '#8D4EDA' } },
                    { name: '图文类', value: 35, itemStyle: { color: '#165DFF' } },
                    { name: '视频类', value: 40, itemStyle: { color: '#00B2FF' } },
                ],
            });
        }
    },
    {
        url: new RegExp('/api/content-period-analysis'),
        method: "post",
        timeout: 1000,
        response: () => {
            const getLineData = (name: string) => {
                return {
                    name,
                    value: new Array(12).fill(0).map(() => Mock.Random.natural(30, 90)),
                };
            };
            return successResponseWrap({
                xAxis: new Array(12).fill(0).map((_item, index) => `${index * 2}:00`),
                data: [
                    getLineData('纯文本'),
                    getLineData('图文类'),
                    getLineData('视频类'),
                ],
            });
        }
    },
    {
        url: new RegExp('/api/content-publish'),
        method: "get",
        timeout: 1000,
        response: () => {
            const generateLineData = (name: string) => {
                const result = {
                    name,
                    x: [] as string[],
                    y: [] as number[],
                };
                new Array(12).fill(0).forEach((_item, index) => {
                    result.x.push(`${index * 2}:00`);
                    result.y.push(Mock.Random.natural(1000, 3000));
                });
                return result;
            };
            return successResponseWrap([
                generateLineData('纯文本'),
                generateLineData('图文类'),
                generateLineData('视频类'),
            ]);
        }
    },
    {
        url: new RegExp('/api/popular-author/list'),
        method: "get",
        timeout: 1000,
        response: () => {
            const generateData = () => {
                const list = new Array(7).fill(0).map((_item, index) => ({
                    ranking: index + 1,
                    author: Mock.mock('@ctitle(5)'),
                    contentCount: Mock.mock(/[0-9]{4}/),
                    clickCount: Mock.mock(/[0-9]{4}/),
                }));
                return {
                    list,
                };
            };
            return successResponseWrap({
                ...generateData(),
            });
        }
    },
    {
        url: new RegExp('/api/data-chain-growth'),
        method: "post",
        timeout: 1000,
        response: (request: MockPostData) => {
            const { quota } = request.body;
            const getLineData = () => {
                return {
                    xAxis: new Array(12).fill(0).map((_item, index) => `${index + 1}日`),
                    data: {
                        name: quota,
                        value: new Array(12)
                            .fill(0)
                            .map(() => Mock.Random.natural(1000, 3000)),
                    },
                };
            };
            return successResponseWrap({
                count: Mock.Random.natural(1000, 3000),
                growth: Mock.Random.float(20, 100, 2, 2),
                chartData: getLineData(),
            });
        }
    },
    {
        url: new RegExp('/api/data-overview'),
        method: "post",
        timeout: 1000,
        response: (request: MockPostData) => {
            const generateLineData = (name: string) => {
                return {
                    name,
                    count: Mock.Random.natural(20, 2000),
                    value: new Array(8).fill(0).map(() => Mock.Random.natural(800, 4000)),
                };
            };
            const xAxis = new Array(8).fill(0).map((_item, index) => {
                return `12.1${index}`;
            });
            return successResponseWrap({
                xAxis,
                data: [
                    generateLineData('内容生产量'),
                    generateLineData('内容点击量'),
                    generateLineData('内容曝光量'),
                    generateLineData('活跃用户数'),
                ],
            });
        }
    }
]