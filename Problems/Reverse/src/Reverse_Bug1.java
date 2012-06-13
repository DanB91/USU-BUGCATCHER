//BUG 1: LINE 10 starts after first character

public class Reverse_Bug1 {
	
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
		String toReverse = args[0];
		System.out.println(reverseIt(toReverse));
	}

}
