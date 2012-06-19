

public class SalePrice_Oracle {

	public static double discountedPrice(double price, double discount){
		double amountOff = (discount / 100) * price;
		return (price - amountOff);

	}
	
	public static void main(String[] args){
	try{
                
		double price = Double.parseDouble(args[0]);
		double discount = Double.parseDouble(args[1]);
		if(price<=2000000000){
		if ((discount < 0) || (discount > 100))
			System.out.println("Discount must be between 0 and 100");
		else {
			double discountedPrice = SalePrice_Oracle.discountedPrice(price, discount);
			System.out.println(discountedPrice);
		}
                }else{
                    System.out.println("Error: the price must be less than $2000000000.");
                }
	} catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
	}
}
