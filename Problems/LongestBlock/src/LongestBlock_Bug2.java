//BUG 2: LINE 10 setting curMax to 0 before the for loop makes it not work for strings of length 1.

public class LongestBlock_Bug2 {
	
	public static int findLongest(String s){
		char[] letters = s.toCharArray();
		if (letters.length==0)
			return 0;
		
		int curMax = 0;
		int curCount = 1;
		char curLetter = letters[0];
		
		for (int i = 1; i < letters.length; i++){
			if (curMax==0)
				curMax=1;
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
		int blockLength = findLongest(args[0]);
		System.out.println(blockLength);
	}
}
