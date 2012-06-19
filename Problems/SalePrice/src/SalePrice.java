

public class SalePrice{

   public static double discountedPrice(double price, double discount){
      double amountOff = (discount / 100) * price;
      return (price - amountOff);

   }
	
   public static void main(String[] args){
   
      double price = Double.parseDouble(args[0]);
      double discount = Double.parseDouble(args[1]);
		
      double discountedPrice = SalePrice.discountedPrice(discount, price);
      System.out.println(discountedPrice);
      
    
   }
}
