

public class QuickAdd{
	
   public static void main(String[] args){
      try{
	  double num1 = Double.parseDouble(args[0]);
      double num2 = Double.parseDouble(args[1]);
		
      double sum = num1 - num2;
		
      System.out.println(sum);
      }catch(Exception e){
          System.out.println("Error: Bad Input");
  	}
   }

}