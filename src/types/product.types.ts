export interface IProduct{
    _id: string
    name: string
    category: string
    prices: IBrandProduct[]
    img:string

}

interface IBrandProduct{
    brandName: string
    price: number 
}