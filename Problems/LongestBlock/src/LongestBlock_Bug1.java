//BUG 1: LINE 14 starts at first letter, counting it twice.

public class LongestBlock_Bug1 {
	
	public static int findLongest(String s){
		char[] letters = s.toCharArray();
		if (letters.length==0)
			return 0;
		
		int curMax = 1;
		int curCount = 1;
		char curLetter = letters[0];
		
		for (int i = 0; i < letters.length; i++){
		
		
			if (letters[i]==curLetter){
				curCount++;
				if (curCount > curMax)
					curMax = curCount;
			} else{ 
				curLetter = letters[i];
				curCount = 1;
			}
		}
		
		return curMax;
	}

	public static void main(String[] args){
		try{
		int blockLength = findLongest(args[0]);
		System.out.println(blockLength);
		}catch(Exception e){
	          System.out.println("Error: Bad Input");
	  	}
	}
}
