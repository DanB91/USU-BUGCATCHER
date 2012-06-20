public class Fibonacci {

   public static void main(String[] args) { 
  
      double N = Integer.parseInt(args[0]);
	
      int f = 0, g = 1;

      for (int i = 1; i <= N+1; i++) {
         f = f + g;
         g = f - g;
         System.out.print(f + " "); 
      }
    
   }
}
