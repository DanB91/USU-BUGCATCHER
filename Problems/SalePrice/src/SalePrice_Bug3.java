//Does not check to see if inputs are numbers; no try,catch

public class SalePrice_Bug3 {

	public static double discountedPrice(double price, double discount){
		double amountOff = (discount / 100) * price;
		return (price - amountOff);

	}
	
	public static void main(String[] args){
	
		double price = Double.parseDouble(args[0]);
		double discount = Double.parseDouble(args[1]);
		
		if ((discount < 0) || (discount > 100))
			System.out.println("Discount must be between 0 and 100");
		else {
			double discountedPrice = SalePrice_Bug3.discountedPrice(price, discount);
			System.out.println(discountedPrice);
		}
	
	}
}
