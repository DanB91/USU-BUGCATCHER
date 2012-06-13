//BUG 1: LINE 15 does not allow a discount of 0

public class SalePrice_Bug1 {

	public static double discountedPrice(double price, double discount){
		double amountOff = (discount / 100) * price;
		return (price - amountOff);

	}
	
	public static void main(String[] args){
	try{
		double price = Double.parseDouble(args[0]);
		double discount = Double.parseDouble(args[1]);
		
		if ((discount <= 0) || (discount > 100))
			System.out.println("Discount must be between 0 and 100");
		else {
			double discountedPrice = SalePrice_Bug1.discountedPrice(price, discount);
			System.out.println(discountedPrice);
		}
	}catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}
}
