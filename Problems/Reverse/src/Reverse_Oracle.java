

public class Reverse_Oracle {
	
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
		String toReverse = args[0];
		System.out.println(reverseIt(toReverse));
	}

}
