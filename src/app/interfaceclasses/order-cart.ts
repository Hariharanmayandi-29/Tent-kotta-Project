export class OrderCart {

    // Orderdetails properties


    // Confirmmovies properties
    total_movie!: number;
    total_price!: number;
    charges!: number;
    country!: string
    tax!: number;

    total_amnt!: number;
    discount!: number;
    image?: string; // Optional as it can be undefined
    movie_name!: string;
    name!: string;
    mobile!: number;

    address!: {
        line1: string;
        line2: string;
        city: string;
        zipcode: number;
    };
    date!: string;
    accept_info!: boolean;
    deliver_date!: string
    orderid!:string




}
