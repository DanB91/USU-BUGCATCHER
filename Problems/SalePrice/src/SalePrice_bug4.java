//Does not check to see if discount is strictly less than 0 or greater than 100

public class SalePrice_Bug4 {

	public static double discountedPrice(double price, double discount){
		double amountOff = (discount / 100) * price;
		return (price - amountOff);

	}
	
	public static void main(String[] args){
	try{
		double price = Double.parseDouble(args[0]);
		double discount = Double.parseDouble(args[1]);
		if(price<=2000000000){
		
			double discountedPrice = SalePrice_Bug4.discountedPrice(price, discount);
			System.out.println(discountedPrice);
		
                }else{
                    System.out.println("Error: the price must be less than $2000000000.");
                }
	} catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}
}
