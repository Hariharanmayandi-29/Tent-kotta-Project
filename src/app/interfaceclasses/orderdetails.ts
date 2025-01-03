export class Orderdetails {
    name!: string;
    mobile!: number;
    country!: string;
    address: { line1: string; line2: string; city: string; zipcode: number } = {
      line1: '',
      line2: '',
      city: '',
      zipcode: 0,
    };
    date!: string;
    accept_info!: boolean;
    deliver_date!:string
    orderid!:string
  }
