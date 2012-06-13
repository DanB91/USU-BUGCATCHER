//BUG 2: LINE 19 changes the input to lower case for no apparent reason


public class Reverse_Bug2 {
	
	public static String reverseIt(String s){
		String reversed = "";
		for (int i = 0; i < s.length(); i++)
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
