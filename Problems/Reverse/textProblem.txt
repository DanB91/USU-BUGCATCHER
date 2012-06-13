

public class Reverse{
	
   public static String reverseIt(String s){
      String reversed = "";
      for (int i = 1; i < s.length(); i++)
         {
            char letter = s.charAt(i);
            reversed = letter + reversed;
         }
      return reversed;
   }
	
   public static void main(String[] args){
      String toReverse = args[0].toLowerCase();
      System.out.println(reverseIt(toReverse));
   }

}