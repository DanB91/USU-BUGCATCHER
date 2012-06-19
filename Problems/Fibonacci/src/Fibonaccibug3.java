//Error: does not check to see if int is overflowed, max is N=30
//NEEDS TO BE FIXED
public class Fibonaccibug3 {

   public static void main(String[] args) { 
   try{
      double N = Integer.parseInt(args[0]);
      if(Math.floor(N)==N && N>-1){
	
      int f = 0, g = 1;

      for (int i = 1; i <= N; i++) {
         f = f + g;
         g = f - g;
         System.out.print(f + " "); 
      }
      }else{
          System.out.println("Error: Input must be a positive integer.");
      }
    }catch(Exception e){
    	System.out.println("Error: Bad Input");
    }
   }
}
