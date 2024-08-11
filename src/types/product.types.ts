export interface IProduct{
    _id: string
    name: string
    category: string
    prices: IBrandProduct[]

}

interface IBrandProduct{
    brandName: string
    price: number | "N/A"
}