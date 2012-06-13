public class FibonacciOracle {

   public static void main(String[] args) { 
   try{
      int N = Integer.parseInt(args[0]);
	if (N > 30) {
	 System.out.println("Error: Input too large");
	 return;
	}

      int f = 0, g = 1;

      for (int i = 1; i <= N; i++) {
         f = f + g;
         g = f - g;
         System.out.print(f + " "); 
      }
    }catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
   }
}
