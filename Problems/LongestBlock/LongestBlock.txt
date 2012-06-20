

public class LongestBlock {
	public static int findLongest(String s){
		char[] letters = s.toCharArray();
		if (letters.length==0)
			return 0;
		
		int curMax = 0;
		int curCount = 1;
		char curLetter = letters[0];
		
		for (int i = 0; i < letters.length-1; i++){
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
